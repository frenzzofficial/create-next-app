import { z } from "zod";
import { UserRolesValues, userStatusValues } from "../configs/role.config";
import { emailRules, fullnameRules, passwordRules } from "../configs/schema.config";

/**
 * Default/demo user environment schema.
 *
 * These are placeholder values for a demo/seed user — used to hydrate UI
 * previews (avatar cards, showcase pages, placeholder form values) without
 * needing a real authenticated session behind them. All NEXT_PUBLIC_*
 * since none of this is sensitive, it's just sample data.
 */
const userEnvSchema = z.object({
  NEXT_PUBLIC_DEFAULT_USER_ID: z.string().default("default-user-1"),
  NEXT_PUBLIC_DEFAULT_USER_FULLNAME: fullnameRules.default("John Doe"),
  NEXT_PUBLIC_DEFAULT_USER_EMAIL: emailRules.default("johndoe@gmail.com"),
  NEXT_PUBLIC_DEFAULT_USER_PASSWORD: passwordRules.default("Johndoe#1234"),
  NEXT_PUBLIC_DEFAULT_USER_AVATAR_URL: z
    .url()
    .default("http://localhost:3000/avatars/default-user.png"),
  NEXT_PUBLIC_DEFAULT_USER_ROLE: z.enum(UserRolesValues).default("USER"),
  NEXT_PUBLIC_DEFAULT_USER_STATUS: z.enum(userStatusValues).default("ACTIVE"),
});

/**
 * Build the raw input object with EXPLICIT, literal `process.env.X`
 * references — same reasoning as client.env.ts: Next.js only inlines
 * NEXT_PUBLIC_* vars into the client bundle when it sees a literal access
 * at build time, so every key is listed out rather than spread.
 */
const rawUserEnv = {
  NEXT_PUBLIC_DEFAULT_USER_ID: process.env.NEXT_PUBLIC_DEFAULT_USER_ID,
  NEXT_PUBLIC_DEFAULT_USER_FULLNAME: process.env.NEXT_PUBLIC_DEFAULT_USER_FULLNAME,
  NEXT_PUBLIC_DEFAULT_USER_EMAIL: process.env.NEXT_PUBLIC_DEFAULT_USER_EMAIL,
  NEXT_PUBLIC_DEFAULT_USER_PASSWORD: process.env.NEXT_PUBLIC_DEFAULT_USER_PASSWORD,
  NEXT_PUBLIC_DEFAULT_USER_AVATAR_URL: process.env.NEXT_PUBLIC_DEFAULT_USER_AVATAR_URL,
  NEXT_PUBLIC_DEFAULT_USER_ROLE: process.env.NEXT_PUBLIC_DEFAULT_USER_ROLE,
  NEXT_PUBLIC_DEFAULT_USER_STATUS: process.env.NEXT_PUBLIC_DEFAULT_USER_STATUS,
};

/**
 * Validate user environment variables
 */
const parsedUserEnv = userEnvSchema.safeParse(rawUserEnv);

if (!parsedUserEnv.success) {
  console.error("❌ Invalid user environment variables:");

  parsedUserEnv.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  });

  throw new Error("User environment validation failed");
}

/**
 * Default user config — safe to import anywhere, including 'use client'
 * components, since it's all NEXT_PUBLIC_* placeholder data.
 */
export const envUserConfig = Object.freeze({
  ID: parsedUserEnv.data.NEXT_PUBLIC_DEFAULT_USER_ID,
  FULLNAME: parsedUserEnv.data.NEXT_PUBLIC_DEFAULT_USER_FULLNAME,
  EMAIL: parsedUserEnv.data.NEXT_PUBLIC_DEFAULT_USER_EMAIL,
  PASSWORD: parsedUserEnv.data.NEXT_PUBLIC_DEFAULT_USER_PASSWORD,
  AVATAR_URL: parsedUserEnv.data.NEXT_PUBLIC_DEFAULT_USER_AVATAR_URL,
  ROLE: parsedUserEnv.data.NEXT_PUBLIC_DEFAULT_USER_ROLE,
  STATUS: parsedUserEnv.data.NEXT_PUBLIC_DEFAULT_USER_STATUS,
});

/**
 * Type-safe user environment type
 */
export type EnvUserConfig = typeof envUserConfig;
