import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { DELIVERY_FILTERS } from "../constants";
import type { DeliveryFilterStatus } from "../types";

type StatusFilterProps = {
  activeStatus: DeliveryFilterStatus;
  onReset: () => void;
  onStatusChange: (status: DeliveryFilterStatus) => void;
  showReset: boolean;
};

const filterColorClass: Record<
  DeliveryFilterStatus,
  {
    active: string;
    inactive: string;
  }
> = {
  all: {
    active: "border-teal bg-teal text-white",
    inactive: "border-teal bg-[var(--transit-soft)] text-teal-dark",
  },
  ready: {
    active: "border-ready bg-ready text-white",
    inactive: "border-ready bg-[var(--ready-soft)] text-ready",
  },
  transit: {
    active: "border-transit bg-transit text-white",
    inactive: "border-transit bg-[var(--transit-soft)] text-transit",
  },
  done: {
    active: "border-done bg-done text-white",
    inactive: "border-done bg-[var(--done-soft)] text-done",
  },
  delay: {
    active: "border-delay bg-delay text-white",
    inactive: "border-delay bg-[var(--delay-soft)] text-delay",
  },
  return: {
    active: "border-return bg-return text-white",
    inactive: "border-return bg-[var(--return-soft)] text-return",
  },
};

export function StatusFilter({
  activeStatus,
  onReset,
  onStatusChange,
  showReset,
}: StatusFilterProps) {
  return (
    <div className="rounded-[8px] border border-line bg-surface p-[10px] text-text">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-xs font-black">Filter By Status:</span>
        {DELIVERY_FILTERS.map((filter) => {
          const isActive = activeStatus === filter.value;
          const colorClass = filterColorClass[filter.value];

          return (
            <button
              className={cn(
                "min-h-[30px] rounded-[6px] border px-3 text-xs font-black transition",
                isActive ? colorClass.active : colorClass.inactive,
              )}
              key={filter.value}
              onClick={() => onStatusChange(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          );
        })}
        {showReset ? (
          <Button
            className="min-h-[30px] rounded-[6px] border-line-strong bg-surface-soft px-3 text-xs text-teal-dark hover:bg-surface-muted"
            icon={<RotateCcw aria-hidden="true" className="size-3.5" />}
            onClick={onReset}
            variant="outline"
          >
            Reset
          </Button>
        ) : null}
      </div>
    </div>
  );
}
