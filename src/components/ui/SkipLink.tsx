import React from 'react';

export function SkipLink() {
  return (
    <a 
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-primary text-white px-6 py-3 rounded-lg font-bold shadow-xl border-2 border-white outline-none transition-transform"
    >
      تخطي إلى المحتوى الرئيسي (Skip to Content)
    </a>
  );
}

