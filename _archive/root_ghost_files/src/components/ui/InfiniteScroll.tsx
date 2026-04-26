'use client';
import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export function InfiniteScroll({ onLoadMore, hasMore, isLoading }: Props) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    }, { rootMargin: '100px' });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, isLoading, onLoadMore]);

  if (!hasMore) return (
      <div className="py-8 text-center text-sm text-muted-foreground">
          🎉 لقد وصلت لنهاية القائمة
      </div>
  );

  return (
    <div ref={loaderRef} className="py-8 flex justify-center w-full">
       {isLoading && (
          <div className="flex items-center gap-2 text-primary animate-pulse">
             <Loader2 size={24} className="animate-spin" />
             <span className="text-sm font-bold">جاري تحميل المزيد...</span>
          </div>
       )}
    </div>
  );
}

################################################################################