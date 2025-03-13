import axios, { AxiosResponse } from "axios";

const client = axios.create({ baseURL: "https://pokeapi.co/api/v2" });

export const fetchPokemons = async ({ limit }: { limit: number }) => {
  try {
    const resp: AxiosResponse = await client.get("/pokemon", {
      params: { offset: 0, limit },
    });
    return resp.data?.results || [];
  } catch (err) {
    console.log("Error while fetchPokemons ", err);
    throw err;
  }
};

export const fetchPokemonDetails = async ({ name }: { name: string }) => {
  try {
    const resp: AxiosResponse = await client.get(`/pokemon/${name}`);
    return resp.data;
  } catch (err) {
    console.log("Error while fetchPokemonDetails ", err);
    throw err;
  }
};
