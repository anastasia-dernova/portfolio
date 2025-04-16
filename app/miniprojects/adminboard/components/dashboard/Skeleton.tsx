import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-80 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </div>
  );
}

export function UserTableSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
      
      <div className="rounded-lg overflow-hidden">
        <Skeleton className="h-16 w-full" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full mt-1" />
        ))}
      </div>
    </div>
  );
}


export function UserDetailSkeleton() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="h-96 rounded-xl" />
        <div className="lg:col-span-2">
          <Skeleton className="h-12 w-full mb-6" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      </div>
    );
}