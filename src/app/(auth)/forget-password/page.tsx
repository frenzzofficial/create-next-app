import { Link } from "@/components/ui";
import ForgetPasswordForm from "./ForgetPasswordForm";

const ForgetPasswordPage = () => {
  return (
    <div
      className="w-full flex min-h-screen flex-col items-center gap-2 pt-12 pb-12 sm:pt-16 md:pt-20"
      style={{
        marginTop: "100px",
      }}
    >
      <Link
        href="/"
        className="text-primary decoration-solid underline-offset-4 transition hover:underline"
      >
        Return to Homepage
      </Link>

      <div className="w-9/10 md:w-3/5 max-w-md">
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
