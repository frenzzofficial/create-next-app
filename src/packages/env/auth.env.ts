import "server-only";
import { z } from "zod";

/**
 * Server-only, highest-sensitivity environment schema — session/JWT
 * signing secrets. Kept separate from app.env.ts (general server config)
 * so the smallest possible file holds the credentials that actually
 * matter for a security review.
 *
 * This module should only ever be imported from the auth service layer
 * (Stage 11) — never from a route handler or component directly. The
 * `server-only` import above makes any accidental client-bundle import
 * fail the build instead of silently leaking a signing key.
 */
const authEnvSchema = z.object({
  /**
   * Minimum length is enforced, not just presence — a 4-character
   * "secret" passes a bare `z.string()` check and fails every security
   * review that follows.
   */
  JWT_SECRET: z.string().min(32),
  SESSION_COOKIE_NAME: z.string().default("session"),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(30),
});

/**
 * Explicit, literal `process.env.X` references — same reasoning as the
 * other env modules: keeps every access literal and greppable, and
 * matches the "no raw process.env outside the env singleton" rule this
 * enables project-wide.
 */
const rawAuthEnv = {
  JWT_SECRET: process.env.JWT_SECRET,
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
  REFRESH_TOKEN_TTL_DAYS: process.env.REFRESH_TOKEN_TTL_DAYS,
};

/**
 * Validate auth environment variables.
 *
 * No `.default()` on JWT_SECRET — a missing signing secret should crash
 * immediately and loudly the first time this module is imported (Stage
 * 11's auth service layer), not fall back to an insecure placeholder.
 */
const parsedAuthEnv = authEnvSchema.safeParse(rawAuthEnv);

if (!parsedAuthEnv.success) {
  console.error("❌ Invalid auth environment variables:");

  parsedAuthEnv.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  });

  throw new Error("Auth environment validation failed");
}

/**
 * Auth secrets config — import ONLY from the auth service layer.
 */
export const envAuthConfig = Object.freeze({
  JWT_SECRET: parsedAuthEnv.data.JWT_SECRET,
  SESSION_COOKIE_NAME: parsedAuthEnv.data.SESSION_COOKIE_NAME,
  REFRESH_TOKEN_TTL_DAYS: parsedAuthEnv.data.REFRESH_TOKEN_TTL_DAYS,
});

/**
 * Type-safe auth environment type
 */
export type EnvAuthConfig = typeof envAuthConfig;
