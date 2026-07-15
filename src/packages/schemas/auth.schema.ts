import { z } from "zod";
import {
  confirmPasswordRules,
  emailRules,
  fullnameRules,
  otpRules,
  passwordRules,
  schemaMessages,
  termsAcceptedRules,
} from "@/packages/configs/schema.config";

/**
 * auth.schema.ts
 * --------------------------------------------------------------
 * Zod schemas for every auth form. Every field rule (email format,
 * password strength, etc.) is composed from packages/configs/schema.config.ts
 * — this file only assembles those rules into the shape each form needs
 * and adds cross-field checks (password confirmation matching).
 *
 * These are form-input schemas — use them with react-hook-form's
 * zodResolver. Response/session shapes (the user object a signin call
 * returns) belong in user.schema.ts instead.
 */

export const signInSchema = z.object({
  email: emailRules,
  password: z.string().trim().min(1, schemaMessages.passwordRequired),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    fullname: fullnameRules,
    email: emailRules,
    password: passwordRules,
    confirmPassword: confirmPasswordRules,
    termsAccepted: termsAcceptedRules,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: schemaMessages.passwordMismatch,
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: emailRules,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, schemaMessages.required),
    password: passwordRules,
    confirmPassword: confirmPasswordRules,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: schemaMessages.passwordMismatch,
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const verifyOtpSchema = z.object({
  otp: otpRules,
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
