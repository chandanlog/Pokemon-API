import { Request, Response, NextFunction } from "express";
import { ApiSuccess } from "@/utils/ApiSucess";
import { asyncHandler } from "@/middleware/async-middleware";
import { IPokemon } from "interfaces/interfaces.common";
import {
  fetchPokemonDetails,
  fetchPokemons,
} from "@/providers/pokemon-provider";
import { Pokemon } from "@/models/pokemon";
import {
  bulkInsertPokemons,
  getPaginatedPokemons,
  updatePokemonAsFavourite,
} from "@/providers/pokemon-mysql-provider";

export const savePokemons = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const pokemons: IPokemon[] = await fetchPokemons({ limit: 150 });
    const allPokemonNames = pokemons.map((pokemon) => pokemon.name);

    const allPokemonDetails = await Promise.allSettled(
      allPokemonNames.map((name) => fetchPokemonDetails({ name }))
    );

    const pokemonData = allPokemonDetails
      .filter((data: any) => data.status === "fulfilled" && data.value)
      .map((data: any) => Pokemon.parseApiDataToPokemon(data.value));

    await bulkInsertPokemons(pokemonData);
    res
      .status(200)
      .json(
        new ApiSuccess<Pokemon[]>(
          pokemonData,
          "Pokémon data saved successfully."
        )
      );
  }
);

export const getPokemons = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, searchTerm, showFavourite } = req.query;

    const pokemonsData = await getPaginatedPokemons(
      Number(page) || 1,
      Number(limit) || 20,
      searchTerm ? String(searchTerm) : undefined,
      showFavourite !== undefined ? showFavourite === "true" : undefined
    );

    res
      .status(200)
      .json(
        new ApiSuccess<Pokemon[]>(
          pokemonsData,
          "Pokémon retrieved successfully."
        )
      );
  }
);

export const updatePokemon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { pokemonId, isFavourite: req_isFav } = req.params;
    const isFavourite = req_isFav !== "0" && new Boolean(req_isFav) ? 1 : 0;

    const updatedPokemon = await updatePokemonAsFavourite(
      pokemonId,
      isFavourite
    );

    if (!updatedPokemon) {
      res
        .status(404)
        .json({ message: `Pokémon with ID ${pokemonId} not found.` });
      return;
    }

    res
      .status(200)
      .json(
        new ApiSuccess<Pokemon>(
          updatedPokemon,
          "Pokémon favorite status updated."
        )
      );
  }
);
