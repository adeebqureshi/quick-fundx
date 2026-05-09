import { Skeleton } from "@/components/ui/skeleton";

export const StatCardSkeleton = () => (
  <div className="p-5 rounded-xl bg-card shadow-card">
    <div className="flex items-start justify-between mb-3">
      <Skeleton className="w-10 h-10 rounded-lg" />
      <Skeleton className="w-16 h-5 rounded-full" />
    </div>
    <Skeleton className="w-24 h-8 mb-2" />
    <Skeleton className="w-32 h-4" />
  </div>
);

export const TableRowSkeleton = ({ cols = 5 }: { cols?: number }) => (
  <tr className="border-b border-border">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-6 py-4">
        <Skeleton className="h-4 w-full max-w-[120px]" />
      </td>
    ))}
  </tr>
);

export const ChartSkeleton = ({ height = 260 }: { height?: number }) => (
  <div className="w-full animate-pulse rounded-lg bg-muted" style={{ height }} />
);

export const PageSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card rounded-xl shadow-card p-6">
        <ChartSkeleton height={260} />
      </div>
      <div className="bg-card rounded-xl shadow-card p-6">
        <ChartSkeleton height={200} />
      </div>
    </div>
  </div>
);
