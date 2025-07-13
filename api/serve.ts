import { logger } from "./logger.ts";
import { handleLogRequest } from "./routes/log.ts";

logger.info("rhiz.om server started");

Deno.serve((request: Request) => {
  const url = new URL(request.url);

  if (new URLPattern({ pathname: "/api/log" }).test(url)) {
    if (request.method === "POST") {
      return handleLogRequest(request);
    }
  }

  return new Response("Hello, world!\n");
});