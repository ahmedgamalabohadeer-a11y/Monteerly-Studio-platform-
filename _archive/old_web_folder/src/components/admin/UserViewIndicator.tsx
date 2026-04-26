'use client';
import React from 'react';
import { useRole } from '@/lib/context/RoleContext';
import { LAYER_COLORS } from '@/lib/constants/roles';
import { Eye } from 'lucide-react';

export function UserViewIndicator() {
  const { currentRole } = useRole();

  // Don't show for standard creator to keep UI clean, or show small
  // For demo purposes, we show it always to indicate the simulation
  
  return (
    <div className={`w-full py-1 px-4 text-[10px] font-bold text-white flex items-center justify-center gap-2 shadow-lg ${LAYER_COLORS[currentRole.layer]} bg-opacity-90 backdrop-blur-sm z-[9998] relative`}>
      <Eye size={12} />
      <span>
        SIMULATION MODE: Viewing as <span className="underline text-white font-black uppercase">{currentRole.label}</span> ({currentRole.layer} Layer)
      </span>
    </div>
  );
}

