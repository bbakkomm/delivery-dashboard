import { MOCK_DELIVERIES } from "../data/mock-deliveries";
import type {
  DeliveryOrder,
  FetchDeliveryOrdersParams,
  FetchDeliveryOrdersResponse,
} from "../types";
import { filterDeliveryOrders, getMetricCounts } from "../utils";

const INITIAL_API_DELAY_MS = 450;
const FILTER_API_DELAY_MS = 260;

export async function fetchDeliveryOrders({
  query = "",
  status = "all",
  visibleCount,
}: FetchDeliveryOrdersParams = {}): Promise<FetchDeliveryOrdersResponse> {
  await delay(query || status !== "all" ? FILTER_API_DELAY_MS : INITIAL_API_DELAY_MS);

  const filteredOrders = filterDeliveryOrders(MOCK_DELIVERIES, status, query);
  const orders =
    typeof visibleCount === "number"
      ? filteredOrders.slice(0, visibleCount)
      : filteredOrders;

  return {
    counts: getMetricCounts(MOCK_DELIVERIES),
    orders,
    selectedOrder: MOCK_DELIVERIES.find((order) => order.id === "do-0414"),
    total: filteredOrders.length,
  };
}

export async function fetchDeliveryOrderById(
  id: string,
): Promise<DeliveryOrder | undefined> {
  await delay(120);

  return MOCK_DELIVERIES.find((order) => order.id === id);
}

function delay(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
