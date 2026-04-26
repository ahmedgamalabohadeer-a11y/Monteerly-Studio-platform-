'use client';
import React from 'react';

export const VideoAnnotator = () => {
  return (
    <div className="p-4 bg-brand-surface rounded-xl border border-gray-800 w-full">
      <div className="aspect-video bg-black flex items-center justify-center rounded-lg relative overflow-hidden border border-gray-700">
         <span className="text-gray-500 font-cairo text-sm">مساحة التعليق على الفيديو (نشط)</span>
      </div>
    </div>
  );
};
