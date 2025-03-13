import express from "express";

import {
  getPokemons,
  savePokemons,
  updatePokemon,
} from "@/controllers/pokemon-controller";
import { verify } from "@/middleware/auth-middleware";

const router = express.Router();

router.post("/", verify, savePokemons);
router.get("/", verify, getPokemons);
router.put("/:pokemonId/favourite/:isFavourite", verify, updatePokemon);

export default router;
