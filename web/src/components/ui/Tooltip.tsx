'use client';
import React from 'react';

// تعريف الواجهة لتشمل content بشكل صريح
export interface TooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  className?: string;
}

export function Tooltip({ children, content, className }: TooltipProps) {
  return (
    <div className={`relative group inline-block ${className || ''}`}>
      {children}
      {/* Tooltip Popup */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 bg-slate-900 text-white text-xs rounded shadow-lg z-50 whitespace-nowrap pointer-events-none">
        {content}
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  );
}

