import { Hono } from "hono";
import { logger as rootLogger } from "./logger-server.ts";
import { handleLogRequest } from "./routes/log.ts";
import { authMiddleware } from "./auth/middleware.ts";
import type { JWTPayload } from "jose";

type AppEnv = {
  Variables: {
    jwtPayload: JWTPayload;
  };
};

const logger = rootLogger.child({ name: "serve" });
const app = new Hono<AppEnv>();


// Public endpoint for client-side logging
app.post("/api/log", async (c) => {
  return await handleLogRequest(c.req.raw);
});

// Protected route group
const api = app.basePath("/api");
api.use("/*", authMiddleware);

api.get("/me", (c) => {
  const payload = c.get("jwtPayload");
  return c.json({
    message: "This is a protected endpoint!",
    user_id: payload.sub,
    payload,
  });
});

// Default handler
app.get("*", (c) => c.text("Hello, world!\n"));

logger.info("rhiz.om server started");
Deno.serve(app.fetch);