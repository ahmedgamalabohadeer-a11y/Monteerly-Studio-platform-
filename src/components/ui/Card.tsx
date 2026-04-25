"use client";
import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`bg-[#1e293b]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
}

################################################################################