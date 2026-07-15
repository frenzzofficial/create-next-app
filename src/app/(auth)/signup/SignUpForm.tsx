"use client";
// import { useRouter } from "next/router";
import { useTransition } from "react";
import AuthForm from "@/components/features/auth/AuthForm";
import type { SignUpInput } from "@/packages/schemas/auth.schema";
import { sanitizeFormData } from "@/packages/utils/sanitize";

const SignUpForm = () => {
  // const router = useRouter();
  const [pending, startTransition] = useTransition();
  const isAuthenticating = false;

  const submit = (data: unknown): void => {
    const inputs = sanitizeFormData<SignUpInput>(data as unknown as SignUpInput);
    console.log("SignUpForm submitted data:", inputs); // 👈 log the data
    // use async handler to send request to backend
    startTransition(async () => {});
  };

  return <AuthForm formKey="SIGNUP" onSubmit={submit} isLoading={pending || isAuthenticating} />;
};

export default SignUpForm;
