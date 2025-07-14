// browser/logger.ts
import pino, { type Logger, type LogEvent } from "pino";


const DEBUG_LOGGING = false;

export const logger: Logger = pino({
  browser: {
    asObject: true, // keep it JSON
    transmit: {
      level: "info", // threshold you care about
      send(_level: string, logEvent: LogEvent) {
        if (DEBUG_LOGGING) {
          console.log("transmitting log to server", logEvent);
        }

        const blob = new Blob(
          [JSON.stringify(logEvent)],
          { type: "application/json" },
        );

        // 1 kB? Use Beacon (fires even on page-hide/unload)
        if (blob.size < 1024 && navigator.sendBeacon) {
          navigator.sendBeacon("/api/log", blob);
        } else {
          fetch("/api/log", {
            method: "POST",
            body: blob,
            keepalive: true, // survives tab close
          }).catch(() => {/* swallow network noise */});
        }
      },
    },
  },
});
