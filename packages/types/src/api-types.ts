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

export function asApiMeResponse(json: unknown): ApiMeResponse {
  // The .parse() method will throw an error if validation fails. [1]
  return apiMeResponseSchema.parse(json);
}
export function assertApiMeResponse(json: unknown): asserts json is ApiMeResponse {
  // The .parse() method will throw an error if validation fails. [1]
  asApiMeResponse(json);
}

