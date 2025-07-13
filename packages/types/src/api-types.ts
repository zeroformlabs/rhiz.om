import { z } from "zod";

// Zod schema for the JWT Payload.
// A JWT payload can have various claims, so a record is a flexible way to represent it.
const jwtPayloadSchema = z.record(z.string(), z.unknown());

// Zod schema for the API response.
export const apiMeResponseSchema = z.object({
  message: z.string(),
  user_id: z.string(),
  payload: jwtPayloadSchema,
});

// The TypeScript interface is now inferred directly from the Zod schema.
// This ensures the type and the runtime validation are always in sync. [1, 4]
export type ApiMeResponse = z.infer<typeof apiMeResponseSchema>;

/**
 * Parses and validates a JSON structure against the ApiMeResponse schema.
 *
 * @param data - The unknown data to parse. Can be a JSON string or an object.
 * @returns The validated and typed ApiMeResponse object.
 * @throws {ZodError} If the data is invalid.
 */
export function parseApiMeResponse(data: any): ApiMeResponse {
  // If the input is a string, attempt to parse it as JSON first. [3]
  const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

  // The .parse() method will throw an error if validation fails. [1]
  return apiMeResponseSchema.parse(parsedData);
}

