import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ButtonProps, ButtonVariant } from "@/types/ui";

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

export function Button({
  children,
  className,
  disabled,
  icon,
  isLoading = false,
  type = "button",
  variant = "outline",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn("btn", variantClass[variant], className)}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? (
        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
