import type { User } from "@/packages/schemas/user.schema";

/**
 * The shape returned by every auth.services.ts call that establishes or
 * refreshes a session. Kept as a plain ambient type (not a Zod schema)
 * since it's composed from `User`, which is already validated at the
 * service boundary — this just describes the wrapper shape around it.
 */
export type AuthSession = {
  user: User;
};

/**
 * Client-visible auth state — what AuthContext (Stage 11) will expose to
 * the rest of the app. Declared here now so components built ahead of
 * Stage 11 (route guards, a header avatar menu) can type against the
 * eventual shape without importing from a context that doesn't exist yet.
 */
export type AuthStatus = "authenticated" | "unauthenticated" | "loading";

export type AuthState = {
  status: AuthStatus;
  user: User | null;
};
