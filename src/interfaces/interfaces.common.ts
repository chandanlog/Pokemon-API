// Interface for custom class ApiError
export interface ApiError extends Error {
  success: boolean;
  message: string;
  statusCode: number;
  data: [] | {};
}

// Pokemon interface
export interface IPokemon {
  name: string;
  id: number;
  front_image: string;
  back_image: string;
  weight: number;
  height: number;
  hp: number;
  attack: number;
  defence: number;
  special_attack: number;
  special_defence: number;
  speed: number;
  type: string[];
  is_favourite: boolean;
}
