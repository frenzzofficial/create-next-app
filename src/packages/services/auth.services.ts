import axios from "axios";
import { envClientConfig } from "@/packages/env/client.env";
import type {
  ForgotPasswordInput,
  ResetPasswordInput,
  SignInInput,
  SignUpInput,
} from "@/packages/schemas/auth.schema";
import { userSchema } from "@/packages/schemas/user.schema";
import type { AuthSession } from "@/types/auth";

/**
 * auth.services.ts
 * --------------------------------------------------------------
 * Auth network calls. Components never call axios directly — they call
 * these methods, wrapped in `asyncHandler` (packages/utils/asyncHandler.ts)
 * at the call site so a raw AxiosError never reaches a component:
 *
 *   const [error, session] = await asyncHandler(authService.signIn(values));
 *
 * NOTE — scoped ahead of Stage 10: this file uses its own local Axios
 * instance rather than the shared `apiClient` Stage 10 formalizes (single
 * instance, request/response interceptors, token attachment in Stage 11).
 * `toAppError` (packages/utils/errors.ts) still normalizes whatever this
 * instance rejects with, so `asyncHandler` at the call site behaves
 * identically either way — swap this instance for `apiClient` once Stage
 * 10 lands, no call-site changes needed.
 */
const authApi = axios.create({
  baseURL: envClientConfig.CLIENT_API_ORIGIN,
  withCredentials: true,
});

const authSessionSchema = userSchema.transform((user) => ({ user }));

export const authService = {
  signin: async (input: SignInInput): Promise<AuthSession> => {
    const { data } = await authApi.post("/auth/signin", input);
    return authSessionSchema.parse(data);
  },

  signup: async (input: SignUpInput): Promise<AuthSession> => {
    const { data } = await authApi.post("/auth/signup", input);
    return authSessionSchema.parse(data);
  },

  signout: async (): Promise<void> => {
    await authApi.post("/auth/signout");
  },

  refreshSession: async (): Promise<AuthSession> => {
    const { data } = await authApi.post("/auth/refresh");
    return authSessionSchema.parse(data);
  },

  forgotPassword: async (input: ForgotPasswordInput): Promise<void> => {
    await authApi.post("/auth/forgot-password", input);
  },

  resetPassword: async (input: ResetPasswordInput): Promise<void> => {
    await authApi.post("/auth/reset-password", input);
  },
};
