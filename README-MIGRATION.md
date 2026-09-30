# Padre Gino's: migrasi JavaScript → TypeScript

Ini kode referensi untuk workshop migrasi Padre Gino's dari JavaScript ke TypeScript. Titik awalnya snapshot `14-testing` dari citr-v9-project.
Setiap langkah migrasi adalah satu commit, dan setiap commit punya tag.

| Tag | Langkah |
|---|---|
| step-00 | Baseline: 14-testing (JavaScript) |
| step-01 | Upgrade React 19 |
| step-02 | TypeScript 6.0.3 (+ @testing-library/react 16.3.3) |
| step-03 | tsconfig.json (allowJs) |
| step-04 | Modal.tsx + @types/react 19 |
| step-05 | ESLint: typescript-eslint (type-checked) + scripts |
| step-06 | APIResponsesTypes.ts + past.lazy.tsx |
| step-07 | contexts.ts (tuple) + __root.tsx |
| step-08 | ErrorBoundary.tsx |
| step-09 | order.lazy.tsx (events, narrowing) |
| step-10 | Pizza / Cart / Header (props) |
| step-11 | api/*.ts, skipToken, inference |
| step-12 | usePizzaOfTheDay.ts + PizzaOfTheDay.tsx |
| step-13 | contact.lazy.tsx (FormData) |
| step-14 | index.lazy.tsx + App.tsx + router Register |
| step-15 | Test ke .tsx |
| step-16 | Config ke TS, allowJs dihapus |

## Menjalankan

```bash
nvm use            # Node 20.16 (.nvmrc)
npm ci
npx playwright install   # untuk browser test (Firefox)
npm run dev        # API harus jalan: citr-v9-project/api -> npm run dev (port 3000)
npm run typecheck
npm run lint
npm run test
```

Beberapa catatan:
- `src/routeTree.gen.ts` ada di `.gitignore`. Di clone baru, jalankan `npm run dev`, `build`, atau `test` sekali sebelum `npm run typecheck`.
- Untuk melihat satu langkah: `git diff step-08 step-09`. Untuk pindah ke langkah tertentu: `git checkout step-09`.
- Jangan rename file di `src/routes` saat `npm run dev` berjalan. Plugin router mengisi file route yang kosong dengan kerangka `Hello "..."!`.
