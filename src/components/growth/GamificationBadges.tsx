'use client';
import React from 'react';
import { Award, Zap, Star } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';

export function GamificationBadges() {
  return (
    <div className="flex gap-2">
       <Tooltip content="Top Rated Talent (5.0)">
          <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center border-2 border-white shadow-sm">
             <Star size={14} fill="currentColor" />
          </div>
       </Tooltip>
       <Tooltip content="Fast Responder (< 1hr)">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border-2 border-white shadow-sm">
             <Zap size={14} fill="currentColor" />
          </div>
       </Tooltip>
       <Tooltip content="Verified Pro">
          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center border-2 border-white shadow-sm">
             <Award size={14} />
          </div>
       </Tooltip>
    </div>
  );
}

################################################################################