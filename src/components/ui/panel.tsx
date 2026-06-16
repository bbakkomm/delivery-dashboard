import { cn } from "@/lib/cn";
import type { PanelProps } from "@/types/ui";

export function Panel({
  as: Component = "section",
  children,
  className,
  ...props
}: PanelProps) {
  return (
    <Component className={cn("panel", className)} {...props}>
      {children}
    </Component>
  );
}
