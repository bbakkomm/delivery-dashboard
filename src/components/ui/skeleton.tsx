import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import type { SkeletonProps, SkeletonVariant } from "@/types/ui";

const variantClass: Record<SkeletonVariant, string> = {
  block: "",
  line: "skeleton-line",
  card: "skeleton-card",
  metric: "skeleton-metric",
  detail: "skeleton-detail",
};

export function Skeleton({
  className,
  variant = "block",
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("skeleton", variantClass[variant], className)}
      {...props}
    />
  );
}

export function SkeletonGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={cn("grid gap-3", className)}
      role="status"
      {...props}
    />
  );
}
