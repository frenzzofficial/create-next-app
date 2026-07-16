import { envUserConfig } from "../env/user.env";
import type { User } from "../schemas/user.schema";

// ─── Allowed email domains ───────────────────────────────────────────────
export const ALLOWED_MAIL_DOMAINS = ["gmail.com", "hotmail.com", "outlook.com"];

// ─── Forms Field lengths ───────────────────────────────────────────────
export const FORM_FIELD_LENGTHS = {
  fullname: 32,
  email: 32,
  password: 32,
  confirmPassword: 32,
} as const;

export type FormFieldLengthsType = (typeof FORM_FIELD_LENGTHS)[keyof typeof FORM_FIELD_LENGTHS];

// ─── Dummy User ───────────────────────────────────────────────
export const DEFAULT_USER: User = {
  id: envUserConfig.ID,
  email: envUserConfig.EMAIL,
  fullname: envUserConfig.FULLNAME,
  avatarUrl: envUserConfig.AVATAR_URL,
  isVerified: true,
  status: "ACTIVE",
  role: "USER",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ─── Default Form Values ───────────────────────────────────────────────
// If you don’t have envDefaultUserConfig, replace with envUserConfig defaults
export const DEFAULT_FORM_VALUES = {
  fullname: envUserConfig.FULLNAME,
  email: envUserConfig.EMAIL,
  password: envUserConfig.PASSWORD, // or envUserConfig.DEFAULT_USER_PASSWORD if defined
  confirmPassword: envUserConfig.PASSWORD,
  remember: false,
  termsAccepted: false,
} satisfies Record<string, string | boolean>;

export type FormValuesType = typeof DEFAULT_FORM_VALUES;
