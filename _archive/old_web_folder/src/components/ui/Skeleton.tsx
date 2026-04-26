import React from 'react';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-4 space-y-4">
       <Skeleton className="h-48 w-full rounded-lg" />
       <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
       </div>
       <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
       </div>
    </div>
  );
}

