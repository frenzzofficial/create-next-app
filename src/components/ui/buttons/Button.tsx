import React from "react";
import { cn } from "@/packages/utils/cn";
import type { Variants } from "@/types/app";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: Variants;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      children,
      className,
      variant = "primary",
      type = "button", // Prevent accidental form submission
      ...props
    },
    ref,
  ) => (
    <button ref={ref} type={type} className={cn(`${variant}-btn`, className)} {...props}>
      {label ?? children}
    </button>
  ),
);

Button.displayName = "Button";

export default Button;
