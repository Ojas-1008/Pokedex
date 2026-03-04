/**
 * API module — fetches Pokémon data from PokéAPI and caches results in memory.
 */

import type { PokemonData, PokemonListItem, PokemonListResponse } from './types.js';

// In-memory cache keyed by Pokémon ID; avoids redundant network requests.
const pokemonCache = new Map<number, PokemonData>();

/** Fetches the first 151 (Gen 1) Pokémon from the list endpoint.
 *  Returns an empty array on network or HTTP error. */
async function fetchAllPokemon(): Promise<PokemonListItem[]> {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: PokemonListResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Failed to fetch Pokémon list:', error);
    return [];
  }
}

/** Fetches full data for a Pokémon by numeric ID (e.g. 25 → Pikachu).
 *  Serves from cache when available; caches the result after a fresh fetch.
 *  Returns null on error. */
async function fetchPokemonById(id: number): Promise<PokemonData | null> {
  // Return cached entry immediately to skip the network round-trip.
  if (pokemonCache.has(id)) {
    console.log(`[Cache] Hit — Pokémon #${id}`);
    return pokemonCache.get(id)!;
  }

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: PokemonData = await response.json();

    pokemonCache.set(id, data); // Cache by ID for future lookups.
    console.log(`[Cache] Stored — Pokémon #${id}`);

    return data;
  } catch (error) {
    console.error(`Failed to fetch Pokémon #${id}:`, error);
    return null;
  }
}

/** Fetches full data for a Pokémon by name (case-insensitive, e.g. "Pikachu").
 *  Result is cached by ID so subsequent ID-based lookups also hit the cache.
 *  Returns null on error. */
async function fetchPokemonByName(name: string): Promise<PokemonData | null> {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: PokemonData = await response.json();

    // Store by numeric ID so fetchPokemonById can reuse this entry.
    pokemonCache.set(data.id, data);
    console.log(`[Cache] Stored — "${name}" (ID #${data.id})`);

    return data;
  } catch (error) {
    console.error(`Failed to fetch Pokémon "${name}":`, error);
    return null;
  }
}

export { fetchAllPokemon, fetchPokemonById, fetchPokemonByName };