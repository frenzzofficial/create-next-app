import { z } from "zod";
import { UserRolesValues, userStatusValues } from "@/packages/configs/role.config";
import {
  confirmPasswordRules,
  emailRules,
  fullnameRules,
  passwordRules,
  phoneRules,
  schemaMessages,
} from "@/packages/configs/schema.config";

/**
 * user.schema.ts
 * --------------------------------------------------------------
 * The canonical `User` shape (for parsing API responses through
 * `.parse()` — see Stage 10) plus the input schemas for forms that
 * mutate a user's own data. Auth *action* forms (signin, signup) live
 * in auth.schema.ts instead; this file is about the user resource itself.
 */

/** The shape a user object takes wherever the API returns one — validate every response through this, don't just type-assert it. */
export const userSchema = z.object({
  id: z.uuid(),
  fullname: fullnameRules,
  email: emailRules,
  avatarUrl: z.url().nullable(),
  role: z.enum(UserRolesValues),
  isVerified: z.boolean(),
  status: z.enum(userStatusValues),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof userSchema>;

/** Editable subset — a profile form only ever touches these two fields. */
export const updateProfileSchema = z.object({
  fullname: fullnameRules,
  email: emailRules,
  phone: phoneRules,
  avatarUrl: z.url().nullable().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().trim().min(1, schemaMessages.passwordRequired),
    newPassword: passwordRules,
    confirmPassword: confirmPasswordRules,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: schemaMessages.passwordMismatch,
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from the current password",
    path: ["newPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
