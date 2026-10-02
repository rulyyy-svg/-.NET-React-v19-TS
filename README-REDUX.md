# Padre Gino's — Redux Toolkit + RTK Query Migration

Starting point: `rx-00` (= `tw-16`, TypeScript + Tailwind, TanStack Query).
End state: `rx-11`. React 19 + TypeScript 6 + Tailwind 4 + **Redux Toolkit 2.13.0 + react-redux 9.3.0 + RTK Query**. TanStack Query is gone.

## Run it

```bash
# API server (citr-v9-project/api) on :3000 — serves /api and /public
cd api && npm i && node server.js
# this app
npm ci && npm run dev
```

> `/api/past-orders` has a deliberate 5-second delay in the API server. That delay is what makes the loading and pagination behaviour visible.

## Step map

| Tag | What changed | Who |
|---|---|---|
| rx-00 | Baseline (= tw-16) | — |
| rx-01 | Install RTK + react-redux, `store.ts` (empty reducer → console error), typed hooks (`withTypes`), `Provider` | Instructor |
| rx-02 | `cartSlice` (addToCart, clearCart, selectors), `combineSlices` + `makeStore`, Header/Order on Redux, CartContext deleted, Header test uses `Provider` | Instructor |
| rx-03 | `orderSlice` (pizzaType / pizzaSize) — selection now survives navigation | **Practice 1** |
| rx-04 | `pizzaApi` (`createApi` + `fetchBaseQuery`), `getPizzas`, reducer + middleware | Instructor |
| rx-05 | `getPizzaOfTheDay`; `usePizzaOfTheDay` wraps the generated hook; hook test gets a `Provider` wrapper | **Practice 2** |
| rx-06 | `getPastOrder(id)` + `skipToken` (modal) | Instructor |
| rx-07 | `getPastOrders(page)` with `currentData` + `isFetching` | **Practice 3** |
| rx-08 | `placeOrder` mutation replaces the manual checkout fetch | Instructor |
| rx-09 | `providesTags` / `invalidatesTags` — new orders show up in Past Orders immediately | Instructor |
| rx-10 | `postContact` mutation; contact test uses `Provider` and inspects the `Request` | **Practice 4** |
| rx-11 | Remove TanStack Query (provider, devtools, eslint plugin, packages) | **Practice 5** |

Practice tags: `rx-p1-start` … `rx-p5-start` and `rx-p1-solution` … `rx-p5-solution`.

## Behaviour notes

| Change | Why |
|---|---|
| Pizza type/size survive leaving `/order` | Deliberate (orderSlice). The same reason v8 moved search params into Redux |
| A new order appears in Past Orders right away | Bug fix: before, the list was cached for 30s (`staleTime`) after checkout |
| Pizza of the Day is fetched once instead of twice in dev | RTK Query de-duplicates the StrictMode double effect |
| JS bundle 358 KB → 413 KB (gzip 109 → 130 KB) | RTK + react-redux + RTK Query is larger than TanStack Query alone. This is an honest trade-off |

UI: computed styles on every route are identical to `rx-00` (0 differences).

## Validate

```bash
npm run typecheck && npm run lint && npx vitest run && npm run build
```

> Install packages with the dev server stopped (or restart it afterwards). Otherwise Vite's dependency pre-bundling can produce "Invalid hook call". Edit route files with the dev server off too, so the router plugin cannot replace them with a stub.
