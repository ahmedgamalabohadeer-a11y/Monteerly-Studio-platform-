'use client';
import React from 'react';
import { Trophy, Star, Zap, Shield } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';

export function GamificationBadges() {
  return (
    <div className="flex gap-2">
       <Tooltip content="Top Rated Talent (5.0)">
          <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center border-2 border-white shadow-sm">
             <Star size={14} fill="currentColor" />
          </div>
       </Tooltip>
       
       <Tooltip content="Speed Demon (Fast Delivery)">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border-2 border-white shadow-sm">
             <Zap size={14} fill="currentColor" />
          </div>
       </Tooltip>

       <Tooltip content="Verified Pro">
          <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center border-2 border-white shadow-sm">
             <Shield size={14} fill="currentColor" />
          </div>
       </Tooltip>

       <div className="flex flex-col justify-center ml-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Level 12</div>
          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
             <div className="bg-indigo-500 w-[75%] h-full rounded-full" />
          </div>
       </div>
    </div>
  );
}
