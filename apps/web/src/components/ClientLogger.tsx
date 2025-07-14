"use client";

import { useEffect } from 'react';

export default function ClientLogger() {
  useEffect(() => {
    console.info("rhiz.om client started");

    // Function to send logs to the server
    const sendLogToServer = (level: string, message: string, meta?: any) => {
      fetch('/api/client-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ts: Date.now(),
          level,
          msg: message,
          browser: true,
          context: meta,
        }),
      }).catch(err => console.error('Failed to send log to server:', err));
    };

    // Override console methods to also send to server
    const originalConsoleInfo = console.info;
    console.info = (message?: any, ...optionalParams: any[]) => {
      originalConsoleInfo(message, ...optionalParams);
      sendLogToServer('info', message, optionalParams);
    };

    const originalConsoleWarn = console.warn;
    console.warn = (message?: any, ...optionalParams: any[]) => {
      originalConsoleWarn(message, ...optionalParams);
      sendLogToServer('warn', message, optionalParams);
    };

    const originalConsoleError = console.error;
    console.error = (message?: any, ...optionalParams: any[]) => {
      originalConsoleError(message, ...optionalParams);
      sendLogToServer('error', message, optionalParams);
    };

    // Clean up overrides on component unmount
    return () => {
      console.info = originalConsoleInfo;
      console.warn = originalConsoleWarn;
      console.error = originalConsoleError;
    };
  }, []);

  return null;
}
