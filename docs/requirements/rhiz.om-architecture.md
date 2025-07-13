# Rhiz.om Architecture — v2025-07-12

---

## 0 · Core idea

> **One repo, one global edge function, one set of batteries.**
> Compose tiny, boring pieces (Deno 2, Vite 7, React 19, Tailwind 4, Flowbite 3) so the whole system fits in your head and scales from hobby to prod.

---

## 1 · Stack & pinned versions

| Layer         | Choice         | Version @ 2025-07-12                                            | Why                                                 |
| ------------- | -------------- | --------------------------------------------------------------- | --------------------------------------------------- |
| Runtime       | Deno           | **2.4.1** (released 2025-07-08) ([Deno][1])                     | Native TS, <1 ms cold-start, zero config on Deploy. |
| Edge host     | Deno Deploy    | Free tier (1 M req/100 GB)                                      | Cheapest path to global isolates.                   |
| Front-end     | React          | **19.1.0** (2025-03-28) ([X (formerly Twitter)][2])             | Stable Actions API, huge mind-share.                |
| Bundler / dev | Vite           | **7.0.4**) ([vitejs][3])                            | Fastest HMR; plug-ins for Tailwind & React.         |
| CSS engine    | Tailwind CSS   | **4.1.11** (latest patch) ([GitHub][4])                         | OKLCH palette, 5× faster builds.                    |
| UI kit        | Flowbite       | **3.1.2** (upgrades to Tailwind 4) ([GitHub][5], [Flowbite][6]) |                                                     |
| React wrapper | flowbite-react | **0.11.8** (published “last month”) ([npm][7])                  |                                                     |
| Auth          | Auth0 SPA SDK  | **2.2.0** (published “last month”) ([npm][8])                   |                                                     |
| Data (kv)     | Deno KV        | 64 KiB value / 1 GiB free                                       | ACID, no infra.                                     |
| Blobs         | Cloudflare R2  | 10 GB free, zero egress                                         | S3-compatible, edge-close.                          |

---

## 2 · Topology

```
React 19 SPA  ─┬─>  /api/*  Edge function (serve.ts)
               │         ├── verify Auth0 JWT (JWKS cache)
               │         ├── KV reads/writes  (64 KiB cap)
               │         └── R2 presign / redirect
               └─>  PUT blobs  ───────────►  Cloudflare R2
```

*Everything behind `/api/*`; SPA is just static assets.*

---

## 3 · Repo blueprint

```
rhiz.om/
├─ api/
│  ├─ serve.ts            // entrypoint => serve(router) - use Deno.serve + URLPattern
│  ├─ routes/
│  │  ├─ auth.ts          // /api/auth/*
│  │  ├─ uploads.ts       // /api/uploads/*
│  │  └─ files.ts         // 302 to R2
│  └─ auth/               // Auth0 JWKS + middleware
├─ web/
│  ├─ index.html
│  ├─ main.tsx
│  ├─ tailwind.css        // @tailwind + flowbite import
│  ├─ pages/              // React Router v6
│  └─ components/         // flowbite-react widgets
├─ tailwind.config.js     // plugin: ["flowbite"]
├─ deno.jsonc             // tasks: dev, lint, fmt, test, deploy
├─ import_map.json        // pin edge deps
└─ .github/workflows/ci.yml + deploy.yml
```

---

## 4 · Key flows & rationale

| Flow                                     | Steps                                                                                                            | Why this design                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Login (Google / GitHub / Apple / FB)** | SPA → Auth0 Universal Login → OAuth provider → back with `access_token` (in memory) + refresh cookie             | Zero social-OAuth code, complies with PKCE & MFA.                                      |
| **Secure API call**                      | `Authorization: Bearer …` → JWKS verify (≤1 ms mem cache) → handler                                              | One guard for every `/api/*` route.                                                    |
| **File upload**                          | `POST /api/uploads/sign` → presigned PUT to R2 (AWS SDK) → browser PUT → `POST /api/uploads/confirm` → KV record | Edge never streams blobs; free bandwidth stays free.                                   |
| **Chat timeline**                        | Flowbite chat bubbles mapped in React list (`<Message/>`)                                                        | Bubble markup is pure Tailwind — add reactions/menus by dropping extra buttons inside. |

---

## 5 · Quality gates

* **Type-check** – `deno check api && tsc -p web`
* **Lint / fmt** – `deno lint`, `deno fmt`, `eslint` for React.
* **Unit** – `deno test` (edge utils) + **Vitest** (hooks/components).
* **E2E** – **Playwright** hits local `/api` + SPA.
* **CI fail-fast** if <80 % coverage or any lint/format diff.

---

## 6 · Why each pick (Orin’s cut)

* **Deno 2 + Deploy** – one binary; permissions; web-spec APIs; no Docker.
* **Tailwind 4** – atomic styling; encode design in classnames; zero runtime.
* **Flowbite 3** – menus, forms, *and* chat bubbles free; React wrapper saves prop-drilling; no design paralysis.
* **Auth0** – outsource OAuth & session rotation; edge code stays 20 lines.
* **KV + R2** – small hot data fast; cold blobs cheap; both free at start.
* **Vite 7** – 50 ms HMR; plugin ecosystem; aligns with Tailwind & React 19.

---

## 7 · Future levers

1. **Swap Flowbite Pro** if you need full SaaS templates.
2. Replace Auth0 with self-hosted if cost beats value.
3. Move heavy jobs to Cloudflare Queues + Workers when 50 ms CPU hits.
4. Introduce TanStack Query once data graphs outrun `fetch + SWR`.

---

*Build small, compose freely, ship globally. — Orin*

[1]: https://deno.com/blog/v2.4?utm_source=chatgpt.com "Deno 2.4: deno bundle is back"
[2]: https://x.com/reactjs/status/1905734761039233283?utm_source=chatgpt.com "React 19.1 has just been released! Check out the latest updates here"
[3]: https://vite.dev/blog/announcing-vite7?utm_source=chatgpt.com "Vite 7.0 is out!"
[4]: https://github.com/tailwindlabs/tailwindcss/releases?utm_source=chatgpt.com "Releases · tailwindlabs/tailwindcss - GitHub"
[5]: https://github.com/themesberg/flowbite/releases "Releases · themesberg/flowbite · GitHub"
[6]: https://flowbite.com/docs/getting-started/quickstart/?utm_source=chatgpt.com "Quickstart - Flowbite"
[7]: https://www.npmjs.com/package/flowbite-react?utm_source=chatgpt.com "flowbite-react - NPM"
[8]: https://www.npmjs.com/package/%40auth0/auth0-spa-js?utm_source=chatgpt.com "@auth0/auth0-spa-js - npm"
