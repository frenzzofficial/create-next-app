import React from "react";
import { cn } from "@/packages/utils/cn";

/**
 * Extends the native `<input>` attributes so whatever react-hook-form's
 * `register()` returns (`name`, `onChange`, `onBlur`, `ref`) can be spread
 * straight onto this component — no extra glue code needed.
 */
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  /** Pass `formState.errors.<field>?.message` here. */
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, required, ...props }, ref) => {
    const generatedId = React.useId(); // ✅ always called
    const inputId = id ?? generatedId; // ✅ safe fallback
    const errorId = `${inputId}-error`;

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
            {required && (
              <span className="input-required" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          required={required}
          className={cn("input", error && "input-error", className)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />

        {error && (
          <span id={errorId} role="alert" className="input-error-text">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
