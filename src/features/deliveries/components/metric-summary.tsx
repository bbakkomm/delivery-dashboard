import { memo } from "react";
import { MetricCard } from "@/components/ui";

type MetricSummaryProps = {
  counts: {
    delayed: number;
    returned: number;
    total: number;
    transit: number;
  };
};

// 메트릭 카드는 집계 로드 후 정적이므로 검색/필터/카드 선택 렌더를 건너뜁니다.
export const MetricSummary = memo(function MetricSummary({ counts }: MetricSummaryProps) {
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
});
