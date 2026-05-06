# Hereda2

A Clean Architecture demo built with vanilla HTML, CSS and JavaScript, bundled by [Vite](https://vitejs.dev/).

---

## What it does

- Displays a **counter** that starts at **0**.
- A **`+` button** increments the counter by 1.
- A **`-` button** decrements the counter by 1.
- A **welcome-message form** asks for your name and returns a greeting generated through the full Clean Architecture stack (Domain → Application → Interfaces).

---

## Project structure

```
src/
├── domain/           # Entities, Value Objects, Domain Services, Repository interfaces
├── application/      # Use Cases, DTOs, Application errors
├── infrastructure/   # Repository implementations (LocalStorage, InMemory)
└── interfaces/
    └── web/          # Vite root — index.html, styles.css, main.js, controllers/
```

Dependencies only point **inward**: `interfaces → application → domain`.

---

## How to open / run the project

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm 9 or newer (comes with Node.js)

### 1 — Install dependencies

```bash
npm install
```

### 2 — Start the development server

```bash
npm run dev
```

Vite starts on **http://localhost:5173** and opens the browser automatically.  
The Vite root is `src/interfaces/web/`, so `index.html` is served from there.

### 3 — Build for production

```bash
npm run build
```

The static output is written to `dist/`.

### 4 — Preview the production build locally

```bash
npm run preview
```

> **Note:** Opening `index.html` directly in the browser (without a server) is **not supported**  
> because the project uses ES modules with bare imports that require a bundler or dev server.  
> Always use `npm run dev` or `npm run preview`.

---

## Manual-testing checklist

Use this list after every change to verify the core features work correctly.

### Counter

- [ ] **Inicia en 0** — the page loads and the counter shows `0` before any button is pressed
- [ ] **`+` incrementa** — pressing `+` increases the displayed value by 1 each click
- [ ] **`-` decrementa** — pressing `-` decreases the displayed value by 1 each click

### Welcome message

- [ ] Submitting the form with a valid name displays a personalised greeting
- [ ] Submitting with an empty name shows a validation error (no crash)
- [ ] The result area updates without a full page reload

---

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR at http://localhost:5173 |
| `npm run build` | Bundle for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the source tree |
| `npm run format` | Format source files with Prettier |
