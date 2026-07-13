import { envAppConfig } from "@/packages/env/app.env";

/**
 * config.app.ts
 * --------------------------------------------------------------
 * Non-secret, non-environment app constants: things that are the
 * same in dev/staging/prod and don't belong in `.env` files.
 *
 * Anything that DOES vary per environment belongs in `env.app.ts`
 * instead — this file is allowed to import from there, never the
 * other way around.
 */

export const appConfig = Object.freeze({
  name: envAppConfig.APP_NAME,
  version: envAppConfig.APP_VERSION,

  /** Default locale used for `next/font`, `<html lang>`, and metadata. */
  locale: "en",

  /** Default pagination size for list views (tables, feeds, etc). */
  defaultPageSize: 20,

  /** Site identity & SEO — sourced from env.app.ts, used by meta.app.ts. */
  site: {
    url: envAppConfig.SITE_URL,
    name: envAppConfig.SITE_NAME,
    title: envAppConfig.SITE_TITLE,
    description: envAppConfig.SITE_DESCRIPTION,
    logoUrl: envAppConfig.LOGO_URL,
    ogImageUrl: envAppConfig.OG_IMAGE_URL,
  },

  /** Routes every project in this template ends up needing. */
  routes: {
    home: "/",
    api: "/api",
    signin: "/signin",
    signup: "/signup",
    signout: "/signout",
    forgotPassword: "/forgot-password",
    dashboard: "/dashboard",
  },

  keywords: ["bun", "typescript", "next.js", "react.js", "frontend"],
});

export type AppConfig = typeof appConfig;

// allowed email domains // avoid including for saas based apps
export const ALLOWED_MAIL_DOMAINS = ["gmail.com", "hotmail.com", "outlook.com"];
