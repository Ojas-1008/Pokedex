/**
 * Types for the PokéAPI responses used throughout the Pokédex app.
 * All interfaces mirror the relevant fields returned by https://pokeapi.co/api/v2/
 */

/** Sprite image URLs for a Pokémon (default front view + official artwork). */
export interface PokemonSprites {
  /** Standard front-facing sprite URL. */
  front_default: string;
  other: {
    /** High-resolution official artwork. */
    "official-artwork": {
      front_default: string;
    };
  };
}

/** A single type slot returned in the `types` array (e.g. "fire", "water"). */
export interface PokemonType {
  type: {
    name: string;
  };
}

/** A single base-stat entry returned in the `stats` array (e.g. speed, attack). */
export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

/** A single ability slot returned in the `abilities` array. */
export interface PokemonAbility {
  ability: {
    name: string;
  };
}

/** A single move slot returned in the `moves` array. */
export interface PokemonMove {
  move: {
    name: string;
  };
}

/** Full detail object returned by GET /pokemon/{id or name}. */
export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
}

/** A single entry in the paginated list returned by GET /pokemon. */
export interface PokemonListItem {
  name: string;
  /** URL to fetch the full detail object for this Pokémon. */
  url: string;
}

/** Response shape for the paginated list endpoint GET /pokemon?limit=…&offset=… */
export interface PokemonListResponse {
  results: PokemonListItem[];
}
