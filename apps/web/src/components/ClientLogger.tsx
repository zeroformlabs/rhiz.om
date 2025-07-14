"use client";

import { useEffect } from 'react';

export default function ClientLogger() {
  useEffect(() => {
    const originalConsoleInfo = console.info;
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    // Handles circular references and other complex objects for safe serialization.
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key: string, value: any) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[Circular]";
          }
          seen.add(value);
        }
        return value;
      };
    };

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
        }, getCircularReplacer()), // FIX: Use the circular reference replacer
      }).catch(err => originalConsoleError('Failed to send log to server:', err)); // FIX: Use the original console.error to avoid recursion
    };

    // Override console methods to also send to server
    console.info = (message?: any, ...optionalParams: any[]) => {
      originalConsoleInfo(message, ...optionalParams);
      sendLogToServer('info', message, optionalParams);
    };

    console.warn = (message?: any, ...optionalParams: any[]) => {
      originalConsoleWarn(message, ...optionalParams);
      sendLogToServer('warn', message, optionalParams);
    };

    console.error = (message?: any, ...optionalParams: any[]) => {
      originalConsoleError(message, ...optionalParams);
      sendLogToServer('error', message, optionalParams);
    };

    console.info("rhiz.om client started");

    // Clean up overrides on component unmount
    return () => {
      console.info = originalConsoleInfo;
      console.warn = originalConsoleWarn;
      console.error = originalConsoleError;
    };
  }, []);

  return null;
}