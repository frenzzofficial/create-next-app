import type { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import type { InputFactoryType } from "@/types/app";
import Checkbox from "./Checkbox";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import Select from "./Select";

/**
 * Field definition consumed by `InputFactory`, generic over the form's own
 * `TFieldValues`. `id` is typed as `Path<TFieldValues>` (not a bare
 * `string`), so a typo'd field name — `"emial"` instead of `"email"` — is a
 * compile error instead of a silent runtime bug.
 */
export type BaseInputProps<TFieldValues extends FieldValues = FieldValues> = {
  id: Path<TFieldValues>;
  type: InputFactoryType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<TFieldValues>;
  options?: { label: string; value: string }[];
  /** Pass `formState.errors[field.id]` straight through — we read `.message` ourselves. */
  error?: FieldError;
};

export type InputFactoryProps<TFieldValues extends FieldValues> = {
  field: BaseInputProps<TFieldValues>;
};

/**
 * Renders the right presentational input for a given field definition and
 * wires it into react-hook-form via `register()`.
 *
 *   {SignInFields.map((field) => (
 *     <InputFactory key={field.id} field={field} />
 *   ))}
 *
 * Every underlying element (input / select / checkbox) is a native HTML
 * form control, so `register()` alone is enough to bind it — there's no
 * `control` / `Controller` here. If a future field type needs a non-native
 * widget (a combobox, date-picker, tag input, etc.), that's the point to
 * introduce `Controller` for that one case, rather than threading `control`
 * through every field up front for something only one of them would use.
 */
const InputFactory = <TFieldValues extends FieldValues>({
  field,
}: InputFactoryProps<TFieldValues>) => {
  const { id, type, label, placeholder, required, register, options, error } = field;

  // register(id) returns { name, onChange, onBlur, ref } — spread straight
  // onto the native element below, no manual state wiring needed.
  const registration = register(id);
  const errorMessage = error?.message;

  switch (type) {
    case "text":
    case "email":
      return (
        <Input
          id={id}
          type={type}
          label={label}
          placeholder={placeholder}
          required={required}
          error={errorMessage}
          {...registration}
        />
      );

    case "password":
      return (
        <PasswordInput
          id={id}
          label={label}
          placeholder={placeholder}
          required={required}
          error={errorMessage}
          {...registration}
        />
      );

    case "checkbox":
      return (
        <Checkbox
          id={id}
          label={label}
          required={required}
          error={errorMessage}
          {...registration}
        />
      );

    case "select":
      return (
        <Select
          id={id}
          label={label}
          options={options ?? []}
          required={required}
          error={errorMessage}
          {...registration}
        />
      );

    default: {
      // Exhaustiveness check — add a new InputFieldType without a matching
      // `case` above, and this line fails to compile.
      const _exhaustive: never = type;
      if (process.env.NODE_ENV !== "production") {
        console.warn(`InputFactory: no renderer registered for input type "${_exhaustive}"`);
      }
      return null;
    }
  }
};

InputFactory.displayName = "InputFactory";

export default InputFactory;
