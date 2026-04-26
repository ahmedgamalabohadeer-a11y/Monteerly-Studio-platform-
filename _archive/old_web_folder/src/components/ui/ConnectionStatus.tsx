'use client';
import React from 'react';

export const ConnectionStatus = () => {
  return (
    <div className="flex items-center space-x-2 space-x-reverse text-sm bg-black/40 px-3 py-1.5 rounded-full border border-gray-800">
      <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></span>
      <span className="text-gray-300 font-cairo">الخادم متصل</span>
    </div>
  );
};
