import { memo, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui";
import { DELIVERY_STATUS_CONFIG } from "../constants";
import type { DeliveryOrder } from "../types";
import { DeliveryStatusBadge } from "./delivery-status-badge";
import { DeliveryTimeline } from "./delivery-timeline";

type DeliveryCardProps = {
  order: DeliveryOrder;
  onSelect: (id: string) => void;
  searchQuery?: string;
  selected?: boolean;
};

// 메모된 카드는 주문, 선택 상태, 검색 하이라이트 입력이 바뀔 때만 부모 렌더에 반응합니다.
export const DeliveryCard = memo(function DeliveryCard({ order, onSelect, searchQuery = "", selected = false }: DeliveryCardProps) {
  const statusConfig = DELIVERY_STATUS_CONFIG[order.status];
  const handleSelect = useCallback(() => {
    onSelect(order.id);
  }, [onSelect, order.id]);

  return (
    <article
      aria-label={`${order.waybill} detail`}
      aria-pressed={selected}
      className={cn("delivery-card interactive-ring flex min-h-[220px] flex-col p-[15px]", order.status === "delay" && "bg-[var(--delay-soft)]/55", statusConfig.cardClassName)}
      data-selected={selected}
      data-status={order.status}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        event.preventDefault();
        handleSelect();
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-1 flex-col text-left">
        <div className="relative z-[1] flex items-start justify-between gap-3">
          <DeliveryStatusBadge status={order.status} />
          <div className="text-right">
            <div className="text-xs font-extrabold text-muted">Waybill</div>
            <div className="mt-1 text-sm font-black text-text">
              <HighlightedText query={searchQuery} text={order.waybill} />
            </div>
          </div>
        </div>

        <div className="relative z-[1] mt-3 grid grid-cols-[minmax(0,1fr)_34px_minmax(0,1fr)] items-center gap-3 border-y border-line py-3">
          <Field label="Origin" query={searchQuery} title={order.origin} value={order.origin} />
          <span className="route-arrow" />
          <Field label={order.status === "return" ? "Return To" : "Destination"} query={searchQuery} title={order.destination} value={order.destination} />
        </div>

        <div className="relative z-[1] mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
          <Field label="Consignee" query={searchQuery} title={order.consignee} value={order.consignee} />
          <Field label={order.etaLabel} query={searchQuery} value={order.eta} />
          <Field label="Client" query={searchQuery} title={order.client} value={order.client} />
          <Field label={order.handlerLabel} query={searchQuery} title={order.handler} value={order.handler} />
        </div>

        <DeliveryTimeline order={order} />
      </div>

      <div className="relative z-[1] mt-3 flex items-center justify-between gap-3">
        <span className="text-[11px] font-extrabold text-muted">{order.updatedAt}</span>
        <Button className={cn("detail-button min-h-[30px] rounded-[6px] px-3 text-xs", selected && "is-selected border-teal bg-teal text-white hover:bg-teal")} variant="outline">
          Detail
        </Button>
      </div>
    </article>
  );
});

function Field({ label, query, title, value }: { label: string; query: string; title?: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-extrabold text-muted">{label}</div>
      <div className="mt-1 text-truncate text-[13px] font-black text-text" title={title ?? value}>
        <HighlightedText query={query} text={value} />
      </div>
    </div>
  );
}

function HighlightedText({ query, text }: { query: string; text: string }) {
  // 하이라이트 분리는 보이는 필드마다 실행되므로 같은 검색어/문자열 조합은 캐시합니다.
  const parts = useMemo(() => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return null;
    }

    const lowerText = text.toLowerCase();
    const lowerQuery = normalizedQuery.toLowerCase();
    const highlightParts: Array<{ highlighted: boolean; value: string }> = [];
    let cursor = 0;
    let matchIndex = lowerText.indexOf(lowerQuery);

    while (matchIndex !== -1) {
      if (matchIndex > cursor) {
        highlightParts.push({
          highlighted: false,
          value: text.slice(cursor, matchIndex),
        });
      }

      const matchEnd = matchIndex + normalizedQuery.length;
      highlightParts.push({
        highlighted: true,
        value: text.slice(matchIndex, matchEnd),
      });
      cursor = matchEnd;
      matchIndex = lowerText.indexOf(lowerQuery, cursor);
    }

    if (!highlightParts.length) {
      return null;
    }

    if (cursor < text.length) {
      highlightParts.push({
        highlighted: false,
        value: text.slice(cursor),
      });
    }

    return highlightParts;
  }, [query, text]);

  if (!parts) {
    return text;
  }

  return (
    <>
      {parts.map((part, index) =>
        part.highlighted ? (
          <mark className="search-highlight" key={`${part.value}-${index}`}>
            {part.value}
          </mark>
        ) : (
          <span key={`${part.value}-${index}`}>{part.value}</span>
        ),
      )}
    </>
  );
}
