"use client";

import { useEffect } from 'react';
import { createLogger, format, transports } from 'winston';
import Transport from 'winston-transport';

// Custom Winston Transport to send logs to the server
class ServerTransport extends Transport {
  constructor(opts?: Transport.TransportStreamOptions) {
    super(opts);
  }

  log(info: any, callback: () => void) {
    // Send log to server
    fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ts: Date.now(),
        level: info.level,
        msg: info.message,
        browser: true,
        context: info.meta,
      }),
    }).catch(err => console.error('Failed to send log to server:', err));

    callback();
  }
}

const clientLogger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.json(), // Use JSON format for sending to server
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }),
    new ServerTransport({ level: 'info' }) // Send info, warn, error to server
  ],
});

export default function ClientLogger() {
  useEffect(() => {
    clientLogger.info("rhiz.om client started");
  }, []);

  return null;
}
