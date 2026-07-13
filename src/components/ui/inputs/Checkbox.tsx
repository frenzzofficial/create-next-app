import React from "react";
import { cn } from "@/packages/utils/cn";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="checkbox-field">
        <label htmlFor={inputId} className={cn("checkbox-wrapper", className)}>
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            required={required}
            className="checkbox-input"
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />

          {/* Custom box — driven purely by CSS via the `:checked` sibling
              selector on `.checkbox-input`, see input.css §5. No JS toggle
              needed for the visual state. */}
          <div className="checkbox-box">
            <svg
              viewBox="0 0 24 24"
              className="checkbox-check"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {label && (
            <span className="checkbox-label">
              {label}
              {required && (
                <span className="input-required" aria-hidden="true">
                  *
                </span>
              )}
            </span>
          )}
        </label>

        {error && (
          <span id={errorId} role="alert" className="checkbox-error-text">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
