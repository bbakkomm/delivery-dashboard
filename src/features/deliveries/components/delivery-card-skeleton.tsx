import { Skeleton } from "@/components/ui";

export function DeliveryCardSkeleton() {
  return (
    <div className="panel grid min-h-[220px] gap-3 p-[15px]">
      <div className="flex justify-between gap-4">
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-9 w-28" />
      </div>
      <Skeleton className="h-12 w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton variant="line" />
        <Skeleton variant="line" />
        <Skeleton variant="line" />
        <Skeleton variant="line" />
      </div>
      <Skeleton className="h-12 w-full" />
      <div className="mt-auto flex justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}
