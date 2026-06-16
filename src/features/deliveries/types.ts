export type DeliveryStatus = "ready" | "transit" | "done" | "delay" | "return";

export type DeliveryFilterStatus = "all" | DeliveryStatus;

export type DeliveryStage =
  | "received"
  | "departed"
  | "shipping"
  | "arrived"
  | "delivered"
  | "delayed"
  | "returning"
  | "recovered";

export type DeliveryPriority = "Low" | "Medium" | "High";

export type DeliveryOrder = {
  id: string;
  waybill: string;
  status: DeliveryStatus;
  origin: string;
  destination: string;
  consignee: string;
  client: string;
  etaLabel: "ETA" | "Revised ETA" | "Delivered" | "Return Date";
  eta: string;
  handlerLabel: "Handler" | "Container" | "POD" | "Action" | "Priority";
  handler: string;
  currentStage: DeliveryStage;
  completedStages: DeliveryStage[];
  updatedAt: string;
  note: string;
  exception?: {
    reason: string;
    priority: DeliveryPriority;
    message: string;
  };
};

export type DeliveryStatusConfig = {
  accentClassName: string;
  cardClassName: string;
  label: string;
  softClassName: string;
  value: DeliveryStatus;
};

export type DeliveryMetricCounts = {
  delayed: number;
  returned: number;
  total: number;
  transit: number;
};

export type FetchDeliveryOrdersParams = {
  query?: string;
  status?: DeliveryFilterStatus;
  visibleCount?: number;
};

export type FetchDeliveryOrdersResponse = {
  counts: DeliveryMetricCounts;
  orders: DeliveryOrder[];
  selectedOrder?: DeliveryOrder;
  total: number;
};
