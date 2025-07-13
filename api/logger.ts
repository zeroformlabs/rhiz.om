// api/logger.ts
import pino from 'pino';
import pretty from 'pino-pretty';

// pino-pretty is the transport. We instantiate it with our options.
const stream = pretty({
  colorize: true,
  levelFirst: true,
  translateTime: 'SYS:standard',
});

// We then pass the instantiated stream directly to pino.
// This avoids the dynamic 'target' resolution that was failing.
const logger = pino(stream);

export default logger;