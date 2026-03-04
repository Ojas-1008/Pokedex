/**
 * Main application module.
 * Orchestrates API calls, state management, and event handling.
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
import { fetchAllPokemon, fetchPokemonById } from './api.js';
import { renderPokemonGrid, showLoadingState, hideLoadingState, showErrorState, hideErrorState, showModal, hideModal, populateFilterDropdown, createPokemonCard, } from './render.js';
// ============================================
// APPLICATION STATE
// ============================================
let allPokemon = [];
let filteredPokemon = [];
let selectedType = 'all';
let currentPage = 0;
const itemsPerPage = 20;
// ============================================
// UTILITY FUNCTIONS
// ============================================
/**
 * Debounce a function to delay execution until user stops calling it.
 * @param fn - Function to debounce
 * @param delayMs - Delay in milliseconds
 * @returns Debounced function
 */
function debounce(fn, delayMs) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delayMs);
    };
}
// ============================================
// EVENT HANDLERS
// ============================================
/**
 * Initialize the application.
 * Fetches all Pokémon, populates UI, attaches listeners.
 */
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Show loading state
            showLoadingState();
            // Fetch the list of all Pokémon
            const pokemonList = yield fetchAllPokemon();
            if (pokemonList.length === 0) {
                throw new Error('No Pokémon data returned from API');
            }
            console.log(`[Init] Fetched ${pokemonList.length} Pokémon from list endpoint`);
            // Fetch full details for each Pokémon
            const detailedPokemon = [];
            for (const item of pokemonList) {
                // Extract ID from URL
                const urlParts = item.url.split('/').filter(Boolean);
                const pokemonId = parseInt(urlParts[urlParts.length - 1] || '0', 10);
                // Fetch full data (caching happens in api.ts)
                const data = yield fetchPokemonById(pokemonId);
                if (data) {
                    detailedPokemon.push(data);
                }
            }
            console.log(`[Init] Fetched full details for ${detailedPokemon.length} Pokémon`);
            // Store in global state
            allPokemon = detailedPokemon;
            filteredPokemon = detailedPokemon;
            // Extract unique types for filter dropdown
            const typesSet = new Set();
            allPokemon.forEach(pokemon => {
                pokemon.types.forEach(typeObj => {
                    typesSet.add(typeObj.type.name);
                });
            });
            const uniqueTypes = Array.from(typesSet).sort();
            console.log(`[Init] Found ${uniqueTypes.length} unique types`);
            // Populate filter dropdown
            populateFilterDropdown(uniqueTypes);
            // Render initial page
            currentPage = 0;
            const initialCards = allPokemon.slice(0, itemsPerPage);
            renderPokemonGrid(initialCards, handleCardClick);
            console.log('[Init] Rendered initial grid');
            // Attach event listeners
            attachEventListeners();
            // Hide loading state
            hideLoadingState();
            hideErrorState();
            console.log('[Init] App initialized successfully ✅');
        }
        catch (error) {
            console.error('[Init] Error during initialization:', error);
            showErrorState();
        }
    });
}
/**
 * Handle search input: filter by name or number.
 */
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput)
        return;
    const query = searchInput.value.toLowerCase().trim();
    if (query === '') {
        // Empty search: apply type filter
        if (selectedType === 'all') {
            filteredPokemon = allPokemon;
        }
        else {
            filteredPokemon = allPokemon.filter(pokemon => pokemon.types.some(t => t.type.name === selectedType));
        }
    }
    else {
        // Filter by name or number
        filteredPokemon = allPokemon.filter(pokemon => {
            const name = pokemon.name.toLowerCase();
            const number = String(pokemon.id).padStart(3, '0');
            return name.includes(query) || number.includes(query);
        });
    }
    // Reset pagination and re-render
    currentPage = 0;
    const cardsToShow = filteredPokemon.slice(0, itemsPerPage);
    renderPokemonGrid(cardsToShow, handleCardClick);
    console.log(`[Search] Found ${filteredPokemon.length} matches for "${query}"`);
}
/**
 * Handle type filter change.
 */
function handleTypeFilter() {
    const dropdown = document.getElementById('type-filter');
    if (!dropdown)
        return;
    selectedType = dropdown.value;
    // Filter by type
    if (selectedType === 'all') {
        filteredPokemon = allPokemon;
    }
    else {
        filteredPokemon = allPokemon.filter(pokemon => pokemon.types.some(t => t.type.name === selectedType));
    }
    // Reset pagination and re-render
    currentPage = 0;
    const cardsToShow = filteredPokemon.slice(0, itemsPerPage);
    renderPokemonGrid(cardsToShow, handleCardClick);
    console.log(`[Filter] Filtered by type: ${selectedType}, found ${filteredPokemon.length}`);
}
/**
 * Handle Pokémon card click: open modal with details.
 */
function handleCardClick(pokemonId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[CardClick] Opening Pokémon #${pokemonId}`);
        // Fetch data (cached if already loaded)
        const pokemon = yield fetchPokemonById(pokemonId);
        if (!pokemon) {
            console.error(`[CardClick] Failed to load Pokémon #${pokemonId}`);
            return;
        }
        // Show modal
        showModal(pokemon);
    });
}
/**
 * Handle load more button: append next batch of cards.
 */
function handleLoadMore() {
    currentPage++;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const cardsToAdd = filteredPokemon.slice(startIndex, endIndex);
    console.log(`[LoadMore] Loading page ${currentPage}, cards ${startIndex}-${endIndex}`);
    if (cardsToAdd.length === 0) {
        console.log('[LoadMore] No more cards to load');
        return;
    }
    // Append new cards to grid
    const grid = document.getElementById('pokemon-grid');
    if (!grid)
        return;
    cardsToAdd.forEach(pokemon => {
        const card = createPokemonCard(pokemon, handleCardClick);
        grid.appendChild(card);
    });
}
/**
 * Handle retry button: attempt to re-initialize app.
 */
function handleRetry() {
    console.log('[Retry] User clicked retry, attempting to reload...');
    init();
}
// ============================================
// EVENT LISTENER SETUP
// ============================================
/**
 * Attach all event listeners to DOM elements.
 */
function attachEventListeners() {
    // Search input with debounce
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        const debouncedSearch = debounce(handleSearch, 300);
        searchInput.addEventListener('input', debouncedSearch);
    }
    // Type filter dropdown
    const typeFilter = document.getElementById('type-filter');
    if (typeFilter) {
        typeFilter.addEventListener('change', handleTypeFilter);
    }
    // Card clicks via event delegation
    const grid = document.getElementById('pokemon-grid');
    if (grid) {
        grid.addEventListener('click', (event) => {
            const card = event.target.closest('.pokemon-card');
            if (card) {
                const pokemonId = parseInt(card.getAttribute('data-id') || '0', 10);
                if (!isNaN(pokemonId)) {
                    handleCardClick(pokemonId);
                }
            }
        });
    }
    // Load more button
    const loadMoreButton = document.getElementById('load-more-button');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', handleLoadMore);
    }
    // Modal close buttons and overlay
    const modalCloseBtn = document.getElementById('modal-close-button');
    const modalBackBtn = document.getElementById('modal-back-button');
    const modalOverlay = document.querySelector('.modal-overlay');
    [modalCloseBtn, modalBackBtn, modalOverlay].forEach(element => {
        element === null || element === void 0 ? void 0 : element.addEventListener('click', () => hideModal());
    });
    // Escape key to close modal
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideModal();
        }
    });
    // Retry button
    const retryButton = document.getElementById('retry-button');
    if (retryButton) {
        retryButton.addEventListener('click', handleRetry);
    }
    console.log('[EventListeners] All listeners attached ✅');
}
// ============================================
// INITIALIZATION
// ============================================
/**
 * Run initialization when DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('[App] DOM loaded, initializing Pokédex...');
    init();
});
