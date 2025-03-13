import { IPokemon } from "interfaces/interfaces.common";

export class Pokemon implements IPokemon {
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

  constructor(
    name: string,
    id: number,
    front_image: string,
    back_image: string,
    weight: number,
    height: number,
    hp: number,
    attack: number,
    defence: number,
    special_attack: number,
    special_defence: number,
    speed: number,
    type: string[],
    is_favourite: boolean
  ) {
    this.name = name;
    this.id = id;
    this.front_image = front_image;
    this.back_image = back_image;
    this.weight = weight;
    this.height = height;
    this.hp = hp;
    this.attack = attack;
    this.defence = defence;
    this.special_attack = special_attack;
    this.special_defence = special_defence;
    this.speed = speed;
    this.type = type;
    this.is_favourite = is_favourite;
  }

  static parseApiDataToPokemon(api_data: any): Pokemon {
    return new Pokemon(
      api_data.name,
      api_data.id,
      api_data.sprites["front_default"],
      api_data.sprites["back_default"],
      api_data.weight,
      api_data.height,
      api_data.stats[0]["base_stat"],
      api_data.stats[1]["base_stat"],
      api_data.stats[2]["base_stat"],
      api_data.stats[3]["base_stat"],
      api_data.stats[4]["base_stat"],
      api_data.stats[5]["base_stat"],
      api_data.types.map((type: any) => type.type.name),
      false
    );
  }
}
