export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Pokémon API",
    version: "1.0.0",
    description: "API for fetching, searching, and updating Pokémon data.",
  },
  servers: [
    {
      url: "https://pokemon-api-sx3h.onrender.com/api/v1",
      description: "Local development server",
    },
  ],
  paths: {
    "/pokemon/": {
      post: {
        summary: "Fetch and store Pokémon data",
        description:
          "Fetches Pokémon details from an external API and saves them to the database.",
        operationId: "savePokemons",
        tags: ["Pokémon"],
        responses: {
          "201": {
            description: "Pokémon data saved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PokemonList",
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/pokemon": {
      get: {
        summary: "Get Pokémon with filters",
        description:
          "Retrieves Pokémon with pagination, search, and favorites filter.",
        operationId: "getPokemons",
        tags: ["Pokémon"],
        parameters: [
          {
            name: "page",
            in: "query",
            description: "Page number for pagination",
            required: false,
            schema: {
              type: "integer",
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Number of Pokémon per page",
            required: false,
            schema: {
              type: "integer",
              default: 20,
            },
          },
          {
            name: "searchTerm",
            in: "query",
            description: "Search for Pokémon by name",
            required: false,
            schema: {
              type: "string",
            },
          },
          {
            name: "showFavourite",
            in: "query",
            description:
              "Filter by favorite status (true = Favorite, false = Not Favorite)",
            required: false,
            schema: {
              type: "boolean",
            },
          },
        ],
        responses: {
          "200": {
            description: "Pokémon fetched successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PokemonList",
                },
              },
            },
          },
          "400": {
            description: "Invalid query parameters",
          },
        },
      },
    },
    "/pokemon/{pokemonId}/favourite/{isFavourite}": {
      put: {
        summary: "Update Pokémon favorite status",
        description:
          "Marks a Pokémon as favorite or not (true = Favorite, false = Not Favorite).",
        operationId: "updatePokemon",
        tags: ["Pokémon"],
        parameters: [
          {
            name: "pokemonId",
            in: "path",
            description: "ID of the Pokémon",
            required: true,
            schema: {
              type: "integer",
            },
          },
          {
            name: "isFavourite",
            in: "path",
            description:
              "Favorite status (true = Favorite, false = Not Favorite)",
            required: true,
            schema: {
              type: "boolean",
            },
          },
        ],
        responses: {
          "200": {
            description: "Pokémon favorite status updated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Pokemon",
                },
              },
            },
          },
          "400": {
            description: "Invalid favorite value (must be true or false)",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Pokemon: {
        type: "object",
        properties: {
          id: { type: "integer", example: 25 },
          name: { type: "string", example: "Pikachu" },
          type: {
            type: "array",
            items: { type: "string" },
            example: ["Electric"],
          },
          front_image: {
            type: "string",
            example: "https://example.com/pikachu_front.png",
          },
          back_image: {
            type: "string",
            example: "https://example.com/pikachu_back.png",
          },
          weight: { type: "integer", example: 60 },
          height: { type: "integer", example: 4 },
          hp: { type: "integer", example: 35 },
          attack: { type: "integer", example: 55 },
          defence: { type: "integer", example: 40 },
          special_attack: { type: "integer", example: 50 },
          special_defence: { type: "integer", example: 50 },
          speed: { type: "integer", example: 90 },
          is_favourite: { type: "boolean", example: true },
        },
      },
      PokemonList: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/Pokemon" },
          },
          total: { type: "integer", example: 100 },
          page: { type: "integer", example: 1 },
          limit: { type: "integer", example: 20 },
        },
      },
    },
  },
};
