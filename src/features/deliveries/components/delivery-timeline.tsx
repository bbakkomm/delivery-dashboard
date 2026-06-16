import { DELAY_STEPS, DELIVERY_STEPS, RETURN_STEPS } from "../constants";
import type { DeliveryOrder, DeliveryStage } from "../types";

type DeliveryTimelineProps = {
  order: DeliveryOrder;
};

export function DeliveryTimeline({ order }: DeliveryTimelineProps) {
  const steps = getSteps(order.status);

  return (
    <div className="mt-3">
      <div className="timeline">
        {steps.map((step) => (
          <span
            aria-label={step.label}
            className="timeline-dot"
            data-active={order.currentStage === step.value}
            data-complete={order.completedStages.includes(step.value)}
            key={step.value}
            title={step.label}
          />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-5 gap-0 text-center text-[10px] font-bold text-muted">
        {steps.map((step) => (
          <span className="truncate" key={step.value}>
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function getSteps(status: DeliveryOrder["status"]): Array<{
  label: string;
  value: DeliveryStage;
}> {
  if (status === "return") {
    return RETURN_STEPS;
  }

  if (status === "delay") {
    return DELAY_STEPS;
  }

  return DELIVERY_STEPS;
}
