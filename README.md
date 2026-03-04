# Pokédex - Generation 1

<div align="center">

![Pokédex Banner](https://img.shields.io/badge/Pokédex-Generation_1-E94560?style=for-the-badge&logo=pokemon)

A modern, glassmorphism-styled Pokédex web application built with TypeScript, featuring all 151 original Pokémon from Generation 1.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

![Preview](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Accessibility](#-accessibility)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔍 Search & Filter
- **Real-time Search**: Search Pokémon by name or Pokédex number with debounced input
- **Type Filtering**: Filter Pokémon by any of the 15 Generation 1 types
- **Combined Filtering**: Search and filter work together seamlessly

### 📱 User Interface
- **Glassmorphism Design**: Modern, clean UI with frosted glass effects
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: CSS animations and transitions powered by Animate.css and AOS
- **Dark Theme**: Eye-friendly dark gradient background with accent colors

### 🃏 Pokémon Cards
- **Interactive Cards**: Hover effects with scale and rotation animations
- **Type Badges**: Color-coded type badges with gradient backgrounds
- **Pokédex Numbers**: Each card displays the official Pokédex number
- **Official Artwork**: High-quality sprites from the official PokéAPI repository

### 📊 Detailed Pokémon Information
- **Modal View**: Click any Pokémon to see detailed information
- **Base Stats**: HP, Attack, Defense, Sp. Atk, Sp. Def, Speed with visual progress bars
- **Abilities**: List of all abilities for each Pokémon
- **Moves**: Complete move list for each Pokémon
- **Physical Stats**: Height and weight information
- **Type Matchups**: Visual type representation

### ⚡ Performance
- **Intelligent Caching**: In-memory caching prevents redundant API calls
- **Pagination**: Load More functionality for better initial load times
- **Lazy Loading**: Images load as needed with native lazy loading
- **Debounced Search**: Search input is debounced to reduce unnecessary computations

---

## 🌐 Live Demo

> **Note**: Deploy this project to your preferred hosting platform (Vercel, Netlify, GitHub Pages, etc.)

Once deployed, visit your live URL to explore the Pokédex!

---

## 📸 Screenshots

### Desktop View
The main Pokédex grid with search and filter functionality.

### Mobile View
Fully responsive design optimized for mobile devices.

### Pokémon Detail Modal
Detailed view showing stats, abilities, and moves.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript 5.0** | Type-safe JavaScript development |
| **HTML5** | Semantic markup with ARIA attributes |
| **CSS3** | Custom glassmorphism styling with CSS variables |
| **ES2020 Modules** | Modular code organization |
| **Animate.css** | Pre-built CSS animations |
| **AOS (Animate On Scroll)** | Scroll-triggered animations |
| **PokéAPI** | Free RESTful Pokémon data API |
| **serve** | Local development server |

---

## 📦 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Clone the Repository

```bash
git clone https://github.com/Ojas-1008/Pokedex.git
cd Pokedex
```

### Install Dependencies

```bash
npm install
```

---

## 🚀 Usage

### Development Server

Start the development server with hot reload:

```bash
npm start
```

This will:
1. Compile TypeScript to JavaScript
2. Start a local server (default: `http://localhost:3000`)

### Watch Mode

For active development with automatic recompilation:

```bash
npm run watch
```

Open your browser and navigate to `http://localhost:3000`

---

## 📁 Project Structure

```
Pokedex/
├── index.html              # Main HTML file with semantic markup
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── .gitignore              # Git ignore rules
│
├── src/                    # TypeScript source files
│   ├── types.ts            # TypeScript interfaces and types
│   ├── api.ts              # API fetch functions with caching
│   ├── utils.ts            # Utility functions
│   ├── render.ts           # DOM rendering functions
│   ├── main.ts             # Application entry point
│   └── test.ts             # Test utilities
│
├── dist/                   # Compiled JavaScript (generated)
│   ├── types.js
│   ├── api.js
│   ├── utils.js
│   ├── render.js
│   └── main.js
│
├── css/                    # Stylesheets
│   └── styles.css          # Main glassmorphism styles
│
├── assets/                 # Static assets
│   └── pokeball.png        # Pokéball icon
│
└── node_modules/           # Dependencies (not committed)
```

---

## 🔌 API Reference

This project uses the **[PokéAPI](https://pokeapi.co/)** - a free, open-source RESTful API for Pokémon data.

### Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `GET /api/v2/pokemon/` | List of all Pokémon species |
| `GET /api/v2/pokemon/{id}` | Detailed data for specific Pokémon |

### Data Structure

The application mirrors the PokéAPI response structure:

```typescript
interface PokemonData {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: Array<{ type: { name: string } }>;
    stats: Array<{ base_stat: number; stat: { name: string } }>;
    abilities: Array<{ ability: { name: string } }>;
    moves: Array<{ name: string }>;
    sprites: {
        other: {
            "official-artwork": { front_default: string };
        };
    };
}
```

> **Note**: No API key is required. The PokéAPI is free and publicly available.

---

## 👨‍💻 Development

### Code Style

- **Strict TypeScript**: All code follows strict type checking
- **ES Modules**: Modern import/export syntax
- **Functional Programming**: Pure functions where possible
- **Event Delegation**: Efficient event handling

### Key Design Patterns

1. **Module Pattern**: Each `.ts` file is a self-contained module
2. **State Management**: Centralized application state in `main.ts`
3. **Caching**: In-memory cache prevents redundant API calls
4. **Debouncing**: Search input is debounced for performance

### Adding New Features

1. Create/modify TypeScript files in `src/`
2. Run `npm run build` to compile
3. Test changes in the browser
4. Commit and push

---

## 🏗️ Building for Production

### Compile TypeScript

```bash
npm run build
```

This generates optimized JavaScript in the `dist/` folder.

### Deployment Checklist

- [ ] TypeScript compiles without errors
- [ ] All assets are in the `assets/` folder
- [ ] `dist/` folder contains compiled JS
- [ ] Test locally with `npm start`
- [ ] Deploy to hosting platform

### Recommended Hosting

- **Vercel** - Zero-config deployment
- **Netlify** - Continuous deployment from Git
- **GitHub Pages** - Free static hosting
- **Cloudflare Pages** - Fast global CDN

---

## ♿ Accessibility

This Pokédex is built with accessibility in mind:

- ✅ **Semantic HTML**: Proper use of `<article>`, `<section>`, `<header>`, `<footer>`
- ✅ **ARIA Attributes**: `role`, `aria-label`, `aria-live` for screen readers
- ✅ **Keyboard Navigation**: All interactive elements are focusable
- ✅ **Focus Indicators**: Visible focus states for all buttons and cards
- ✅ **Alt Text**: All images have descriptive alt attributes
- ✅ **Color Contrast**: Text meets WCAG contrast requirements
- ✅ **Screen Reader Support**: Loading and error states announced properly

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Guidelines

- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed

---

### Attribution

- Pokémon data provided by **[PokéAPI](https://pokeapi.co/)**
- Pokémon sprites © The Pokémon Company / Nintendo / GAME FREAK
- This is a fan project and is not affiliated with The Pokémon Company

---

## 🙏 Acknowledgments

- **[PokéAPI](https://github.com/PokeAPI/pokeapi)** - For the amazing free API
- **[Animate.css](https://animate.style/)** - For beautiful CSS animations
- **[AOS](https://michalsnik.github.io/aos/)** - For scroll animations
- **The Pokémon Company** - For creating the beloved Pokémon franchise

---

<div align="center">

**Made with ❤️ by [Ojas](https://github.com/Ojas-1008)**

⭐ Star this repo if you found it helpful!

</div>
