'use client';
import React from 'react';
import { useCollab } from '@/lib/context/CollaborationContext';
import { MousePointer2 } from 'lucide-react';

export function LiveCursors() {
  const { cursors } = useCollab();

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {cursors.map((cursor) => (
        <div
          key={cursor.userId}
          className="absolute transition-all duration-700 ease-in-out flex items-start gap-1"
          style={{
            left: `${cursor.x}%`,
            top: `${cursor.y}%`,
          }}
        >
          <MousePointer2 
            size={24} 
            fill={cursor.color} 
            color={cursor.color} 
            className="drop-shadow-lg"
          />
          <span 
            className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-md whitespace-nowrap"
            style={{ backgroundColor: cursor.color }}
          >
            {cursor.userName}
          </span>
        </div>
      ))}
    </div>
  );
}
