'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Trigger loading animation on route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[99999] bg-transparent">
       <div className="h-full bg-indigo-500 shadow-[0_0_10px_#6366f1] animate-[loading_1s_ease-in-out_infinite] w-1/2" />
       <style jsx global>{`
          @keyframes loading {
             0% { width: 0%; margin-left: 0; }
             50% { width: 70%; margin-left: 30%; }
             100% { width: 0%; margin-left: 100%; }
          }
       `}</style>
    </div>
  );
}
