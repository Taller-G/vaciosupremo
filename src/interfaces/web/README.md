# Web UI (interfaces layer)

This directory is the Vite `root`.

- `index.html`, `styles.css` are UI assets.
- `main.js` wires DOM events to controllers.
- Controllers call **application** use cases and render results.

No domain logic should live here.
