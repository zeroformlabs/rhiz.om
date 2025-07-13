// logger.ts
import pino from "pino";
import process from "node:process";

export const logger = pino({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  transport: {
    target: "pino-pretty",
    options: { colorize: true, translateTime: "SYS:standard" }
  },
  redact: ["req.headers.authorization", "password"]
});