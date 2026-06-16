import { memo } from "react";
import { Panel } from "@/components/ui";
import type { DeliveryOrder } from "../types";
import { DeliveryStatusBadge } from "./delivery-status-badge";

type SelectedDetailPanelProps = {
  order?: DeliveryOrder;
};

// 상세 UI는 선택 주문에만 의존하므로 관련 없는 대시보드 상태 렌더를 건너뜁니다.
export const SelectedDetailPanel = memo(function SelectedDetailPanel({ order }: SelectedDetailPanelProps) {
  if (!order) {
    return (
      <aside className="detail-sidebar max-xl:hidden">
        <h2 className="text-lg font-black text-text">Selected Detail</h2>
        <Panel className="mt-3 p-4 shadow-none">
          <div className="text-sm font-black text-text">Delivery Order</div>
          <p className="mt-3 text-sm leading-6 text-muted">
            Select a delivery card to inspect waybill, route, ETA, status, and
            exception notes without leaving the list.
          </p>
        </Panel>
      </aside>
    );
  }

  return (
    <aside className="detail-sidebar max-xl:hidden">
      <h2 className="text-lg font-black text-text">Selected Detail</h2>
      <Panel className="mt-3 p-4 shadow-none">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-black text-text">Delivery Order</div>
          </div>
          <DeliveryStatusBadge status={order.status} />
        </div>
        <dl className="mt-4 grid gap-3 text-sm">
          <DetailRow label="Waybill" value={order.waybill} />
          <DetailRow label="Origin" value={order.origin} />
          <DetailRow
            label={order.status === "return" ? "Return To" : "Destination"}
            value={order.destination}
          />
          <DetailRow label="Consignee" value={order.consignee} />
          <DetailRow label={order.etaLabel} value={order.eta} />
          {order.exception ? <DetailRow label="Reason" value={order.exception.reason} /> : null}
        </dl>
      </Panel>

      {order.exception ? (
        <Panel className="mt-3 border-delay bg-[var(--delay-soft)] p-4 shadow-none">
          <div className="text-sm font-black text-text">Exception Alert</div>
          <p className="mt-3 text-sm leading-6 text-muted">
            {order.exception.message}
          </p>
        </Panel>
      ) : null}

      <Panel className="mt-3 p-4 shadow-none">
        <div className="text-sm font-black text-text">Decision Notes</div>
        <p className="mt-3 text-sm leading-6 text-muted">
          Status and waybill stay at the top because operators identify orders
          before reading details. Timeline is secondary and highlights only the
          current step.
        </p>
      </Panel>
    </aside>
  );
});

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 border-t border-line pt-3">
      <dt className="font-extrabold text-muted">{label}</dt>
      <dd className="text-right font-black text-text">{value}</dd>
    </div>
  );
}
