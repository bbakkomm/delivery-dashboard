import type {
  DeliveryFilterStatus,
  DeliveryOrder,
  DeliveryStatus,
} from "./types";

export function filterDeliveryOrders(
  orders: DeliveryOrder[],
  status: DeliveryFilterStatus,
  query: string,
) {
  const normalizedQuery = query.trim().toLowerCase();

  return orders.filter((order) => {
    const matchesStatus = status === "all" || order.status === status;
    const searchable = [
      order.waybill,
      order.origin,
      order.destination,
      order.consignee,
      order.client,
      order.eta,
      order.handler,
      order.exception?.reason,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery));
  });
}

export function getMetricCounts(orders: DeliveryOrder[]) {
  return {
    total: orders.length,
    transit: countByStatus(orders, "transit"),
    delayed: countByStatus(orders, "delay"),
    returned: countByStatus(orders, "return"),
  };
}

function countByStatus(orders: DeliveryOrder[], status: DeliveryStatus) {
  return orders.filter((order) => order.status === status).length;
}
