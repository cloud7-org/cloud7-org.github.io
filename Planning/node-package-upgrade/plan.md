# Node Package Upgrade Plan

Prepared 2026-06-21. Goal: move `package.json` dependencies to current versions, in
risk-ordered phases so each phase can be built and smoke-tested before the next.

## Context

- Environment: Node 22.21, npm 10.9 — modern enough for every target version.
- `node_modules` is not currently installed; a clean `npm install` will be needed.
- No `PropTypes` usage anywhere in `src/`. The two prop-types babel plugins
  (`babel-plugin-transform-react-remove-prop-types`,
  `@babel/plugin-transform-react-inline-elements`) are pure dead weight and will be
  **removed**, which simplifies the React 19 migration.
- `cytoscape` is already at the latest version — no change.

## Risk classification

| Package | Current range | Target | Risk | Notes |
|---|---|---|---|---|
| webpack | ^5.65.0 | 5.107.2 | none | already latest 5.x; bump floor |
| terser-webpack-plugin | ^5.3.0 | 5.6.1 | none | minor |
| html-webpack-plugin | ^5.5.0 | 5.6.7 | none | minor |
| mini-css-extract-plugin | ^2.4.5 | 2.10.2 | none | minor |
| file-loader / url-loader | ^6 / ^4 | same | none | already latest |
| html-replace-webpack-plugin | ^2.6.0 | 2.6.0 | none | already latest |
| animate.css | ^4.1.1 | 4.1.1 | none | already latest |
| bootstrap | ^5.1.3 | 5.3.8 | low | 5.x, CSS variable additions only |
| cytoscape | ^3.20.0 | 3.34.0 | low | within 3.x |
| uuid | ^8.3.2 | 14.0.1 | low | `import {v4}` API unchanged |
| dotenv | ^10.0.0 | 17.4.2 | low | `.config()` API unchanged |
| yaml-loader | ^0.6.0 | 0.9.0 | low | output shape unchanged for `type: json` |
| copy-webpack-plugin | ^10.2.0 | 14.0.0 | low | config unchanged; Node floor raised |
| css-loader | ^6.5.1 | 7.1.4 | low | default esModule already true; side-effect CSS imports unaffected |
| style-loader | ^3.3.1 | 4.0.0 | low | dev-only; default injection unchanged |
| css-minimizer-webpack-plugin | ^3.3.1 | 8.0.0 | low | default cssnano preset |
| webpack-cli | ^4.9.1 | 7.0.3 | medium | CLI flags; build/start scripts use defaults so low in practice |
| webpack-dev-server | ^4.7.1 | 5.2.5 | medium | v5 option renames (see Phase 2) |
| unified | ^10.1.1 | 11.0.5 | medium | ESM, used in Markdown.js |
| remark-parse | ^10.0.1 | 11.0.0 | medium | with unified 11 |
| remark-gfm | ^3.0.1 | 4.0.1 | medium | with unified 11 |
| remark-rehype | ^10.1.0 | 11.1.2 | medium | with unified 11 |
| unist-util-visit | ^4.1.0 | 5.1.0 | medium | API unchanged, peer bump |
| rehype-react | ^7.0.3 | 8.0.0 | **high** | API change: drops `createElement`, needs `Fragment`/`jsx`/`jsxs` from react/jsx-runtime — **Markdown.js rewrite** |
| react / react-dom | ^17.0.2 | 19.2.x | **high** | `ReactDOM.render` removed → `createRoot`; StrictMode behavior |
| react-router-dom | ^6.2.1 | 7.18.0 | medium | API largely drop-in from v6; requires React 18+ |
| three | ^0.148.0 | 0.184.0 | medium | many minor breaks; PanoImage uses stable core API |
| @babel/* | ^7.16.5 | 8.0.x | **high** | Babel 8 major; plugin renames/removals — **babel.config.js rewrite** |
| babel-loader | ^8.2.3 | 10.1.1 | medium | v9+ requires Babel 7+, Node 18+ |
| @babel/plugin-proposal-class-properties | ^7.16.5 | (remove) | — | folded into preset-env |
| @babel/plugin-syntax-dynamic-import | ^7.8.3 | (remove) | — | built into Babel 8 |
| @babel/plugin-transform-react-inline-elements | ^7.16.5 | (remove) | — | deprecated, no PropTypes/perf need |
| babel-plugin-transform-react-remove-prop-types | ^0.4.24 | (remove) | — | no PropTypes in src |
| gh-pages (dev) | ^3.2.3 | 6.x | low | deploy-only tooling |

## Phased execution

### Phase 0 — baseline
1. `npm install` against existing lockfile, `npm run build` to confirm a green baseline
   before touching anything. Capture bundle output for comparison.

### Phase 1 — no/low-risk bumps (single PR-sized change)
Bump floors for: webpack, terser/html/mini-css plugins, bootstrap, cytoscape, uuid,
dotenv, yaml-loader, copy-webpack-plugin, css-loader, style-loader,
css-minimizer-webpack-plugin, gh-pages.
- Verify: `npm run build` + `npm start`, click through pages, confirm CSS + images load.

### Phase 2 — webpack-cli 7 + webpack-dev-server 5
- dev-server v5 renames: confirm `devServer` block in `webpack.config.js`
  (`historyApiFallback`, `compress`, `open`, `port`) — all still valid in v5; remove the
  duplicate `compress: true` key (currently set twice).
- Verify: `npm start` serves on :3000, HMR works, SPA fallback routes work.

### Phase 3 — markdown/unified ecosystem
Bump unified 11, remark-parse 11, remark-gfm 4, remark-rehype 11, unist-util-visit 5,
rehype-react 8.
- **Rewrite `src/partials/Markdown.js`**: rehype-react 8 replaces the
  `{createElement, components, passNode}` options with
  `{Fragment, jsx, jsxs, components}` imported from `react/jsx-runtime`.
  The custom `checkout` element + `processCheckout` visitor stays, but verify the
  custom-tag → component mapping still resolves under the new `components` contract.
- Verify: render a page using `<Markdown>` (checkout flows on Owners/Join) and confirm
  the `[checkout type=...]` shortcode still renders the `Checkout` component.

### Phase 4 — React 17 → 19 + react-router-dom 7
- `src/index.js`: replace `ReactDOM.render(...)` with
  `createRoot(document.getElementById('root')).render(...)` (import from `react-dom/client`).
- `react-router-dom` v7: `Routes`/`Route`/`Navigate`/`NavLink`/`useLocation`/`useNavigate`
  are drop-in. The `exact` prop on `<Route>` (App.js:23) is already a no-op in v6/v7 —
  remove it.
- Confirm `React.lazy` routes render under a `<Suspense>` boundary (currently none is
  visible in App.js — check this works today; React 18/19 will throw without one).
- Verify: full click-through, StrictMode double-invoke doesn't break PanoImage/cytoscape
  effects (both attach listeners/renderers in effects — watch for double init).

### Phase 5 — Babel 8 + babel-loader 10
- **Rewrite `babel.config.js`**:
  - Remove `@babel/plugin-syntax-dynamic-import` (built in).
  - Replace `@babel/plugin-proposal-class-properties` with
    `@babel/plugin-transform-class-properties` (or drop — preset-env covers it for modern
    targets).
  - Remove the production `env` block's `transform-react-remove-prop-types` and
    `@babel/plugin-transform-react-inline-elements`.
  - Keep `@babel/plugin-transform-runtime`, `preset-env`, `preset-react`.
- Drop the four removed packages from `package.json`.
- Verify: production build succeeds, output runs in browser, bundle size sane.

### Phase 6 — three.js 0.148 → 0.184
- `PanoImage.js` uses core API (PerspectiveCamera, Scene, SphereGeometry,
  MeshBasicMaterial, Mesh, WebGLRenderer, TextureLoader) — all stable. Main watch item:
  color management defaults changed (sRGB) around r152; the pano texture may look
  slightly different — verify visually and add `colorSpace`/`outputColorSpace` if needed.
- Verify: pano image loads, drag/zoom interaction works.

## Validation checklist (each phase)
- `npm run build` (production) succeeds with no new warnings of concern.
- `npm start` runs; manually exercise: Home, About, Photos (pano), FAQ, Join, Owners,
  Owner area login, checkout shortcode rendering.
- `npm run deploy` is **not** run during development (publishes to gh-pages).

## Decision (2026-06-21)
- **Conservative path chosen**: target **React 18** (not 19) and **keep Babel 7**
  (latest 7.x, no Babel 8). All other upgrades proceed as planned: build tooling,
  markdown/unified ecosystem, react-router 7, three 0.184, and removal of the dead
  prop-types babel plugins.
- Phase 5 (Babel 8) is dropped; babel.config.js still gets cleaned of dead plugins.
- `React.lazy` routes ARE wrapped in `<Suspense>` (Navigation.js `load()`), so the
  Suspense concern is resolved.
- There is no automated test suite; validation is manual browser testing.

## Deployment test plan

This repo is the org's GitHub Pages site, so merging to `main` deploys to
**production (https://www.cloud7.org)** — there is no staging environment and no
automated test suite, so the gate is manual verification. Treat the steps below as the
release checklist.

### 1. Pre-deploy gate (before merge)
- [ ] `npm ci` (clean install) succeeds; `npm audit` reports 0 vulnerabilities.
- [ ] `npm run build` is green (only the known large-image asset-size warnings).
- [ ] CI workflow secrets/env are present: `GOOGLE_MAPS_API_KEY`, **`GOOGLE_MAPS_MAP_ID`**
      (new — without it the map falls back to the watermarked `DEMO_MAP_ID`), and `APP_API`.
- [ ] The `GOOGLE_MAPS_API_KEY` is HTTP-referrer-restricted in the GCP console to
      `www.cloud7.org` (the key is public in the bundle).

### 2. Deploy
- [ ] Merge the PR to `main` and let the CI workflow build + publish to gh-pages
      (do not run `npm run deploy` by hand from a working tree).
- [ ] Confirm the deploy action completed green and the CNAME (`www.cloud7.org`) is intact.

### 3. Post-deploy smoke test (on https://www.cloud7.org, not localhost)
- [ ] Site loads; no console errors on first paint; CSS + images render.
- [ ] SPA deep-link + refresh works (load `/about` directly → 404.html redirect resolves).
- [ ] Hard-refresh confirms new hashed bundles are served (not stale cache).

### 4. Targeted regression checks (mapped to what changed)
- [ ] **Nav links** (About, Photos, Join, FAQ, Owners) each navigate — the regression
      from the Bootstrap collapse change. Also confirm "Contact Us" → `/join`.
- [ ] **Mobile nav**: at a narrow width, tapping a link navigates AND closes the menu.
- [ ] **Viewport**: mobile renders at normal zoom (initial-scale=1) with no horizontal
      overflow on small screens.
- [ ] **FAQ checkout shortcodes** render the cytoscape diagrams (rehype-react 8 migration).
- [ ] **Photos / pano** (three.js 0.184): image loads, drag + wheel-zoom work, colors look
      right (sRGB default change). Navigate away and back — confirm no duplicate canvas.
- [ ] **Map page** (AdvancedMarkerElement): map renders, all three markers appear (West/
      North gate keypad icons + Hotel Lane). Loads only on this page, not site-wide.
      Confirm no `DEMO_MAP_ID` watermark once `GOOGLE_MAPS_MAP_ID` is set.
- [ ] **Owner login modal**: Enter submits (onKeyDown), bad login shakes (animate.css),
      good login navigates to `/owner/files` (exercises wasm `PostHeaders` + RestClient
      static class fields under the modern browser target).
- [ ] **Owner area**: file/folder list loads and a file downloads (RestClient `doGet`).
- [ ] **Social preview**: validate OG/Twitter tags (e.g. share to Slack/iMessage or use a
      card validator) — title, description, and header image resolve.

### 5. Cross-browser matrix
Run the smoke + targeted checks on current **Chrome, Edge, Firefox, Safari** (the declared
browserslist targets — modern output is shipped, so older browsers are explicitly out of
scope). Include at least one real mobile device/emulator for the nav + viewport checks.

### 6. Rollback
- If a regression is found post-deploy, revert the merge commit on `main` and re-deploy
  (gh-pages republishes the prior build). Note `GOOGLE_MAPS_MAP_ID` is additive, so a
  revert does not require removing the secret.
