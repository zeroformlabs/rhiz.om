import { createRemoteJWKSet, jwtVerify } from "jose";
import { Context, Next } from "hono";
import { HTTPException } from "jsr:@hono/hono/http-exception";

const AUTH0_DOMAIN = Deno.env.get("AUTH0_DOMAIN");
const API_AUDIENCE = Deno.env.get("API_AUDIENCE");

if (!AUTH0_DOMAIN || !API_AUDIENCE) {
  throw new Error("Auth0 domain and audience must be set in environment variables.");
}

const JWKS = createRemoteJWKSet(new URL(`https://${AUTH0_DOMAIN}/.well-known/jwks.json`));

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const token = authHeader.substring(7);

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://${AUTH0_DOMAIN}/`,
      audience: API_AUDIENCE,
    });
    c.set('jwtPayload', payload); // Make payload available to subsequent handlers
  } catch (err) {
    console.error("Token validation failed", err);
    throw new HTTPException(401, { message: "Invalid token" });
  }

  await next();
};
