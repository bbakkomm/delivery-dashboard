import type {
  DeliveryFilterStatus,
  DeliveryStage,
  DeliveryStatus,
  DeliveryStatusConfig,
} from "./types";

export const DELIVERY_STATUS_CONFIG: Record<
  DeliveryStatus,
  DeliveryStatusConfig
> = {
  ready: {
    accentClassName: "bg-ready",
    cardClassName: "status-ready",
    label: "배송 준비 중",
    softClassName: "bg-[var(--ready-soft)] text-ready",
    value: "ready",
  },
  transit: {
    accentClassName: "bg-transit",
    cardClassName: "status-transit",
    label: "배송 중",
    softClassName: "bg-[var(--transit-soft)] text-transit",
    value: "transit",
  },
  done: {
    accentClassName: "bg-done",
    cardClassName: "status-done",
    label: "배송 완료",
    softClassName: "bg-[var(--done-soft)] text-done",
    value: "done",
  },
  delay: {
    accentClassName: "bg-delay",
    cardClassName: "status-delay",
    label: "배송 지연",
    softClassName: "bg-[var(--delay-soft)] text-delay",
    value: "delay",
  },
  return: {
    accentClassName: "bg-return",
    cardClassName: "status-return",
    label: "반송",
    softClassName: "bg-[var(--return-soft)] text-return",
    value: "return",
  },
};

export const DELIVERY_FILTERS: Array<{
  label: string;
  value: DeliveryFilterStatus;
}> = [
  { label: "ALL", value: "all" },
  { label: "READY", value: "ready" },
  { label: "IN TRANSIT", value: "transit" },
  { label: "DELIVERED", value: "done" },
  { label: "DELAYED", value: "delay" },
  { label: "RETURNED", value: "return" },
];

export const DELIVERY_STEPS: Array<{ label: string; value: DeliveryStage }> = [
  { label: "접수", value: "received" },
  { label: "출고", value: "departed" },
  { label: "운송", value: "shipping" },
  { label: "도착", value: "arrived" },
  { label: "완료", value: "delivered" },
];

export const RETURN_STEPS: Array<{ label: string; value: DeliveryStage }> = [
  { label: "접수", value: "received" },
  { label: "출고", value: "departed" },
  { label: "반송", value: "returning" },
  { label: "회수", value: "recovered" },
  { label: "완료", value: "delivered" },
];

export const DELAY_STEPS: Array<{ label: string; value: DeliveryStage }> = [
  { label: "접수", value: "received" },
  { label: "출고", value: "departed" },
  { label: "지연", value: "delayed" },
  { label: "도착", value: "arrived" },
  { label: "완료", value: "delivered" },
];
