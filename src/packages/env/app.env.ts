import "server-only";
import { z } from "zod";
import { envClientConfig } from "./client.env";

/**
 * Server-only environment schema.
 *
 * Nothing here is prefixed NEXT_PUBLIC_ — these values must never reach
 * the browser. The `server-only` import above makes the build fail loudly
 * if this module is ever pulled into a client bundle (e.g. accidentally
 * imported from a 'use client' file), instead of silently leaking later.
 */
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
});

/**
 * Build the raw input object with EXPLICIT, literal `process.env.X`
 * references — do not swap this for spreading `process.env` directly.
 *
 * Next.js only statically inlines `NEXT_PUBLIC_*` vars into the client
 * bundle when it can see a literal `process.env.NEXT_PUBLIC_X` access at
 * build time. That's not a concern for this file (nothing here is
 * NEXT_PUBLIC_), but keeping every env access explicit and literal —
 * rather than spreading `process.env` — is what makes it safe to lint for
 * "no raw process.env outside the env singleton" across the codebase.
 */
const rawServerEnv = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};

/**
 * Validate server environment variables
 */
const parsedServerEnv = serverEnvSchema.safeParse(rawServerEnv);

if (!parsedServerEnv.success) {
  console.error("❌ Invalid server environment variables:");

  parsedServerEnv.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  });

  throw new Error("Server environment validation failed");
}

/**
 * Full app config — server-only fields merged with the client-safe
 * config. Import this from server code (route handlers, server
 * components, services) whenever the complete picture is needed. Client
 * components should import `envClientConfig` from `client.env.ts`
 * directly instead, so they can never accidentally pull in a server-only
 * field through this module.
 */
export const envAppConfig = Object.freeze({
  ...envClientConfig,
  NODE_ENV: parsedServerEnv.data.NODE_ENV,
  PORT: parsedServerEnv.data.PORT,
});

/**
 * Type-safe environment type
 */
export type EnvAppConfig = typeof envAppConfig;
