import type { DeliveryOrder } from "../types";

const SEED_DELIVERIES: DeliveryOrder[] = [
  {
    id: "do-0411",
    waybill: "DO-2026-0411",
    status: "ready",
    origin: "Busan Hub",
    destination: "Seoul Gangnam Center",
    consignee: "김민준",
    client: "HIGHERUP KR",
    etaLabel: "ETA",
    eta: "2026.06.11",
    handlerLabel: "Handler",
    handler: "OPS Team A",
    currentStage: "received",
    completedStages: ["received"],
    updatedAt: "Updated 12 min ago",
    note: "Awaiting pickup from Busan Hub.",
  },
  {
    id: "do-0412",
    waybill: "DO-2026-0412",
    status: "transit",
    origin: "Busan Port Terminal",
    destination: "Tacoma, WA",
    consignee: "PLK INC",
    client: "GATE GLOBAL",
    etaLabel: "ETA",
    eta: "2026.06.13",
    handlerLabel: "Container",
    handler: "FGAU3411255",
    currentStage: "shipping",
    completedStages: ["received", "departed", "shipping"],
    updatedAt: "Updated 4 min ago",
    note: "Ocean freight is moving on schedule.",
  },
  {
    id: "do-0413",
    waybill: "DO-2026-0413",
    status: "done",
    origin: "Incheon Airport",
    destination: "Daegu Central",
    consignee: "박서연",
    client: "BRANCH AMERICA",
    etaLabel: "Delivered",
    eta: "2026.06.10",
    handlerLabel: "POD",
    handler: "Signed",
    currentStage: "delivered",
    completedStages: ["received", "departed", "shipping", "arrived", "delivered"],
    updatedAt: "Closed today",
    note: "Proof of delivery has been attached.",
  },
  {
    id: "do-0414",
    waybill: "DO-2026-0414",
    status: "delay",
    origin: "LA Warehouse",
    destination: "Dallas, TX",
    consignee: "HEATCO",
    client: "HEATCO",
    etaLabel: "Revised ETA",
    eta: "2026.06.15",
    handlerLabel: "Priority",
    handler: "High",
    currentStage: "delayed",
    completedStages: ["received", "departed", "delayed"],
    updatedAt: "Needs follow-up",
    note: "Port congestion requires ETA confirmation.",
    exception: {
      reason: "Port congestion",
      priority: "High",
      message:
        "Port congestion was reported at the transfer point. Keep the revised ETA visible for operational follow-up.",
    },
  },
  {
    id: "do-0415",
    waybill: "DO-2026-0415",
    status: "return",
    origin: "Osaka Crossdock",
    destination: "Sender Warehouse",
    consignee: "AVENI AMERICA",
    client: "AVENI AMERICA",
    etaLabel: "Return Date",
    eta: "2026.06.12",
    handlerLabel: "Action",
    handler: "Confirm address",
    currentStage: "returning",
    completedStages: ["received", "departed", "returning"],
    updatedAt: "Updated 20 min ago",
    note: "Address validation failed after carrier attempt.",
    exception: {
      reason: "Address issue",
      priority: "Medium",
      message:
        "Return flow is active. Confirm the consignee address before re-dispatch.",
    },
  },
  {
    id: "do-0416",
    waybill: "DO-2026-0416",
    status: "transit",
    origin: "Gwangyang Terminal",
    destination: "Chicago, IL",
    consignee: "LOGIZU LOGISTICS",
    client: "UPCRAFT",
    etaLabel: "ETA",
    eta: "2026.06.14",
    handlerLabel: "Container",
    handler: "DFLU7423091",
    currentStage: "shipping",
    completedStages: ["received", "departed", "shipping"],
    updatedAt: "Updated 8 min ago",
    note: "Rail transfer is currently normal.",
  },
  {
    id: "do-0417",
    waybill: "DO-2026-0417",
    status: "ready",
    origin: "Seoul Fulfillment",
    destination: "Daejeon Station",
    consignee: "이하준",
    client: "SUNROOT USA",
    etaLabel: "ETA",
    eta: "2026.06.12",
    handlerLabel: "Handler",
    handler: "OPS Team B",
    currentStage: "received",
    completedStages: ["received"],
    updatedAt: "Awaiting pickup",
    note: "Carrier has not scanned departure yet.",
  },
  {
    id: "do-0418",
    waybill: "DO-2026-0418",
    status: "delay",
    origin: "Oakland Yard",
    destination: "Denver, CO",
    consignee: "ZESTBASE WEST",
    client: "ZESTBASE WEST",
    etaLabel: "Revised ETA",
    eta: "2026.06.16",
    handlerLabel: "Priority",
    handler: "Medium",
    currentStage: "delayed",
    completedStages: ["received", "departed", "delayed"],
    updatedAt: "Carrier notice received",
    note: "Weather delay was reported by carrier.",
    exception: {
      reason: "Weather delay",
      priority: "Medium",
      message:
        "Carrier notice was received. Monitor the route before customer escalation.",
    },
  },
  {
    id: "do-0419",
    waybill: "DO-2026-0419",
    status: "done",
    origin: "Incheon Hub",
    destination: "Suwon Plant",
    consignee: "정하린",
    client: "AURORA TECH",
    etaLabel: "Delivered",
    eta: "2026.06.10",
    handlerLabel: "POD",
    handler: "Signed",
    currentStage: "delivered",
    completedStages: ["received", "departed", "shipping", "arrived", "delivered"],
    updatedAt: "Closed yesterday",
    note: "No exception was recorded.",
  },
  {
    id: "do-0420",
    waybill: "DO-2026-0420",
    status: "transit",
    origin: "Shanghai Port",
    destination: "Busan Hub",
    consignee: "MORROW SUPPLY",
    client: "MORROW SUPPLY",
    etaLabel: "ETA",
    eta: "2026.06.13",
    handlerLabel: "Container",
    handler: "TCLU8831022",
    currentStage: "shipping",
    completedStages: ["received", "departed", "shipping"],
    updatedAt: "Updated 16 min ago",
    note: "Inbound vessel has cleared first checkpoint.",
  },
  {
    id: "do-0421",
    waybill: "DO-2026-0421",
    status: "return",
    origin: "Tokyo Branch",
    destination: "Sender Warehouse",
    consignee: "KAIRO RETAIL",
    client: "KAIRO RETAIL",
    etaLabel: "Return Date",
    eta: "2026.06.17",
    handlerLabel: "Action",
    handler: "Call consignee",
    currentStage: "returning",
    completedStages: ["received", "departed", "returning"],
    updatedAt: "Action required",
    note: "Recipient was unavailable for two attempts.",
    exception: {
      reason: "Recipient unavailable",
      priority: "High",
      message:
        "Two delivery attempts failed. Confirm recipient availability before next dispatch.",
    },
  },
  {
    id: "do-0422",
    waybill: "DO-2026-0422",
    status: "ready",
    origin: "Pyeongtaek Depot",
    destination: "Ulsan Factory",
    consignee: "최지우",
    client: "NEXORA PARTS",
    etaLabel: "ETA",
    eta: "2026.06.12",
    handlerLabel: "Handler",
    handler: "OPS Team C",
    currentStage: "received",
    completedStages: ["received"],
    updatedAt: "Registered now",
    note: "Manifest is ready for pickup.",
  },
];

const TARGET_MOCK_DELIVERY_COUNT = 50;

const statusCycle = ["ready", "transit", "done", "delay", "return"] as const;

const originPool = [
  "Busan Hub",
  "Incheon Airport",
  "Pyeongtaek Depot",
  "Seoul Fulfillment",
  "Gwangyang Terminal",
  "LA Warehouse",
  "Oakland Yard",
  "Shanghai Port",
  "Tokyo Branch",
  "Osaka Crossdock",
  "Rotterdam Gateway",
  "Singapore DC",
] as const;

const destinationPool = [
  "Seoul Gangnam Center",
  "Daegu Central",
  "Ulsan Factory",
  "Daejeon Station",
  "Chicago, IL",
  "Dallas, TX",
  "Denver, CO",
  "Tacoma, WA",
  "Busan Hub",
  "Sender Warehouse",
  "Frankfurt Hub",
  "Jakarta Branch",
] as const;

const consigneePool = [
  "김민준",
  "박서연",
  "이하준",
  "정하린",
  "최지우",
  "HEATCO",
  "PLK INC",
  "AVENI AMERICA",
  "LOGIZU LOGISTICS",
  "ZESTBASE WEST",
  "MORROW SUPPLY",
  "AURORA TECH",
] as const;

const clientPool = [
  "HIGHERUP KR",
  "GATE GLOBAL",
  "BRANCH AMERICA",
  "SUNROOT USA",
  "NEXORA PARTS",
  "UPCRAFT",
  "KAIRO RETAIL",
  "MORROW SUPPLY",
  "AURORA TECH",
  "ZESTBASE WEST",
  "HEATCO",
  "OMNIQ PARTNERS",
] as const;

const exceptionPool = [
  {
    reason: "Port congestion",
    message:
      "Port congestion was reported at the transfer point. Keep the revised ETA visible for operational follow-up.",
  },
  {
    reason: "Weather delay",
    message:
      "Carrier notice was received. Monitor the route before customer escalation.",
  },
  {
    reason: "Customs inspection",
    message:
      "Customs inspection is in progress. Confirm document status before updating the client.",
  },
  {
    reason: "Address issue",
    message:
      "Address validation failed. Confirm the consignee address before re-dispatch.",
  },
  {
    reason: "Recipient unavailable",
    message:
      "Delivery attempt failed. Confirm recipient availability before next dispatch.",
  },
] as const;

const generatedDeliveries = Array.from(
  { length: TARGET_MOCK_DELIVERY_COUNT - SEED_DELIVERIES.length },
  (_, index): DeliveryOrder => {
    const sequence = SEED_DELIVERIES.length + index + 1;
    const status = statusCycle[index % statusCycle.length];
    const day = 11 + (index % 10);
    const origin = originPool[index % originPool.length];
    const destination =
      status === "return"
        ? "Sender Warehouse"
        : destinationPool[(index + 3) % destinationPool.length];
    const consignee = consigneePool[(index + 5) % consigneePool.length];
    const client = clientPool[(index + 7) % clientPool.length];
    const exception = exceptionPool[index % exceptionPool.length];

    if (status === "ready") {
      return {
        id: `do-${String(411 + sequence).padStart(4, "0")}`,
        waybill: `DO-2026-${String(411 + sequence).padStart(4, "0")}`,
        status,
        origin,
        destination,
        consignee,
        client,
        etaLabel: "ETA",
        eta: `2026.06.${String(day).padStart(2, "0")}`,
        handlerLabel: "Handler",
        handler: `OPS Team ${String.fromCharCode(65 + (index % 4))}`,
        currentStage: "received",
        completedStages: ["received"],
        updatedAt: `${8 + (index % 23)} min ago`,
        note: "Manifest is ready and waiting for carrier pickup.",
      };
    }

    if (status === "transit") {
      return {
        id: `do-${String(411 + sequence).padStart(4, "0")}`,
        waybill: `DO-2026-${String(411 + sequence).padStart(4, "0")}`,
        status,
        origin,
        destination,
        consignee,
        client,
        etaLabel: "ETA",
        eta: `2026.06.${String(day).padStart(2, "0")}`,
        handlerLabel: "Container",
        handler: `TCLU${8800000 + index}`,
        currentStage: "shipping",
        completedStages: ["received", "departed", "shipping"],
        updatedAt: `Updated ${4 + (index % 18)} min ago`,
        note: "Shipment is moving through the planned carrier route.",
      };
    }

    if (status === "done") {
      return {
        id: `do-${String(411 + sequence).padStart(4, "0")}`,
        waybill: `DO-2026-${String(411 + sequence).padStart(4, "0")}`,
        status,
        origin,
        destination,
        consignee,
        client,
        etaLabel: "Delivered",
        eta: `2026.06.${String(Math.max(10, day - 1)).padStart(2, "0")}`,
        handlerLabel: "POD",
        handler: index % 3 === 0 ? "Photo" : "Signed",
        currentStage: "delivered",
        completedStages: [
          "received",
          "departed",
          "shipping",
          "arrived",
          "delivered",
        ],
        updatedAt: index % 2 === 0 ? "Closed today" : "Closed yesterday",
        note: "Delivery was completed and proof of delivery was recorded.",
      };
    }

    if (status === "delay") {
      return {
        id: `do-${String(411 + sequence).padStart(4, "0")}`,
        waybill: `DO-2026-${String(411 + sequence).padStart(4, "0")}`,
        status,
        origin,
        destination,
        consignee,
        client,
        etaLabel: "Revised ETA",
        eta: `2026.06.${String(day + 1).padStart(2, "0")}`,
        handlerLabel: "Priority",
        handler: index % 4 === 0 ? "High" : "Medium",
        currentStage: "delayed",
        completedStages: ["received", "departed", "delayed"],
        updatedAt: "Needs follow-up",
        note: `${exception.reason} requires operational follow-up.`,
        exception: {
          reason: exception.reason,
          priority: index % 4 === 0 ? "High" : "Medium",
          message: exception.message,
        },
      };
    }

    return {
      id: `do-${String(411 + sequence).padStart(4, "0")}`,
      waybill: `DO-2026-${String(411 + sequence).padStart(4, "0")}`,
      status,
      origin,
      destination,
      consignee,
      client,
      etaLabel: "Return Date",
      eta: `2026.06.${String(day + 2).padStart(2, "0")}`,
      handlerLabel: "Action",
      handler: index % 2 === 0 ? "Confirm address" : "Call consignee",
      currentStage: "returning",
      completedStages: ["received", "departed", "returning"],
      updatedAt: "Action required",
      note: `${exception.reason} triggered return handling.`,
      exception: {
        reason: exception.reason,
        priority: index % 3 === 0 ? "High" : "Medium",
        message: exception.message,
      },
    };
  },
);

export const MOCK_DELIVERIES: DeliveryOrder[] = [
  ...SEED_DELIVERIES,
  ...generatedDeliveries,
];
