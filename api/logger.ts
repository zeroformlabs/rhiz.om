// logger.ts
import pino from 'pino';
import process from "node:process";

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