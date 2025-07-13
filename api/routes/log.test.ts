import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { handleLogRequest } from "./log.ts";

// Test for happy path
Deno.test("handleLogRequest returns 204 for valid log event", async () => {
  const validLogEvent = {
    ts: Date.now(),
    messages: ["Test message"],
    bindings: [{ key: "value" }],
    level: { label: "info", value: 30 },
  };

  const mockRequest = new Request("http://localhost/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validLogEvent),
  });

  const response = await handleLogRequest(mockRequest);

  assertEquals(response.status, 204);
});

// Test for 400 error (invalid log event)
Deno.test("handleLogRequest returns 400 for invalid log event", async () => {
  const invalidLogEvent = {
    ts: Date.now(),
    messages: ["Test message"],
    // Missing 'level' field to trigger validation error
  };

  const mockRequest = new Request("http://localhost/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(invalidLogEvent),
  });

  const response = await handleLogRequest(mockRequest);

  assertEquals(response.status, 400);
  const responseBody = await response.text();
  assertEquals(responseBody, "Bad Request: Invalid log event data");
});

// Test for 400 error (non-JSON body)
Deno.test("handleLogRequest returns 400 for non-JSON body", async () => {
  const mockRequest = new Request("http://localhost/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "this is not json",
  });

  const response = await handleLogRequest(mockRequest);

  assertEquals(response.status, 400);
  const responseBody = await response.text();
  assertEquals(responseBody, "Bad Request");
});
