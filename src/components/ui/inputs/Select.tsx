import React from "react";
import { cn } from "@/packages/utils/cn";

type SelectOption = { label: string; value: string };

/**
 * No longer generic over the form's field values — it only ever renders a
 * native `<select>`, so the standard element props are enough.
 * `InputFactory` is the one layer that knows about react-hook-form and
 * keeps type-safety at the field-name level.
 */
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: SelectOption[];
  error?: string;
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, id, required, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    const errorId = `${selectId}-error`;

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={selectId} className="input-label">
            {label}
            {required && (
              <span className="input-required" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          required={required}
          className={cn("input select-input", error && "input-error", className)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && (
          <span id={errorId} role="alert" className="input-error-text">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
