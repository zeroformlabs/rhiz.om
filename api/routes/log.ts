import { logger as rootLogger } from "../logger-server.ts";
import { LogEventSchema } from "../../packages/types/src/log-types.ts";
import { ZodError } from "zod";

const DEBUG_LOGGING = false;

const logApiLogger = rootLogger.child({ name: "/api/log" });
const browserLogger = rootLogger.child({ name: "browser" });

export async function handleLogRequest(request: Request): Promise<Response> {
  try {
    const rawLogEvent = await request.json();

    if (DEBUG_LOGGING) {
      logApiLogger.info({ rawLogEvent }, "received log event");
    }

    const logEvent = LogEventSchema.parse(rawLogEvent);

    (browserLogger as any)[logEvent.level?.label || "info"](
      logEvent.bindings || {},
      new String(logEvent.messages[0]) || "No message",
    );

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof ZodError) {
      logApiLogger.error({
        error: (error as ZodError).issues,
        msg: "Log event validation failed",
      });
      return new Response("Bad Request: Invalid log event data", {
        status: 400,
      });
    } else {
      logApiLogger.error({ error, msg: "Failed to parse log event" });
      return new Response("Bad Request", { status: 400 });
    }
  }
}