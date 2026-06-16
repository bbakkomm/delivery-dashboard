import { cn } from "@/lib/cn";
import type { MetricCardProps } from "@/types/ui";

export function MetricCard({
  accentClassName = "bg-teal",
  className,
  label,
  unit,
  value,
  ...props
}: MetricCardProps) {
  return (
    <div className={cn("metric-card", className)} {...props}>
      <div className="metric-label text-xs font-extrabold uppercase text-muted">
        {label}
      </div>
      <div className="metric-value-row mt-3 flex items-end gap-2">
        <strong className="metric-value text-3xl leading-none text-text">{value}</strong>
        {unit ? (
          <span className="metric-unit pb-1 text-xs font-bold text-muted">{unit}</span>
        ) : null}
      </div>
      <div className={cn("metric-accent mt-4 h-1 w-11 rounded-full", accentClassName)} />
    </div>
  );
}
