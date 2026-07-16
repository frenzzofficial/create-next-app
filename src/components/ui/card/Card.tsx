import { cn } from "@/packages/utils/cn";

export interface CardProps {
  children: React.ReactNode;
  variants: "interactive" | "static";
  className?: string;
}
const Card = ({ children, variants, className }: CardProps) => {
  return <div className={cn("card", `card-${variants}`, className)}>{children}</div>;
};

export default Card;
