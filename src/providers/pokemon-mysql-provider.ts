import pool from "../config/db";
//import { IPokemon } from "@/interfaces/interfaces.common";
import { IPokemon } from "../interfaces/interfaces.common";

export const bulkInsertPokemons = async (pokemons: IPokemon[]) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query("DELETE FROM pokemons");

    const insertQuery = `
      INSERT INTO pokemons (
        id, name, front_image, back_image, weight, height, hp, attack, defence, special_attack, special_defence, speed, type, is_favourite
      ) VALUES ?
    `;

    const values = pokemons.map((pokemon) => [
      pokemon.id,
      pokemon.name,
      pokemon.front_image,
      pokemon.back_image,
      pokemon.weight,
      pokemon.height,
      pokemon.hp,
      pokemon.attack,
      pokemon.defence,
      pokemon.special_attack,
      pokemon.special_defence,
      pokemon.speed,
      JSON.stringify(pokemon.type), // Store type as a JSON string
      0, // Default is_favourite to false (0)
    ]);

    await connection.query(insertQuery, [values]);

    await connection.commit();
    console.log(`${pokemons.length} Pokémon records inserted successfully.`);
  } catch (error) {
    await connection.rollback();
    console.error("Error inserting Pokémon records:", error);
  } finally {
    connection.release();
  }
};

export const getPaginatedPokemons = async (
  page: number,
  limit: number,
  searchTerm?: string,
  isFavourite?: boolean
): Promise<IPokemon[]> => {
  const connection = await pool.getConnection();

  try {
    const offset = (page - 1) * limit;

    let searchQuery = `SELECT * FROM pokemons WHERE 1=1`; // Always true
    const queryParams: any[] = [];

    if (searchTerm) {
      searchQuery += ` AND name LIKE ?`;
      queryParams.push(`%${searchTerm}%`);
    }
    if (isFavourite !== undefined) {
      searchQuery += ` AND is_favourite = ?`;
      queryParams.push(isFavourite ? 1 : 0);
    }

    searchQuery += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    const [rows] = await connection.query(searchQuery, queryParams);
    return rows as IPokemon[];
  } catch (error) {
    console.error("Error fetching paginated Pokémon:", error);
    throw error;
  } finally {
    connection.release();
  }
};

export const updatePokemonAsFavourite = async (
  pokemonId: string,
  isFavourite: number
): Promise<IPokemon | null> => {
  const connection = await pool.getConnection();

  try {
    const updateQuery = `
      UPDATE pokemons
      SET is_favourite = ?
      WHERE id = ?
    `;

    await connection.query(updateQuery, [isFavourite, pokemonId]);

    const [rows]: any = await connection.query(
      `SELECT * FROM pokemons WHERE id = ?`,
      [pokemonId]
    );

    return rows.length > 0 ? (rows[0] as IPokemon) : null;
  } catch (error) {
    console.error("Error updating Pokémon as favourite:", error);
    throw error;
  } finally {
    connection.release();
  }
};