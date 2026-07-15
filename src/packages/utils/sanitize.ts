/**
 * sanitize.ts
 * --------------------------------------------------------------
 * Input-cleaning helpers — normalizing/escaping strings before they're
 * stored, rendered, or used to build a URL segment. This is NOT a
 * replacement for a real HTML sanitizer (DOMPurify, `rehype-sanitize`)
 * when you actually need to render untrusted HTML — `stripHtmlTags` and
 * `escapeHtml` below are for plain-text contexts only.
 */

import { FORM_FIELD_LENGTHS } from "../configs/forms.config";

/** Collapse internal whitespace runs to a single space and trim the ends. */
export const normalizeWhitespace = (text: string): string => text.replace(/\s+/g, " ").trim();

/** Remove every HTML tag, leaving plain text. Use before storing user input as plain text. */
export const stripHtmlTags = (text: string): string => text.replace(/<[^>]*>/g, "");

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape the five HTML-significant characters. Safe for dropping user text into an HTML attribute or text node manually (React already does this for you in JSX — this is for the non-JSX cases, e.g. building an email template string). */
export const escapeHtml = (text: string): string =>
  text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);

/** e.g. slugify("Hello, World!") -> "hello-world" — for URL segments, anchor ids, etc. */
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Trim + collapse whitespace + lowercase — the standard normalization before comparing/storing an email. */
export const normalizeEmail = (email: string): string => email.trim().toLowerCase();

/** Digits only — for normalizing phone numbers before validation/storage. */
export const stripNonDigits = (text: string): string => text.replace(/\D/g, "");

export function sanitizeFormData<T extends Record<string, unknown>>(
  data: T,
): Omit<T, "confirmPassword"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword: _confirmPassword, password, ...rest } = data;

  return {
    ...rest,
    password:
      typeof password === "string"
        ? password.trim().slice(0, FORM_FIELD_LENGTHS.password)
        : password,
  } as Omit<T, "confirmPassword">;
}
