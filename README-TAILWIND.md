# Padre Gino's — TypeScript → TailwindCSS Migration

Starting point: `tw-00` (the TypeScript workshop result, `padre-ginos-ts`).
End state: `tw-16` — React 19 + TypeScript 6.0.3 + Tailwind CSS 4.3.3, no legacy stylesheet.

## Run it

```bash
# 1. API server (citr-v9-project/api) on :3000 — it serves /api AND /public (fonts, logo, pizza images)
cd api && npm i && node server.js

# 2. this app
npm ci
npm run dev        # http://localhost:5173
```

> `/public/*` is proxied to the API server (see `vite.config.ts`). The original `style.css` also lived there
> (`api/public/style.css`). In `tw-02` it was copied into this repo as `src/legacy.css`, so the stylesheet is
> now owned by the frontend. The fonts and logo still come from the API server.

## Step map

| Tag | Part | What changed | Who |
|---|---|---|---|
| tw-00 | — | Baseline. Orphaned `Cart.test.jsx.snap` removed | — |
| tw-01 | 1 | `tailwindcss` + `@tailwindcss/vite` 4.3.3, `src/index.css`, `vite/client` types (TS2882), eslint ignores `dist/` | Instructor |
| tw-02 | 1 | `style.css` → `src/legacy.css` in `@layer legacy`; Preflight off during migration; `<link>` removed | Instructor |
| tw-03 | 1 | `@theme` tokens: primary, secondary, background, border, pacifico | Instructor |
| tw-04 | 2 | Pizza | Instructor |
| tw-05 | 8 | PizzaOfTheDay | **Practice 1** |
| tw-06 | 3 | Cart + button variants (`hover:` `focus-visible:` `disabled:`), snapshot updated | Instructor |
| tw-07 | 8 | ErrorBoundary | **Practice 2** |
| tw-08 | 4 | Order form: `@tailwindcss/forms` (class strategy), `peer-checked:` radio cards, `sr-only` radios | Instructor |
| tw-09 | 8 | Contact form | **Practice 3** |
| tw-10 | 5 | `@apply`: `.btn` (components) + `h2` (base); snapshot updated | Instructor |
| tw-11 | 6 | Order grid `lg:grid-cols-[2fr_1fr]`, form `md:flex-row`, Cart border swap, contact `max-w`; snapshot updated | Instructor |
| tw-12 | 8 | Index `grid-cols-1 sm:grid-cols-2` | **Practice 4** |
| tw-13 | 8 | Past Orders tables + pagination (`even:` `last:` `sm:min-w-100`) | **Practice 5** |
| tw-14 | 7 | `#modal` → `fixed inset-0 z-10 … empty:hidden`, Modal panel | Instructor |
| tw-15 | 8 | Header: `grid-cols-[repeat(5,auto)]`, relative badge offset | **Practice 6** |
| tw-16 | 10 | Delete `legacy.css`, turn Preflight on, fix implicit browser-default dependencies | Instructor |

Practice tags: `p1-start`…`p6-start` (check out before the exercise) and `p1-solution`…`p6-solution`.

## Parity

Every step was checked against `tw-00` by comparing the computed styles of every element on `/`, `/order`, `/past`, the modal, and `/contact` at 1280px.

Differences that were accepted on purpose:

| Where | Change | Why |
|---|---|---|
| Order `<select>` | `form-select` look (arrow, gray border, +5px height) | Demonstrates `@tailwindcss/forms`; normalizes the select across browsers |
| Size radios | `display:none` → `sr-only` + focus outline on the label | The radios can now be reached by keyboard (before: not focusable) |
| Contact fields | 13.33px → 16px font, textarea monospace → Arial, focus outline visible | Preflight `font: inherit`; 16px avoids iOS zoom-on-focus; focus stays visible |
| Button hover | `hover:bg-primary/10` | The original had no hover state; added as a variant example |
| < lg / < md / < sm | Responsive stacking (order, index, cart border, contact, table) | The original had no responsive rules; it overflowed horizontally at 390px on `/order`, `/past`, and `/contact` |

## Validate

```bash
npm run typecheck && npm run lint && npx vitest run && npm run build
```

> Editing route files with a script while `npm run dev` is running can make the router plugin overwrite the file with a
> `Hello "/"!` stub. Save from the editor, or stop the dev server first.
