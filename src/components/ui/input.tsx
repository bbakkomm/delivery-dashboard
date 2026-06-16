import { cn } from "@/lib/cn";
import type { InputProps } from "@/types/ui";

export function Input({ className, invalid = false, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn("input", invalid && "border-danger", className)}
      {...props}
    />
  );
}
