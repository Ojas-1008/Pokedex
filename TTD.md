# 📋 TTD — Technical Design Document
## Project Pokédex

> **Version:** 1.0  
> **Author:** Beginner Developer  
> **Date:** February 2026  
> **Scope:** Generation 1 — Kanto Region (151 Pokémon)

---

## 1. 🗂️ Project Overview

**Project Pokédex** is a beginner-friendly, browser-based web application that lets users browse, search, and explore all 151 original Kanto Pokémon. It fetches real Pokémon data from the free public [PokéAPI](https://pokeapi.co/) and displays it in a clean, card-based interface — no frameworks, no backend server, no database.

**Who is this for?**  
Anyone curious about the original 151 Pokémon — and for the developer, it's a great hands-on project to learn TypeScript, async data fetching, DOM manipulation, and clean project structure.

**What problem does it solve?**  
A personal, lightweight, and customizable Pokédex that works entirely in the browser with zero cost and zero setup for end users.

---

## 2. 🖼️ Visuals — Frontend & Backend Behavior

### 2.1 Frontend Behavior

#### Main Page (index.html)
```
+-------------------------------------------------------+
|  🔴  Pokédex          [🔍 Search by name or number ]  |
+-------------------------------------------------------+
|  [ Filter by Type ▼ ]                                 |
|                                                       |
|  +----------+  +----------+  +----------+            |
|  | #001     |  | #002     |  | #003     |            |
|  | [Image]  |  | [Image]  |  | [Image]  |            |
|  | Bulbasaur|  | Ivysaur  |  | Venusaur |            |
|  | 🌿 Grass |  | 🌿 Grass |  | 🌿 Grass |            |
|  | ☠️ Poison|  | ☠️ Poison|  | ☠️ Poison|            |
|  +----------+  +----------+  +----------+            |
|                                                       |
|  [ Load More / Pagination ]                           |
+-------------------------------------------------------+
```

#### Detail Modal
```
+------------------------------------------+
|  ← Back          #025 Pikachu            |
+------------------------------------------+
|    [Official Artwork Image]               |
|                                           |
|  Type:   ⚡ Electric                      |
|  Height: 0.4 m                            |
|  Weight: 6.0 kg                           |
|                                           |
|  Base Stats:                              |
|  HP      ████████░░░░  45                |
|  Attack  ████████░░░░  49                |
|  Defense █████░░░░░░░  40                |
|  Sp. Atk ████████░░░░  65                |
|  Sp. Def ████████░░░░  65                |
|  Speed   ██████████░░  90                |
|                                           |
|  Abilities: Static, Lightning Rod         |
|  Moves: Thunder Shock, Growl, Tail Whip  |
+------------------------------------------+
```

### 2.2 Backend Behavior (API Layer — No Server Needed)

There is **no backend server**. All data is fetched directly from PokéAPI in the browser using TypeScript `fetch()`.

```
Browser (User)
     │
     │  1. Page loads → fetch list of 151 Pokémon
     ▼
PokéAPI: https://pokeapi.co/api/v2/pokemon?limit=151&offset=0
     │
     │  2. For each card, fetch individual data
     ▼
PokéAPI: https://pokeapi.co/api/v2/pokemon/{id}
     │
     │  3. Display data in DOM (no page refresh)
     ▼
Browser renders Pokémon cards
     │
     │  4. User clicks a card → fetch detail (if not cached)
     ▼
PokéAPI: https://pokeapi.co/api/v2/pokemon/{id}
     │
     └─► Show modal with full details
```

**Caching Strategy (Simple):** Store fetched Pokémon data in a JS `Map` in memory so you don't re-fetch on repeated clicks.

---

## 3. 🛠️ Tech Stack

| Layer | Technology | Version / Notes |
|---|---|---|
| Markup | HTML5 | Plain `.html` files, semantic tags |
| Styling | CSS3 | Flexbox + Grid, CSS variables for type colors |
| Logic | TypeScript | v5.x (compiles to JavaScript) |
| Runtime | JavaScript (ES2020) | Output from TypeScript compiler (`tsc`) |
| API | PokéAPI | v2 — Free, no auth needed |
| Compiler | TypeScript Compiler (`tsc`) | Installed via Node.js / npm |
| Dev Server | Live Server (VS Code extension) | OR `npx http-server` |
| Package Manager | npm | For TypeScript compiler only |
| Browser Targets | Chrome, Firefox, Edge | Modern evergreen browsers |

### TypeScript Compiler Config (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "node",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true
  },
  "include": ["src/**/*"]
}
```

---

## 4. 🎨 Assets

### 4.1 Images
| Asset | Source | Notes |
|---|---|---|
| Pokémon sprites (small) | PokéAPI CDN | `sprites/pokemon/{id}.png` |
| Pokémon official artwork | PokéAPI JSON | `other['official-artwork'].front_default` |
| Pokéball favicon | Emoji or free PNG | Can use 🔴 as fallback |
| Type badge icons | CSS-only | No images — use CSS background colors |

### 4.2 Fonts
| Font | Source | Usage |
|---|---|---|
| `Press Start 2P` | Google Fonts | Title/logo (optional retro feel) |
| `Inter` | Google Fonts | Body text, stat numbers |

Add to `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

### 4.3 Type Color Variables (CSS)
```css
:root {
  --type-fire:     #F08030;
  --type-water:    #6890F0;
  --type-grass:    #78C850;
  --type-electric: #F8D030;
  --type-psychic:  #F85888;
  --type-poison:   #A040A0;
  --type-normal:   #A8A878;
  --type-rock:     #B8A038;
  --type-ground:   #E0C068;
  --type-ice:      #98D8D8;
  --type-bug:      #A8B820;
  --type-ghost:    #705898;
  --type-dragon:   #7038F8;
  --type-fighting: #C03028;
  --type-flying:   #A890F0;
}
```

---

## 5. ✅ Features

### 5.1 MVP — Must Have

Build these first. Don't move to stretch goals until all of these work.

| # | Feature | Description |
|---|---|---|
| 1 | **Pokémon Grid** | Show all 151 Gen 1 Pokémon as cards with sprite, name, number, and type |
| 2 | **Fetch from PokéAPI** | Use `fetch()` to get real data asynchronously |
| 3 | **Loading State** | Show a spinner or "Loading..." while data fetches |
| 4 | **Error Handling** | Show a friendly message if the API fails |
| 5 | **Detail View (Modal)** | Click a card to see full stats, image, abilities |
| 6 | **Search by Name** | Filter visible cards as the user types |
| 7 | **Responsive Layout** | Works on mobile, tablet, and desktop |
| 8 | **Type Badges** | Color-coded type labels on each card |

### 5.2 Stretch Goals — Nice to Have

Only work on these after MVP is complete and tested.

| # | Feature | Description |
|---|---|---|
| S1 | **Filter by Type** | Dropdown or buttons to filter by type |
| S2 | **Search by Number** | Type `#025` to find Pikachu |
| S3 | **Animated Stat Bars** | Progress bars for base stats in the detail view |
| S4 | **Favorites** | Star Pokémon; save preference to `localStorage` |
| S5 | **Dark Mode** | Toggle between light and dark theme |
| S6 | **Sort Options** | Sort by name (A–Z), number, or type |
| S7 | **Pokémon Cries** | Play audio cry from PokéAPI |
| S8 | **Pagination** | Load 20 cards at a time with "Load More" button |
| S9 | **Keyboard Navigation** | Escape closes modal; arrows navigate cards |
| S10 | **Shiny Toggle** | Switch between normal and shiny sprite |

---

## 6. 📁 Folder Structure

```
project-pokedex/
│
├── index.html              ← Main entry point (the only HTML file for MVP)
│
├── src/                    ← All TypeScript source files (YOU write these)
│   ├── main.ts             ← Entry point: initializes the app, attaches events
│   ├── api.ts              ← All PokéAPI fetch functions
│   ├── render.ts           ← Functions that create/update HTML in the DOM
│   ├── types.ts            ← TypeScript interfaces (PokemonData, etc.)
│   └── utils.ts            ← Helper functions (capitalize, formatHeight, etc.)
│
├── dist/                   ← Auto-generated by TypeScript compiler (DON'T EDIT)
│   ├── main.js
│   ├── api.js
│   ├── render.js
│   └── ...
│
├── css/
│   └── styles.css          ← All styling (grid, cards, modal, types, responsive)
│
├── assets/
│   └── pokeball.png        ← Favicon or logo (optional)
│
├── tsconfig.json           ← TypeScript compiler configuration
├── package.json            ← npm config (for TypeScript compiler only)
└── README.md               ← How to run the project
```

> **Beginner Tip:** The `dist/` folder is created automatically when you run `tsc`. Never manually edit files inside it — your changes will be overwritten.

---

## 7. 🔄 Logical Flow & Diagrams

### 7.1 App Initialization Flow

```
Browser opens index.html
        │
        ▼
   CSS + dist/main.js load
        │
        ▼
   main.ts: init() runs
        │
        ▼
   api.ts: fetchAllPokemon(151)
   GET https://pokeapi.co/api/v2/pokemon?limit=151
        │
        ▼
   Returns list: [{ name, url }, ...]
        │
        ▼
   For each Pokémon → api.ts: fetchPokemonById(id)
   GET https://pokeapi.co/api/v2/pokemon/{id}
        │
        ▼
   render.ts: createCard(data)
   → Builds HTML card element
   → Appends to #pokemon-grid
        │
        ▼
   151 cards on screen ✅
```

### 7.2 Search Flow

```
User types in search box
        │
        ▼
   onInput event fires
        │
        ▼
   Filter in-memory array of Pokémon
   (NO new API call — data already loaded)
        │
        ▼
   clearGrid() → re-render filtered cards
        │
        ▼
   Matching cards shown ✅
```

### 7.3 Detail Modal Flow

```
User clicks a Pokémon card
        │
        ▼
   onClick event fires
        │
        ├── Data in cache (Map)?
        │       YES                  NO
        │        │                    │
        │    Use cached         api.ts: fetchPokemonById(id)
        │    data                     │
        └────────────────────────────┘
                │
                ▼
        render.ts: showModal(pokemonData)
        → Fill modal with stats, image, abilities
        → Show modal overlay
                │
                ▼
        User reads detail info ✅
                │
                ▼
        Click X or outside modal
                │
                ▼
        render.ts: hideModal() ✅
```

### 7.4 TypeScript Interfaces (types.ts)

```typescript
// Minimal item from the list endpoint
interface PokemonListItem {
  name: string;
  url: string;
}

// Full data from /pokemon/{id}
interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: { name: string };
  }>;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  abilities: Array<{
    ability: { name: string };
  }>;
  height: number;   // in decimetres (divide by 10 for metres)
  weight: number;   // in hectograms (divide by 10 for kg)
}
```

### 7.5 Data Flow Summary

```
PokéAPI (External)
      │  fetch() → JSON
      ▼
api.ts  ──── typed data ────►  main.ts  ──── stores in cache ────► Map<id, PokemonData>
                                  │
                                  │  calls render functions
                                  ▼
                             render.ts  ──── creates DOM elements ────► index.html
                                                                              │
                                                                              ▼
                                                                     User sees result 🎉
```

---

## 8. 🚀 Getting Started (Dev Setup)

```bash
# 1. Make sure Node.js is installed
node --version   # Should print something like v18.x or v20.x

# 2. Install TypeScript globally
npm install -g typescript

# 3. Navigate to your project folder
cd project-pokedex

# 4. Compile TypeScript → JavaScript
tsc

# 5. Open index.html in a browser
#    Best option: use the VS Code "Live Server" extension for auto-reload
```

**Compile in watch mode** (auto-recompiles whenever you save a `.ts` file):
```bash
tsc --watch
```

---

## 9. 📝 Beginner Notes & Tips

- **Start small.** Get one single Pokémon card showing before loading all 151.
- **Use `console.log()`** to inspect API responses before building the UI around them.
- **Read PokéAPI docs:** [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2) — they're beginner-friendly.
- **TypeScript errors are helpful.** They catch bugs before the code even runs in the browser.
- **Don't skip error handling.** APIs fail. Always wrap `fetch()` in a `try/catch`.
- **Commit often with Git.** Even `git commit -m "cards loading now"` is a valid commit.
- **Don't rush to stretch goals.** A solid MVP beats a broken feature-packed app every time.

---

*End of TTD — Project Pokédex*