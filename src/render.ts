/**
 * Render module: DOM creation and manipulation.
 * All functions that create or update HTML elements.
 */

import type { PokemonData } from './types.js';
import { capitalize, formatHeight, formatWeight, formatStatName, getPokemonNumber } from './utils.js';

// ============================================
// CARD CREATION
// ============================================

/**
 * Create a Pokémon card element.
 * @param pokemon - The Pokémon data
 * @param onCardClick - Callback when card is clicked
 * @returns HTMLElement (article.pokemon-card)
 */
function createPokemonCard(
  pokemon: PokemonData,
  onCardClick: (id: number) => void
): HTMLElement {
  const card = document.createElement('article');
  card.className = 'pokemon-card';
  card.setAttribute('data-id', String(pokemon.id));
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `View ${capitalize(pokemon.name)} details`);

  // Number
  const numberSpan = document.createElement('span');
  numberSpan.className = 'pokemon-number';
  numberSpan.textContent = getPokemonNumber(pokemon.id);

  // Image
  const img = document.createElement('img');
  img.src = pokemon.sprites.front_default;
  img.alt = `${capitalize(pokemon.name)} sprite`;
  img.className = 'pokemon-sprite';
  img.loading = 'lazy';

  // Name
  const nameHeading = document.createElement('h2');
  nameHeading.className = 'pokemon-name';
  nameHeading.textContent = capitalize(pokemon.name);

  // Types
  const typesDiv = document.createElement('div');
  typesDiv.className = 'pokemon-types';
  pokemon.types.forEach(typeObj => {
    const badge = createTypeBadge(typeObj.type.name);
    typesDiv.appendChild(badge);
  });

  // Assemble
  card.appendChild(numberSpan);
  card.appendChild(img);
  card.appendChild(nameHeading);
  card.appendChild(typesDiv);

  // Events
  card.addEventListener('click', () => onCardClick(pokemon.id));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCardClick(pokemon.id);
    }
  });

  return card;
}

/**
 * Create a type badge element.
 * @param typeName - The type name (e.g., "electric")
 * @returns HTMLElement (span.type-badge)
 */
function createTypeBadge(typeName: string): HTMLElement {
  const badge = document.createElement('span');
  badge.className = `type-badge type-${typeName}`;
  badge.textContent = capitalize(typeName);
  return badge;
}

// ============================================
// GRID RENDERING
// ============================================

/**
 * Render the Pokémon grid with all cards.
 * @param pokemonList - Array of Pokémon data
 * @param onCardClick - Callback for card clicks
 */
function renderPokemonGrid(
  pokemonList: PokemonData[],
  onCardClick: (id: number) => void
): void {
  const grid = document.getElementById('pokemon-grid');
  if (!grid) return;

  grid.innerHTML = '';

  pokemonList.forEach(pokemon => {
    const card = createPokemonCard(pokemon, onCardClick);
    grid.appendChild(card);
  });
}

// ============================================
// STATE MANAGEMENT
// ============================================

/**
 * Show the loading state (spinner).
 */
function showLoadingState(): void {
  document.getElementById('loading-state')?.classList.remove('hidden');
  document.getElementById('pokemon-grid')?.classList.add('hidden');
  document.getElementById('error-state')?.classList.add('hidden');
}

/**
 * Hide the loading state.
 */
function hideLoadingState(): void {
  document.getElementById('loading-state')?.classList.add('hidden');
  document.getElementById('pokemon-grid')?.classList.remove('hidden');
}

/**
 * Show the error state.
 */
function showErrorState(): void {
  document.getElementById('error-state')?.classList.remove('hidden');
  document.getElementById('pokemon-grid')?.classList.add('hidden');
  document.getElementById('loading-state')?.classList.add('hidden');
}

/**
 * Hide the error state.
 */
function hideErrorState(): void {
  document.getElementById('error-state')?.classList.add('hidden');
}

// ============================================
// MODAL
// ============================================

/**
 * Show the detail modal for a Pokémon.
 * @param pokemon - The Pokémon data
 */
function showModal(pokemon: PokemonData): void {
  const modal = document.getElementById('pokemon-modal');
  if (!modal) return;

  // Title
  const title = document.getElementById('modal-title');
  if (title) {
    title.textContent = `${getPokemonNumber(pokemon.id)} ${capitalize(pokemon.name)}`;
  }

  // Image
  const img = document.getElementById('modal-image') as HTMLImageElement;
  if (img) {
    img.src = pokemon.sprites.other['official-artwork'].front_default;
    img.alt = `${capitalize(pokemon.name)} official artwork`;
  }

  // Types
  const typesContainer = document.getElementById('modal-types');
  if (typesContainer) {
    typesContainer.innerHTML = '';
    pokemon.types.forEach(typeObj => {
      const badge = createTypeBadge(typeObj.type.name);
      typesContainer.appendChild(badge);
    });
  }

  // Height
  const heightEl = document.getElementById('modal-height');
  if (heightEl) {
    heightEl.textContent = formatHeight(pokemon.height);
  }

  // Weight
  const weightEl = document.getElementById('modal-weight');
  if (weightEl) {
    weightEl.textContent = formatWeight(pokemon.weight);
  }

  // Stats
  const statsContainer = document.getElementById('modal-stats');
  if (statsContainer) {
    statsContainer.innerHTML = '';

    pokemon.stats.forEach(statObj => {
      const baseValue = statObj.base_stat;
      const maxValue = 255;
      const percentage = (baseValue / maxValue) * 100;

      const statRow = document.createElement('div');
      statRow.className = 'stat-row';

      const statName = document.createElement('span');
      statName.className = 'stat-name';
      statName.textContent = formatStatName(statObj.stat.name);

      const barContainer = document.createElement('div');
      barContainer.className = 'stat-bar-container';

      const bar = document.createElement('div');
      bar.className = 'stat-bar';
      bar.style.width = `${percentage}%`;
      bar.setAttribute('role', 'progressbar');
      bar.setAttribute('aria-valuenow', String(baseValue));
      bar.setAttribute('aria-valuemin', '0');
      bar.setAttribute('aria-valuemax', '255');

      barContainer.appendChild(bar);

      const number = document.createElement('span');
      number.className = 'stat-number';
      number.textContent = String(baseValue);

      statRow.appendChild(statName);
      statRow.appendChild(barContainer);
      statRow.appendChild(number);

      statsContainer.appendChild(statRow);
    });
  }

  // Abilities
  const abilitiesContainer = document.getElementById('modal-abilities');
  if (abilitiesContainer) {
    abilitiesContainer.innerHTML = '';
    pokemon.abilities.forEach(abilityObj => {
      const li = document.createElement('li');
      li.textContent = capitalize(abilityObj.ability.name.replace('-', ' '));
      abilitiesContainer.appendChild(li);
    });
  }

  // Moves (first 4)
  const movesContainer = document.getElementById('modal-moves');
  if (movesContainer) {
    movesContainer.innerHTML = '';
    const displayMoves = pokemon.moves.slice(0, 4);
    displayMoves.forEach(moveObj => {
      const li = document.createElement('li');
      li.textContent = capitalize(moveObj.move.name.replace('-', ' '));
      movesContainer.appendChild(li);
    });
  }

  // Show modal
  modal.classList.add('active');
  const closeButton = document.getElementById('modal-close-button');
  closeButton?.focus();
}

/**
 * Hide the detail modal.
 */
function hideModal(): void {
  document.getElementById('pokemon-modal')?.classList.remove('active');
}

// ============================================
// FILTER
// ============================================

/**
 * Populate the type filter dropdown.
 * @param uniqueTypes - Array of unique type names
 */
function populateFilterDropdown(uniqueTypes: string[]): void {
  const dropdown = document.getElementById('type-filter') as HTMLSelectElement;
  if (!dropdown) return;

  // Keep "All Types" option, remove others
  while (dropdown.options.length > 1) {
    dropdown.remove(1);
  }

  // Add new options
  uniqueTypes.forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = capitalize(type);
    dropdown.appendChild(option);
  });
}

// ============================================
// EXPORTS
// ============================================

export {
  createPokemonCard,
  createTypeBadge,
  renderPokemonGrid,
  showLoadingState,
  hideLoadingState,
  showErrorState,
  hideErrorState,
  showModal,
  hideModal,
  populateFilterDropdown,
};