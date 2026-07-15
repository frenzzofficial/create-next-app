"use client";
import { useTransition } from "react";
import AuthForm from "@/components/features/auth/AuthForm";

// import { asyncHandler } from "@/packages/utils/asyncHandler";

const SignInForm = () => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const { signIn, isAuthenticating } = useAuth();
  const [pending, startTransition] = useTransition();
  const isAuthenticating = false;
  const submit = (data: unknown): void => {
    console.log("SignInForm submitted data:", data); // 👈 log the data
    // use async handler to send request to backend
    startTransition(async () => {});
  };

  return <AuthForm formKey="SIGNIN" onSubmit={submit} isLoading={pending || isAuthenticating} />;
};

export default SignInForm;
