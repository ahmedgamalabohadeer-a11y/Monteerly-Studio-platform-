'use client';
import React from 'react';

export const BlogCard = ({ title, excerpt }: { title?: string, excerpt?: string }) => {
  return (
    <div className="p-6 bg-brand-surface rounded-2xl border border-gray-800 transition-all hover:border-brand-primary">
      <h3 className="text-xl font-bold text-white font-cairo">{title || 'مقال تسويقي'}</h3>
      <p className="text-gray-400 mt-2 text-sm">{excerpt || 'وصف المقال يظهر هنا...'}</p>
    </div>
  );
};
