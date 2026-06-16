import type {
  DeliveryFilterStatus,
  DeliveryOrder,
  DeliveryStatus,
} from "./types";

export type DeliverySearchIndexItem = {
  order: DeliveryOrder;
  searchableText: string;
};

export function buildDeliverySearchIndex(orders: DeliveryOrder[]): DeliverySearchIndexItem[] {
  return orders.map((order) => ({
    order,
    searchableText: getDeliverySearchText(order),
  }));
}

export function filterDeliverySearchIndex(
  index: DeliverySearchIndexItem[],
  status: DeliveryFilterStatus,
  query: string,
) {
  const normalizedQuery = query.trim().toLowerCase();

  return index
    .filter(({ order, searchableText }) => {
      const matchesStatus = status === "all" || order.status === status;

      return matchesStatus && (!normalizedQuery || searchableText.includes(normalizedQuery));
    })
    .map(({ order }) => order);
}

export function filterDeliveryOrders(
  orders: DeliveryOrder[],
  status: DeliveryFilterStatus,
  query: string,
) {
  return filterDeliverySearchIndex(buildDeliverySearchIndex(orders), status, query);
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

function getDeliverySearchText(order: DeliveryOrder) {
  return [
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
}
