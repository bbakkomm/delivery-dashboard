import { MetricCard } from "@/components/ui";

type MetricSummaryProps = {
  counts: {
    delayed: number;
    returned: number;
    total: number;
    transit: number;
  };
};

export function MetricSummary({ counts }: MetricSummaryProps) {
  return (
    <div className="metric-summary-grid grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        accentClassName="bg-teal"
        label="TOTAL ORDERS"
        unit="cases"
        value={counts.total}
      />
      <MetricCard
        accentClassName="bg-transit"
        label="IN TRANSIT"
        unit="cases"
        value={counts.transit}
      />
      <MetricCard
        accentClassName="bg-delay"
        label="DELAYED"
        unit="need check"
        value={counts.delayed}
      />
      <MetricCard
        accentClassName="bg-return"
        label="RETURNED"
        unit="exceptions"
        value={counts.returned}
      />
    </div>
  );
}
