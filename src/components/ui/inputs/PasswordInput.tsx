"use client";
import React, { useState } from "react";
import EyeClose from "@/components/ui/svg/EyeClose";
import EyeOpen from "@/components/ui/svg/EyeOpen";
import { cn } from "@/packages/utils/cn";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className, id, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    const [show, setShow] = useState(false);

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

        <div className="input-field">
          <input
            ref={ref}
            id={inputId}
            type={show ? "text" : "password"}
            required={required}
            className={cn("input with-icon-right", error && "input-error", className)}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />

          <button
            type="button"
            className="input-icon-btn"
            onClick={() => setShow((prev) => !prev)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
          >
            {show ? <EyeOpen /> : <EyeClose />}
          </button>
        </div>

        {error && (
          <span id={errorId} role="alert" className="input-error-text">
            {error}
          </span>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
