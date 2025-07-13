import { z } from "zod";

export const LogEventSchema = z.object({
  ts: z.number(),
  messages: z.array(z.string()),
  bindings: z.array(z.record(z.any())),
  level: z.object({
    label: z.string(),
    value: z.number(),
  }),
});

/*
Example:
     {
       "ts": 1752424883671,
       "messages": [
         "rhiz.om client started"
       ],
       "bindings": [],
       "level": {
         "label": "info",
         "value": 30
       }
     }
*/

export type LogEvent = z.infer<typeof LogEventSchema>;
