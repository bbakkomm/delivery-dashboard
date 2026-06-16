import { memo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui";
import type { DeliveryOrder } from "../types";
import { DeliveryStatusBadge } from "./delivery-status-badge";

type MobileDetailSheetProps = {
  onClose: () => void;
  order?: DeliveryOrder;
};

// 모바일 시트는 주문이나 닫기 핸들러가 바뀔 때만 다시 렌더링합니다.
export const MobileDetailSheet = memo(function MobileDetailSheet({ onClose, order }: MobileDetailSheetProps) {
  if (!order) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface p-4 shadow-panel xl:hidden">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-black text-text">{order.waybill}</div>
            <div className="mt-1 text-xs font-bold text-muted">
              {order.origin} {"->"} {order.destination}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DeliveryStatusBadge status={order.status} />
            <Button
              aria-label="Close detail"
              className="size-8 min-h-8 p-0"
              icon={<X aria-hidden="true" className="size-4" />}
              onClick={onClose}
              variant="ghost"
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <Info label="Consignee" value={order.consignee} />
          <Info label={order.etaLabel} value={order.eta} />
          <Info label="Client" value={order.client} />
          <Info label={order.handlerLabel} value={order.handler} />
        </div>
        {order.exception ? (
          <p className="mt-3 rounded-[8px] bg-[var(--delay-soft)] p-3 text-xs leading-5 text-muted">
            {order.exception.message}
          </p>
        ) : null}
      </div>
    </div>
  );
});

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="font-extrabold text-muted">{label}</div>
      <div className="text-truncate mt-1 font-black text-text">{value}</div>
    </div>
  );
}
