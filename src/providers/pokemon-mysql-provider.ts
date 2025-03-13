import pool from "@/config/db";

export const bulkInsertPokemons = async (pokemons: any[]) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM pokemons");

    const insertQuery = `
      INSERT INTO pokemons (
        id, name, front_image, back_image, weight, height, hp, attack, defence, special_attack, special_defence, speed, type, is_favourite
      ) VALUES 
      ${pokemons
        .map(
          (_, index) =>
            `(${[
              "id",
              "name",
              "front_image",
              "back_image",
              "weight",
              "height",
              "hp",
              "attack",
              "defence",
              "special_attack",
              "special_defence",
              "speed",
              "type",
              "is_favourite",
            ]
              .map((column, colIndex) => `$${index * 14 + colIndex + 1}`)
              .join(", ")})`
        )
        .join(", ")}
    `;

    const values = pokemons.flatMap((pokemon) => [
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
      JSON.stringify(pokemon.type),
      0,
    ]);

    await client.query(insertQuery, values);
    await client.query("COMMIT");
    console.log(`${pokemons.length} records inserted successfully`);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inserting records:", error);
  } finally {
    client.release();
  }
};

export const getPaginatedPokemons = async (
  page: number,
  limit: number,
  searchTerm?: string,
  isFavourite?: boolean
) => {
  const client = await pool.connect();

  try {
    const offset = (page - 1) * limit;

    let searchQuery = `
        SELECT * FROM pokemons
        WHERE TRUE
      `;
    const queryParams: any[] = [];

    if (searchTerm) {
      searchQuery += `
          AND name ILIKE $${
            queryParams.length + 1
          }  -- Use ILIKE for case-insensitive search
        `;
      queryParams.push(`%${searchTerm}%`);
    }
    if (isFavourite !== undefined) {
      searchQuery += `
          AND is_favourite = $${queryParams.length + 1}
        `;
      queryParams.push(isFavourite ? 1 : 0);
    }

    searchQuery += `
        LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
      `;
    queryParams.push(limit, offset);
    const res = await client.query(searchQuery, queryParams);
    return res.rows;
  } catch (error) {
    console.error("Error fetching paginated pokemons:", error);
    throw error;
  } finally {
    client.release();
  }
};

export const updatePokemonAsFavourite = async (
  pokemonId: string,
  isFavourite: number
) => {
  const client = await pool.connect();

  try {
    const updateQuery = `
        UPDATE pokemons
        SET is_favourite = $1
        WHERE id = $2
        RETURNING *;
      `;

    const res = await client.query(updateQuery, [isFavourite, pokemonId]);

    if (res.rowCount && res.rowCount > 0) {
      console.log(
        `Pokemon with ID ${pokemonId} marked as favourite: ${isFavourite}`
      );
      return res.rows[0];
    } else {
      console.log(`Pokemon with ID ${pokemonId} not found.`);
      return null;
    }
  } catch (error) {
    console.error("Error marking Pokémon as favourite:", error);
    throw error;
  } finally {
    client.release();
  }
};
