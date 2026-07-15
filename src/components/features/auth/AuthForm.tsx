"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FieldError,
  type FieldErrors,
  type Resolver,
  type SubmitHandler,
  type UseFormRegister,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { Button, InputFactory, Link } from "@/components/ui";
import type { AnimationDirectionType } from "@/packages/configs/animation.config";
import { DEFAULT_FORM_VALUES } from "@/packages/configs/forms.config";
import {
  type AuthSchemaKey,
  authFormConfig,
  authSchemaMap,
  type FormInputType,
  type FormListType,
} from "@/packages/forms/auth.forms";
import { FindAnimationName } from "@/packages/utils/animation";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuthFormProps {
  formKey: AuthSchemaKey;
  onSubmit?: (data: unknown) => void;
  isLoading?: boolean | undefined;
}

interface FormLayoutProps {
  form: FormListType;
  children: React.ReactNode;
  className?: string;
  animationDirection?: AnimationDirectionType;
}

type FormFieldsProps = {
  inputs: FormInputType[];
  register: UseFormRegister<Record<string, unknown>>;
  errors: FieldErrors<Record<string, unknown>>;
  // `control` intentionally dropped — see note below.
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const buildDefaultValues = (formKey: AuthSchemaKey): Record<string, unknown> => {
  const form = authFormConfig[formKey];
  const values: Record<string, unknown> = {};

  form.formInputs.forEach((field) => {
    const preset = DEFAULT_FORM_VALUES[field.id as keyof typeof DEFAULT_FORM_VALUES];
    values[field.id] = preset !== undefined ? preset : field.type === "checkbox" ? false : "";
  });

  return values;
};

// ─── useAuthForm ──────────────────────────────────────────────────────────────
const useAuthForm = (formKey: AuthSchemaKey) => {
  const schema = authSchemaMap[formKey];
  const defaultValues = buildDefaultValues(formKey);
  const resolver = zodResolver(schema as Parameters<typeof zodResolver>[0]) as unknown as Resolver<
    Record<string, unknown>
  >;

  return useForm<Record<string, unknown>>({
    resolver: resolver,
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    shouldUnregister: false,
  });
};

// ─── FormFields ───────────────────────────────────────────────────────────────
const FormFields = ({ inputs, register, errors }: FormFieldsProps) => {
  return (
    <>
      {inputs.map((input) => {
        const rawError = errors[input.id];

        const errorMessage =
          rawError && typeof rawError === "object" && "message" in rawError
            ? String((rawError as FieldError).message ?? "")
            : "";

        return (
          <div key={input.key} className="flex flex-col gap-2 p-1">
            <InputFactory
              field={{
                ...input,
                register,
                error: errorMessage ? ({ message: errorMessage } as FieldError) : undefined,
              }}
            />
          </div>
        );
      })}
    </>
  );
};

// ─── FormLayout ───────────────────────────────────────────────────────────────
const FormLayout = ({
  form,
  children,
  className,
  animationDirection = "right",
}: FormLayoutProps) => {
  const { referTo } = form;

  const animationName = FindAnimationName(animationDirection);

  return (
    <div
      style={{
        ...FORM_LAYOUT_CSS.container,
        animationName: animationName,
      }}
      className={className}
    >
      <div style={FORM_LAYOUT_CSS.card}>
        <header style={FORM_LAYOUT_CSS.header}>
          {form.description && <p style={FORM_LAYOUT_CSS.description}>{form.description}</p>}
        </header>

        <section style={FORM_LAYOUT_CSS.content}>{children}</section>

        {referTo && (
          <footer style={FORM_LAYOUT_CSS.footer}>
            <p style={FORM_LAYOUT_CSS.footerText}>
              {referTo.label} <Link href={`/${referTo.href}`}>{referTo.href}</Link>
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

// ─── AuthForm ─────────────────────────────────────────────────────────────────
const AuthForm = ({ formKey, onSubmit: externalSubmit, isLoading = false }: AuthFormProps) => {
  const form = authFormConfig[formKey];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useAuthForm(formKey);

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) => {
    if (externalSubmit) {
      console.log(data);

      externalSubmit(data);
    } else {
      console.log(`[${formKey}] submitted:`, data);
      console.log(`[${formKey}] errors:`, errors);

      setTimeout(() => {
        toast.success(`${formKey.toLocaleLowerCase()} submitted`);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormLayout form={form}>
        <FormFields inputs={form.formInputs} register={register} errors={errors} />

        {form.submit && (
          <Button type="submit" disabled={isSubmitting}>
            {isLoading ? form.submit.onSubmitLabel : form.submit.label}
          </Button>
        )}
      </FormLayout>
    </form>
  );
};

export default AuthForm;

// ─── Styling ─────────────────────────────────────────────────────────────────
const FORM_LAYOUT_CSS = {
  container: {
    width: "100%",
    maxWidth: "48rem",
    marginInline: "auto",
    animationDuration: "500ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "both",
  } satisfies React.CSSProperties,

  card: {
    background: "var(--card)",
    color: "var(--card-foreground)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    boxShadow:
      "0 1px 4px color-mix(in oklch, var(--foreground) 4%, transparent), 0 8px 24px color-mix(in oklch, var(--foreground) 6%, transparent)",
  } satisfies React.CSSProperties,

  header: {
    padding: "1.25rem 1.25rem",
    borderBottom: "1px solid hsl(var(--border))",
  } satisfies React.CSSProperties,

  description: {
    marginTop: "0.375rem",
    fontSize: "1rem",
    color: "hsl(var(--muted-foreground))",
    // lineHeight: 1.5,
  } satisfies React.CSSProperties,

  content: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",

    padding: "1.5rem",
  } satisfies React.CSSProperties,

  footer: {
    padding: "1rem 1.5rem",
    borderTop: "1px solid hsl(var(--border))",
  } satisfies React.CSSProperties,

  footerText: {
    margin: 0,
    textAlign: "center",
    fontSize: "0.875rem",
    color: "hsl(var(--muted-foreground))",
  } satisfies React.CSSProperties,
};
