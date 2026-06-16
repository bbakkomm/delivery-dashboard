import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { ArrowUp, CalendarDays, ClipboardList, Download, FileText, History, LayoutDashboard, Package, Plus, Search, X } from "lucide-react";
import { Button, Input, Skeleton, SkeletonGroup } from "@/components/ui";
import { fetchDeliveryOrderById, fetchDeliveryOrders } from "../api";
import type { DeliveryFilterStatus, DeliveryMetricCounts, DeliveryOrder } from "../types";
import { filterDeliveryOrders } from "../utils";
import { DeliveryCard } from "./delivery-card";
import { DeliveryCardSkeleton } from "./delivery-card-skeleton";
import { MetricSummary } from "./metric-summary";
import { MobileDetailSheet } from "./mobile-detail-sheet";
import { SelectedDetailPanel } from "./selected-detail-panel";
import { StatusFilter } from "./status-filter";

const INITIAL_VISIBLE_COUNT = 30;
const LOAD_MORE_COUNT = 30;

function getSkeletonCardCount() {
  if (typeof window === "undefined") {
    return 5;
  }

  if (window.innerWidth >= 1800) {
    return 5;
  }

  if (window.innerWidth >= 1536) {
    return 4;
  }

  if (window.innerWidth >= 1024) {
    return 3;
  }

  return 2;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Package, label: "Delivery Order" },
  { icon: CalendarDays, label: "Schedule" },
  { icon: ClipboardList, label: "Manifest" },
  { icon: History, label: "History" },
  { icon: FileText, label: "Report" },
];

export function DeliveryDashboard() {
  const [activeStatusFilter, setActiveStatusFilter] = useState<DeliveryFilterStatus>("all");
  const [allDeliveryOrders, setAllDeliveryOrders] = useState<DeliveryOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [metricCounts, setMetricCounts] = useState<DeliveryMetricCounts>({
    delayed: 0,
    returned: 0,
    total: 0,
    transit: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>("do-0414");
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | undefined>();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [skeletonCardCount, setSkeletonCardCount] = useState(getSkeletonCardCount);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [controlsStuck, setControlsStuck] = useState(false);
  const controlsSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadDeliveries() {
      const response = await fetchDeliveryOrders();

      if (!isActive) {
        return;
      }

      setAllDeliveryOrders(response.orders);
      setMetricCounts(response.counts);
      setIsLoading(false);
    }

    void loadDeliveries();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadSelectedOrder() {
      if (!selectedDeliveryId) {
        setSelectedOrder(undefined);
        return;
      }

      const order = await fetchDeliveryOrderById(selectedDeliveryId);

      if (isActive) {
        setSelectedOrder(order);
      }
    }

    void loadSelectedOrder();

    return () => {
      isActive = false;
    };
  }, [selectedDeliveryId]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSkeletonCardCount(getSkeletonCardCount());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const sentinel = controlsSentinelRef.current;

    if (!sentinel || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setControlsStuck(!entry.isIntersecting);
      },
      {
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, []);

  const handleStatusChange = useCallback((status: DeliveryFilterStatus) => {
    setActiveStatusFilter(status);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, []);

  const handleSelectDelivery = useCallback((id: string) => {
    setSelectedDeliveryId((currentId) => (currentId === id ? null : id));
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((count) => count + LOAD_MORE_COUNT);
  }, []);

  const handleReset = useCallback(() => {
    setActiveStatusFilter("all");
    setSearchQuery("");
    setSelectedDeliveryId(null);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, []);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);

  const filteredDeliveryOrders = useMemo(() => filterDeliveryOrders(allDeliveryOrders, activeStatusFilter, searchQuery), [activeStatusFilter, allDeliveryOrders, searchQuery]);
  const deliveryOrders = useMemo(() => filteredDeliveryOrders.slice(0, visibleCount), [filteredDeliveryOrders, visibleCount]);
  const deliveryTotal = filteredDeliveryOrders.length;
  const hasMore = deliveryOrders.length < deliveryTotal;
  const remainingDeliveryCount = Math.max(0, deliveryTotal - deliveryOrders.length);
  const showReset = activeStatusFilter !== "all" || searchQuery !== "";

  return (
    <div className="app-page">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold leading-[1.35] text-text">배송 현황 운영 대시보드</h1>
          <p className="mt-2.5 max-w-[600px] text-[15px] leading-[1.65] text-muted">송장번호, 수령인, 경로, 예상 도착일, 예외 상태를 한 화면에서 빠르게 스캔하는 물류 운영자용 UI입니다.</p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button icon={<Download aria-hidden="true" className="size-4" />} variant="outline">
            Export
          </Button>
          <Button icon={<Plus aria-hidden="true" className="size-4" />} variant="primary">
            Add Delivery
          </Button>
        </div>
      </header>

      <div className="dashboard-shell grid items-start overflow-visible xl:grid-cols-[170px_minmax(0,1fr)_360px]">
        <aside className="sidebar-shell p-4 max-xl:hidden">
          <BrandMark />
          <DashboardNav variant="sidebar" />
        </aside>

        <main className="dashboard-main">
          <div className="mobile-nav-shell xl:hidden">
            <BrandMark variant="mobile" />
            <DashboardNav variant="mobile" />
          </div>

          {isLoading ? (
            <SkeletonGroup className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} variant="metric" />
              ))}
            </SkeletonGroup>
          ) : (
            <MetricSummary counts={metricCounts} />
          )}

          <div aria-hidden="true" className="dashboard-controls-sentinel" ref={controlsSentinelRef} />
          <div className="dashboard-controls mt-4" data-stuck={controlsStuck ? "true" : undefined}>
            <label className="relative flex-1">
              <span className="sr-only">Search deliveries</span>
              <Search aria-hidden="true" className="absolute left-3 top-1/2 hidden size-4 -translate-y-1/2 text-muted" />
              <Input className="pr-10" onChange={handleSearchChange} placeholder="Search by waybill, client, consignee, destination" value={searchQuery} />
              {searchQuery ? (
                <button
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-surface-muted text-muted"
                  onClick={() => {
                    setSearchQuery("");
                    setVisibleCount(INITIAL_VISIBLE_COUNT);
                  }}
                  type="button"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              ) : null}
            </label>
            <StatusFilter activeStatus={activeStatusFilter} onReset={handleReset} onStatusChange={handleStatusChange} showReset={showReset} />
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <h2 className="text-base font-black text-text">Delivery Status Cards</h2>
            <span className="text-xs font-extrabold text-muted">{deliveryTotal} mock orders, 5 status variants</span>
          </div>

          {isLoading ? (
            <SkeletonGroup className="delivery-card-grid mt-3 grid gap-3">
              {Array.from({ length: skeletonCardCount }).map((_, index) => (
                <DeliveryCardSkeleton key={index} />
              ))}
            </SkeletonGroup>
          ) : (
            <div className="delivery-card-grid mt-3 grid gap-3">
              {deliveryOrders.map((order) => (
                <DeliveryCard key={order.id} onSelect={handleSelectDelivery} order={order} searchQuery={searchQuery} selected={selectedDeliveryId === order.id} />
              ))}
            </div>
          )}

          {!isLoading && !deliveryOrders.length ? (
            <div className="panel mt-4 p-8 text-center">
              <div className="text-base font-black text-text">No deliveries found</div>
              <p className="mt-2 text-sm text-muted">Reset search and status filters to show all orders.</p>
            </div>
          ) : null}

          {!isLoading && deliveryOrders.length ? (
            <div className="mt-7 flex items-center justify-center gap-4">
              {hasMore ? (
                <Button onClick={handleLoadMore} variant="outline">
                  Load {Math.min(LOAD_MORE_COUNT, remainingDeliveryCount)} more
                </Button>
              ) : null}
              <span className="text-xs font-extrabold text-muted">
                Showing {deliveryOrders.length} of {deliveryTotal}
              </span>
            </div>
          ) : null}
        </main>

        <SelectedDetailPanel order={selectedOrder} />
      </div>

      <MobileDetailSheet onClose={() => setSelectedDeliveryId(null)} order={selectedOrder} />

      {showScrollTop ? <Button aria-label="Scroll to top" className="scroll-top-button size-11 min-h-11 rounded-full p-0 shadow-panel" data-has-mobile-sheet={Boolean(selectedOrder)} icon={<ArrowUp aria-hidden="true" className="size-5" />} onClick={handleScrollTop} variant="primary" /> : null}
    </div>
  );
}

function BrandMark({ variant = "sidebar" }: { variant?: "mobile" | "sidebar" }) {
  return (
    <div className={variant === "mobile" ? "mobile-nav-brand flex items-center gap-3 font-black text-text" : "mb-8 flex items-center gap-3 font-black text-text"}>
      <span className="grid size-8 place-items-center rounded-[8px] bg-teal text-sm text-white">OQ</span>
      OMNIQ OPS
    </div>
  );
}

function DashboardNav({ variant }: { variant: "mobile" | "sidebar" }) {
  const isMobile = variant === "mobile";

  return (
    <nav aria-label={isMobile ? "Mobile primary" : "Primary"} className={isMobile ? "mobile-nav-list scrollbar-thin" : "grid gap-1"}>
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <button aria-label={item.label} className={isMobile ? "mobile-nav-item" : `flex min-h-10 items-center gap-3 rounded-[7px] px-3 text-left text-sm font-extrabold ${item.active ? "bg-[var(--transit-soft)] text-teal-dark" : "text-text-soft hover:bg-surface-soft"}`} data-active={item.active ? "true" : undefined} key={item.label} type="button">
            <Icon aria-hidden="true" className="size-4 shrink-0" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
