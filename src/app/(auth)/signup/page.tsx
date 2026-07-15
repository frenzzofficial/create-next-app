import { Link } from "@/components/ui";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <div className="w-full flex min-h-screen flex-col items-center justify-center gap-2 py-2">
      <Link
        href="/"
        className="text-primary decoration-solid underline-offset-4 transition hover:underline"
      >
        Return to Homepage
      </Link>

      <div className="w-3/5 max-w-xl">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
