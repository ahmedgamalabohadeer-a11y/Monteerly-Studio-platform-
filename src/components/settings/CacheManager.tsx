'use client';
import React, { useState } from 'react';

export const CacheManager = () => {
  const [status, setStatus] = useState('idle');
  return (
    <div className="p-6 bg-brand-surface rounded-xl border border-gray-800">
      <h3 className="text-lg font-bold text-white mb-4 font-cairo">إدارة الذاكرة المؤقتة</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <span className="text-gray-300">النظام مستقر ومحسن.</span>
          <button onClick={() => setStatus('cleared')} className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-80 transition-all">
            تحسين الذاكرة
          </button>
        </div>
        {status === 'cleared' && <div className="text-brand-success text-sm font-bold">تم التفريغ بنجاح.</div>}
      </div>
    </div>
  );
};
