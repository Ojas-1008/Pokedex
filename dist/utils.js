"use strict";
/**
 * Utility functions for formatting Pokémon data for display.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = capitalize;
exports.formatHeight = formatHeight;
exports.formatWeight = formatWeight;
exports.formatStatName = formatStatName;
exports.getPokemonNumber = getPokemonNumber;
/**
 * Capitalises the first letter of a string.
 * Used to display Pokémon names in title case (e.g. "pikachu" → "Pikachu").
 */
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}
/**
 * Converts a height value from decimetres (as returned by the PokéAPI)
 * to a human-readable metres string (e.g. 4 → "0.4 m").
 */
function formatHeight(height) {
    return `${height / 10} m`;
}
/**
 * Converts a weight value from hectograms (as returned by the PokéAPI)
 * to a human-readable kilograms string (e.g. 60 → "6 kg").
 */
function formatWeight(weight) {
    return `${weight / 10} kg`;
}
/**
 * Maps a raw API stat name to a short display label.
 * Falls back to the original name if no mapping is found.
 */
function formatStatName(statName) {
    // Lookup table: API key → display label
    const statNameMap = {
        "hp": "HP",
        "attack": "Attack",
        "defense": "Defense",
        "special-attack": "Sp. Atk",
        "special-defense": "Sp. Def",
        "speed": "Speed",
    };
    return statNameMap[statName] || statName;
}
/**
 * Formats a numeric Pokédex ID as a zero-padded string prefixed with "#".
 * Ensures consistent 3-digit display (e.g. 25 → "#025", 1 → "#001").
 */
function getPokemonNumber(id) {
    return `#${String(id).padStart(3, "0")}`;
}
