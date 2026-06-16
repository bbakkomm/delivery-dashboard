import { cn } from "@/lib/cn";
import { DELIVERY_STATUS_CONFIG } from "../constants";
import type { DeliveryStatus } from "../types";

type DeliveryStatusBadgeProps = {
  className?: string;
  status: DeliveryStatus;
};

export function DeliveryStatusBadge({
  className,
  status,
}: DeliveryStatusBadgeProps) {
  const config = DELIVERY_STATUS_CONFIG[status];

  return (
    <span
      className={cn("status-badge", config.cardClassName, className)}
      data-status={status}
    >
      {config.label}
    </span>
  );
}
