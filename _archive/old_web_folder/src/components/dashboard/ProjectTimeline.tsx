'use client';
import React from 'react';

export const ProjectTimeline = () => {
  const days = Array.from({ length: 14 }, (_, i) => i + 1); // Mock 2 weeks
  return (
    <div className="p-6 bg-brand-surface rounded-xl border border-gray-800 mt-6">
      <h3 className="text-xl font-bold text-white mb-4 font-cairo">الجدول الزمني للمشاريع</h3>
      <div className="relative overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 space-x-reverse min-w-max pb-2">
          {days.map(day => (
            <div key={day} className="flex flex-col items-center justify-center w-16 h-20 bg-white/5 rounded-lg border border-gray-700 transition-all hover:border-brand-primary">
              <span className="text-xs text-gray-400 font-cairo">يوم</span>
              <span className="text-lg font-bold text-white">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
