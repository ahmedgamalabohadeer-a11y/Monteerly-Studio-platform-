import React from 'react';

export function SkipLink() {
  return (
    <a 
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[10000] px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-xl outline-none border-2 border-white transition-transform"
    >
      تخطي إلى المحتوى الرئيسي
    </a>
  );
}

