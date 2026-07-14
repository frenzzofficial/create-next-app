/**
 * globals.d.ts
 * --------------------------------------------------------------
 * Ambient, project-wide type declarations — things that should be
 * visible everywhere without an explicit import (third-party script
 * globals attached to `window`, non-standard asset module declarations).
 *
 * next-env.d.ts already references `next/image-types/global`, so
 * `.png`/`.jpg`/`.svg` imports are typed out of the box — don't
 * re-declare those here.
 *
 * `export {}` makes this file a module so `declare global` is scoped
 * correctly instead of silently doing nothing.
 */

export {};

declare global {
  /**
   * Extend this as third-party scripts get added (analytics, a chat
   * widget, anything that attaches itself to `window` at runtime) —
   * e.g. `interface Window { dataLayer?: unknown[] }`.
   */
  interface Window {}
}

/**
 * Deliberately NOT declared here: a global `ProcessEnv` augmentation.
 * Every env access goes through packages/env's Zod-validated modules
 * instead (Stage 8) — typing `process.env` globally would make the raw,
 * unvalidated `process.env.X` pattern this project avoids look safe.
 */
