# CLAUDE.md

Guidance for working in this repository.

## Project

Public website for **Twin City Cloud 7**, a non-profit flying club based at Flying
Cloud Airport (KFCM) in Eden Prairie, MN. It is a single-page React app that is
statically built and hosted on GitHub Pages at https://www.cloud7.org.

## Commit & PR conventions

- **Do not include any reference to Claude or AI tools in commit messages or PR
  descriptions.** No co-author trailers, "generated with" footers, or mentions of AI
  assistance.
- Keep commits focused; one logical change per commit.

## Commands

- `npm install` — install dependencies (**Node 18+ required**).
- `npm start` — run the webpack dev server at http://localhost:3000 (opens a browser).
- `npm run build` — production build to `dist/`.
- `npm run deploy` — manual `gh-pages` publish. **Normally handled by CI on merge to
  `main`; avoid running by hand.**

## Tech stack

- React 18 + React Router 7 (client-side routing, single page).
- webpack 5 + Babel 7 build; CSS via Bootstrap 5.
- three.js — 360° panorama viewer (`src/partials/PanoImage.js`).
- cytoscape — checkout decision-flow diagrams (`src/data/checkout.js`).
- unified / remark / rehype — Markdown rendering (`src/partials/Markdown.js`), including a
  custom `[checkout type="..."]` shortcode that renders a cytoscape diagram.
- Rust → WebAssembly module in `src/wasm` (request signing for the contact/owner API).
- Google Maps JS API — lazy-loaded only on the About page (`src/partials/HotelLaneMap.js`).

## Project structure

- `src/pages/` — routed top-level pages (Home, About, Photos, Faq, Join, Owners, OwnerArea).
- `src/partials/` — reusable components (ImageBox, HeaderText, PanoImage, Checkout,
  LoginModal, Markdown, KnownPicture, …).
- `src/services/` — non-UI logic (Fleet, Rates, Navigation, RestClient, WebsiteApi,
  EventDispatcher). Prefer pure functions here to keep logic testable.
- `src/data/` — **site content as YAML** (faq, fleet, rates, join, planningLinks,
  knownPictures, …) plus `checkout.js` diagram definitions.
- `src/wasm/` — Rust source and the prebuilt wasm package.
- `public/` — `index.html` template, images (jpg/webp/jp2 variants), `CNAME`, `404.html`,
  `manifest.json`, `robots.txt`.

## Content model

- Most site copy and data (fleet specs, rates, FAQ, testimonials, planning links) live in
  `src/data/*.yaml`, loaded via `yaml-loader`. **To change wording or data, edit the YAML,
  not the components.**
- Markdown fields (FAQ bodies, owner-area message) render through `src/partials/Markdown.js`.
  The `[checkout type="c172|n7278X|n96418|c210"]` shortcode renders the matching diagram
  from `src/data/checkout.js`.
- Geographic "Twin Cities" (the metro) is distinct from the club name "Twin City Cloud 7" —
  keep that distinction when editing copy.

## Configuration / environment

Build-time variables (loaded from `.env` via dotenv locally; GitHub Actions secrets in CI)
are injected through webpack's `DefinePlugin`:

- `APP_API` — base URL of the backend contact/owner API.
- `GOOGLE_MAPS_API_KEY` — Maps JS API key (must be HTTP-referrer-restricted).
- `GOOGLE_MAPS_MAP_ID` — Map ID required by Google Advanced Markers; falls back to the
  watermarked `DEMO_MAP_ID` if unset.

## Browser targets

Current Chrome, Edge, Firefox, and Safari (see `browserslist` in `package.json`). The build
emits modern output; older browsers are out of scope.

## Build & deploy

- CI: `.github/workflows/node-workflow.yml` builds on push to `main` and publishes `dist/`
  to GitHub Pages. **Merging to `main` deploys to production (www.cloud7.org) — there is no
  staging environment.**
- Custom domain is set via `public/CNAME`. SPA deep-link routing on GitHub Pages relies on
  the `404.html` redirect trick plus the inline script in `index.html`.

## Testing

There is no automated test suite. Validate changes by running `npm run build` (must be
green) and manually exercising the affected pages across the target browsers. A manual
deployment test checklist lives in `Planning/node-package-upgrade/plan.md`.

## Planning

Plans for larger efforts go under `Planning/`, one folder per feature.
