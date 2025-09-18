Parametric AI Studio — Monorepo
================================

This repository contains the Next.js app in the `pas-next` directory and auxiliary assets/scripts.

Getting Started
---------------

1) Open a terminal in the repo root, then run the dev server from the Next.js app folder:

```bash
cd pas-next
npm install
npm run dev
```

2) Open `http://localhost:3000` in your browser.

Notes
-----

- Large assets (hi-res images, 3DM models) live under `pas-next/public/**` but heavy folders are git-ignored to keep the repo lean.
- The Rhino section includes a GLTF viewer with model switcher (Table / Wave shelf / Sonic).
- Project detail pages include a "Back to Showcase" link that returns to the landing page `#cases` section.


