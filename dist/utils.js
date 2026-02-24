"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = capitalize;
exports.formatHeight = formatHeight;
exports.formatWeight = formatWeight;
exports.formatStatName = formatStatName;
exports.getPokemonNumber = getPokemonNumber;
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}
function formatHeight(height) {
    return `${height / 10} m`;
}
function formatWeight(weight) {
    return `${weight / 10} kg`;
}
function formatStatName(statName) {
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
function getPokemonNumber(id) {
    return `#${String(id).padStart(3, "0")}`;
}
