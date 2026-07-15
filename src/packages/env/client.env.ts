import { z } from "zod";

/**
 * Client-safe environment schema.
 *
 * Only NEXT_PUBLIC_* variables belong here — nothing in this file can ever
 * be a secret. `app.env.ts` merges this in for server-side code, and this
 * module is also safe to import directly from 'use client' components
 * when only public config (site name, API path, etc.) is needed.
 */
const clientEnvSchema = z.object({
  // App identity
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("create-next-app"),
  NEXT_PUBLIC_APP_VERSION: z.string().default("1.0.0"),
  NEXT_PUBLIC_API_PATH: z.string().default("/api"),

  // Site identity & SEO
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1).default("create-next-app"),
  NEXT_PUBLIC_SITE_TITLE: z.string().min(1).default("top 1% Frontend Template of 2026"),
  NEXT_PUBLIC_LOGO_URL: z.url().default("/logo.png"),
  NEXT_PUBLIC_OG_IMAGE_URL: z.url().default("http://localhost:3000/og-image.png"),
  NEXT_PUBLIC_SITE_DESCRIPTION: z
    .string()
    .min(1)
    .default("Future-ready 2026 frontend template for creating robust, enterprise-level web apps."),

  // backend client API — NEXT_PUBLIC_ prefix required, see note below
  NEXT_PUBLIC_CLIENT_ORIGIN: z.url().trim().default("http://localhost:7164"),
  NEXT_PUBLIC_CLIENT_API_ORIGIN: z.url().trim().default("http://localhost:7164/app"),
});

/**
 * Explicit, literal `process.env.NEXT_PUBLIC_X` references — required so
 * Next.js can statically inline these into the client bundle at build
 * time. Do not swap this for spreading `process.env` directly — see the
 * note in app.env.ts for the full reasoning.
 */
const rawClientEnv = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  NEXT_PUBLIC_API_PATH: process.env.NEXT_PUBLIC_API_PATH,

  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SITE_TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_LOGO_URL: process.env.NEXT_PUBLIC_LOGO_URL,
  NEXT_PUBLIC_OG_IMAGE_URL: process.env.NEXT_PUBLIC_OG_IMAGE_URL,
  NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,

  NEXT_PUBLIC_CLIENT_ORIGIN: process.env.NEXT_PUBLIC_CLIENT_ORIGIN,
  NEXT_PUBLIC_CLIENT_API_ORIGIN: process.env.NEXT_PUBLIC_CLIENT_API_ORIGIN,
};

/**
 * Validate client environment variables
 */
const parsedClientEnv = clientEnvSchema.safeParse(rawClientEnv);

if (!parsedClientEnv.success) {
  console.error("❌ Invalid client environment variables:");

  parsedClientEnv.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  });

  throw new Error("Client environment validation failed");
}

/**
 * Client-safe, immutable config. Every field here is already destined for
 * the browser bundle, so it's fine to import this from server code OR
 * 'use client' components — there's nothing to leak.
 */
export const envClientConfig = Object.freeze({
  APP_NAME: parsedClientEnv.data.NEXT_PUBLIC_APP_NAME,
  APP_VERSION: parsedClientEnv.data.NEXT_PUBLIC_APP_VERSION,
  API_PATH: parsedClientEnv.data.NEXT_PUBLIC_API_PATH,

  SITE_URL: parsedClientEnv.data.NEXT_PUBLIC_SITE_URL,
  SITE_NAME: parsedClientEnv.data.NEXT_PUBLIC_SITE_NAME,
  SITE_TITLE: parsedClientEnv.data.NEXT_PUBLIC_SITE_TITLE,
  LOGO_URL: parsedClientEnv.data.NEXT_PUBLIC_LOGO_URL,
  OG_IMAGE_URL: parsedClientEnv.data.NEXT_PUBLIC_OG_IMAGE_URL,
  SITE_DESCRIPTION: parsedClientEnv.data.NEXT_PUBLIC_SITE_DESCRIPTION,

  CLIENT_ORIGIN: parsedClientEnv.data.NEXT_PUBLIC_CLIENT_ORIGIN,
  CLIENT_API_ORIGIN: parsedClientEnv.data.NEXT_PUBLIC_CLIENT_API_ORIGIN,
});

/**
 * Type-safe client environment type
 */
export type EnvClientConfig = typeof envClientConfig;
