CREATE TABLE IF NOT EXISTS pokemons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  front_image VARCHAR(255) NOT NULL,
  back_image VARCHAR(255) NOT NULL,
  weight FLOAT NOT NULL,
  height FLOAT NOT NULL,
  hp INT NOT NULL,
  attack INT NOT NULL,
  defence INT NOT NULL,
  special_attack INT NOT NULL,
  special_defence INT NOT NULL,
  speed INT NOT NULL,
  type JSONB,  -- Array type to store multiple types
  is_favourite INT
);