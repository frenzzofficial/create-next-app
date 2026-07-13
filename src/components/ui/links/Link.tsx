import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/packages/utils/cn";

type LinkProps = NextLinkProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof NextLinkProps> & {
    label?: ReactNode;
  };

const Link = ({ label, children, className, ...props }: LinkProps) => {
  return (
    <NextLink {...props} className={cn("Link", className)}>
      {label ?? children}
    </NextLink>
  );
};

export default Link;
