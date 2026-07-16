"use client";
import { useTransition } from "react";
import AuthForm from "@/components/features/auth/AuthForm";

const ForgetPasswordForm = () => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const submit = (data: unknown): void => {
    console.log("Forget-Password form submitted data:", data); // 👈 log the data
    // use async handler to send request to backend
    startTransition(async () => {});
  };

  return <AuthForm formKey="FORGOT_PASSWORD" onSubmit={submit} isLoading={pending || false} />;
};

export default ForgetPasswordForm;
