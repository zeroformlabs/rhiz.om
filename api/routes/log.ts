import { logger } from '../logger.ts'   // your main server logger

export async function handleLogRequest(request: Request): Promise<Response> {
  try {
    const logEvent = await request.json();
    logger.child({ src: 'browser' }).info(logEvent);
    return new Response(null, { status: 204 });
  } catch (error) {
    logger.error({ error, msg: "Failed to parse log event" });
    return new Response("Bad Request", { status: 400 });
  }
}