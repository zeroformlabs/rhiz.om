## rhiz.om Logging & Error-Handling Specification

*Revision · 12 Jul 2025*

---

### 1 Goals & Principles

| # | Principle                                                                                                                                                                                                                                            |
| - | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | **Make bugs loud.** If an exception would leave the system in an indeterminate state, let the boundary crash—never hide it.                                                                                                                          |
| 2 | **Single, structured stream.** Every event—browser, API, worker—terminates in the same JSON-ND Pino log on the server.                                                                                                                               |
| 3 | **Zero-friction DX.** Pretty, colourised dev output; JSON in prod so containers can pipe straight to Loki, Datadog, CloudWatch, etc.                                                                                                                 |
| 4 | **Context everywhere.** Use Pino **child loggers** by module/request/component; tags are automatic, overhead is negligible. ([Better Stack][1], [GitHub][2])                                                                                         |
| 5 | **User clarity.** Surface errors either (a) via `<ErrorBoundary>` fallbacks, or (b) by persisting a **“error intention”** that contains a JSON content-island describing the failure.  |

---

### 2 Library Stack (verified July 2025)

| Runtime            | Package              | Min Version      | Notes                                                             |
| ------------------ | -------------------- | ---------------- | ----------------------------------------------------------------- |
| Node/Deno (server) | `pino`               | `^9.2`           | Current major → maintained & OTEL-friendly ([GitHub][5])          |
|                    | `pino-pretty`        | `^10` (dev only) | Colourised console ([Better Stack][1])                            |
|                    | `pino-http`          | `^9`             | Auto-wraps HTTP/WS                                                |
| Browser            | `pino/browser`       | `^9`             | Same API                                                          |
|                    | `pino-transmit-http` | `^3`             | Batches logs to `/api/log` using `sendBeacon/fetch` ([GitHub][6]) |

> **Transport threading.** All heavy log processing must run in a worker via `pino.transport()`—per core recommendation. ([GitHub][5])

---

### 3 Logging Architecture

#### 3.1 Root Logger

```ts
// logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport: process.env.NODE_ENV === 'development'
    ? {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:standard' }
      }
    : undefined,
  redact: ['req.headers.authorization', 'password']
});
```

* Prod emits one JSON line per event to **stdout**—the container takes it from there, matching industry best practice. ([overcast blog][7])
* Derive child loggers liberally:

  ```ts
  const log = logger.child({ mod: 'auth', fn: 'login', reqId });
  log.info('user authenticated');
  ```

#### 3.2 HTTP & WebSocket

`pino-http` attaches `req.log` / `socket.log` (pre-tagged with `reqId`, `userId`, etc.).

#### 3.3 Browser Logger

```ts
import pino from 'pino/browser';
import transmit from 'pino-transmit-http';

export const log = pino({
  browser: {
    transmit: {
      level: 'error',            // ship only errors by default
      send: transmit({
        url: '/api/log',
        debounce: 1_000,
        sendBeacon: true
      })
    }
  }
});
```

#### 3.4 `POST /api/log` Contract

| Field     | Type       | Notes                  |
| --------- | ---------- | ---------------------- |
| `ts`      | `number`   | Epoch ms               |
| `level`   | Pino level | `'error'`, `'warn'`, … |
| `msg`     | `string`   | Human message          |
| `browser` | `true`     | Fixed flag             |
| `context` | `object`   | Arbitrary              |

Handler: `logger.child({ browser: true }).[level](payload)`.

---

### 4 Error-Handling Playbook

| Scope                                                                          | Pattern                                                                        | Reason                          |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------- |
| Library/business code                                                          | **Don’t catch.** Let it bubble.                                                | Preserve stack & `cause`.       |
| Framework boundary (API entry, worker `onmessage`, cron)                       | `try … catch (err) { log.error(err); throw err; }`                             | Log once, still crash boundary. |
| UI components                                                                  | Wrap with `<ErrorBoundary>`; fallback shows red card + `log.error(err)`. | User sees local failure.        |
| Global unhandled (`window.onerror`, `unhandledrejection`, `uncaughtException`) | Log `fatal`; hard-reload client or exit process.                               | Fail fast, restart clean.       |

---

### 5 User-Facing Error Surfacing

| Channel                         | Mechanism                                                                                                                                                                                                                                                             | Persistence                                                                            |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Component rendering             |  `<ErrorBoundary>` fallback (`role="alert"`, red border).                                                                                                                                                                                                        | Volatile (disappears on rerender).                                                     |
| Background / streaming failures | **Error Intention** injected into current space. Content includes a **JSON content-island**:<br/>`jsonc\n{\n  \"kind\": \"error\",\n  \"payload\": {\n    \"message\": \"LLM tool 'fetchLabResults' failed: 504\",\n    \"time\": \"2025-07-12T22:11:45Z\"\n  }\n}\n` | Durable; stored like any other intention; visible to all participants until dismissed. |

If a server stream is already writing to an Intention, switch its status to `"error"` and append the JSON content-island in-place.

Finally, if no better mechanism is available, the user should still be notified of the errro: an error "Toast" or full screen overlay (depending on the severity of the error) can be used.

---

### 6 Operational Guidelines

| Topic                | Guidance                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| Rotation & retention | Leave to container/cluster log driver; harvest stdout/stderr.                                    |
| Sampling             | If R2 egress grows, raise browser transmit level to `'fatal'` or sample `info` at 1 %.           |
| Alerting             | Aggregator rules on `level >= error`; optionally wire OpenTelemetry IDs for cross-trace linking. |
| Security             | Use Pino `redact` to strip PHI & secrets.                                                        |

---

### 7 Quick Start

```bash
# Server
deno add npm:pino npm:pino-pretty npm:pino-http         # or: npm i …

# Client
npm i pino pino-transmit-http
```

1. `import { logger }` on the server; derive child loggers per module.
2. `import { log }` in the browser root; use `log.<level>()`.
3. Ship code—logging now “just works” with modern, mainstream libraries and 2025 best practices.

[1]: https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/?utm_source=chatgpt.com "A Complete Guide to Pino Logging in Node.js - Better Stack"
[2]: https://github.com/pinojs/pino/issues/632?utm_source=chatgpt.com "Best practices with childs · Issue #632 · pinojs/pino - GitHub"
[5]: https://github.com/pinojs/pino?utm_source=chatgpt.com "pinojs/pino: super fast, all natural json logger - GitHub"
[6]: https://github.com/sventschui/pino-transmit-http?utm_source=chatgpt.com "sventschui/pino-transmit-http - GitHub"
[7]: https://overcast.blog/managing-container-stdout-stderr-logs-like-a-pro-e7d42ab0035e?utm_source=chatgpt.com "Managing Container stdout & stderr Logs Like a Pro | overcast blog"
