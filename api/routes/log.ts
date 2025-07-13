import { logger as rootLogger } from "../logger.ts";

const DEBUG_LOGGING = false;

const logApiLogger = rootLogger.child({ name: "/api/log" });
const browserLogger = rootLogger.child({ name: "browser" });

export async function handleLogRequest(request: Request): Promise<Response> {
  try {
    const logEvent = await request.json();

    if (DEBUG_LOGGING)
      logApiLogger.info({ logEvent }, "received log event");
    
    (browserLogger as any)[logEvent?.level?.label || "info"](
      logEvent?.bindings || {},
      new String(logEvent?.messages[0]) || "No message",
    );

    return new Response(null, { status: 204 });
  } catch (error) {
    logApiLogger.error({ error, msg: "Failed to parse log event" });
    return new Response("Bad Request", { status: 400 });
  }
}
