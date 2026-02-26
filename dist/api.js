"use strict";
/**
 * API module — fetches Pokémon data from PokéAPI and caches results in memory.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllPokemon = fetchAllPokemon;
exports.fetchPokemonById = fetchPokemonById;
exports.fetchPokemonByName = fetchPokemonByName;
// In-memory cache keyed by Pokémon ID; avoids redundant network requests.
const pokemonCache = new Map();
/** Fetches the first 151 (Gen 1) Pokémon from the list endpoint.
 *  Returns an empty array on network or HTTP error. */
function fetchAllPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
            const response = yield fetch(url);
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const data = yield response.json();
            return data.results;
        }
        catch (error) {
            console.error('Failed to fetch Pokémon list:', error);
            return [];
        }
    });
}
/** Fetches full data for a Pokémon by numeric ID (e.g. 25 → Pikachu).
 *  Serves from cache when available; caches the result after a fresh fetch.
 *  Returns null on error. */
function fetchPokemonById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Return cached entry immediately to skip the network round-trip.
        if (pokemonCache.has(id)) {
            console.log(`[Cache] Hit — Pokémon #${id}`);
            return pokemonCache.get(id);
        }
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
            const response = yield fetch(url);
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const data = yield response.json();
            pokemonCache.set(id, data); // Cache by ID for future lookups.
            console.log(`[Cache] Stored — Pokémon #${id}`);
            return data;
        }
        catch (error) {
            console.error(`Failed to fetch Pokémon #${id}:`, error);
            return null;
        }
    });
}
/** Fetches full data for a Pokémon by name (case-insensitive, e.g. "Pikachu").
 *  Result is cached by ID so subsequent ID-based lookups also hit the cache.
 *  Returns null on error. */
function fetchPokemonByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
            const response = yield fetch(url);
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const data = yield response.json();
            // Store by numeric ID so fetchPokemonById can reuse this entry.
            pokemonCache.set(data.id, data);
            console.log(`[Cache] Stored — "${name}" (ID #${data.id})`);
            return data;
        }
        catch (error) {
            console.error(`Failed to fetch Pokémon "${name}":`, error);
            return null;
        }
    });
}
