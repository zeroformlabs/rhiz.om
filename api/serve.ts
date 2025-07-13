// In api/serve.ts
// import { serve } from "https://deno.land/std@0.140.0/http/server.ts"; // <-- REMOVE
import logger from "./logger.ts";

logger.info("rhiz.om server started");

// The new, recommended way to start a Deno server:
Deno.serve((_req) => {
  return new Response("Hello, world!\n");
});