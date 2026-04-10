'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SmartIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  flipOnRtl?: boolean; // Should this icon flip in Arabic? (e.g. Arrow, Chevron)
}

export function SmartIcon({ icon: Icon, size = 20, className = '', flipOnRtl = false }: SmartIconProps) {
  // In a real Next.js app, we detect dir="rtl" from context or html attribute
  // CSS class 'rtl:rotate-180' is a Tailwind pattern we can enable via plugin, 
  // or use a simple logic here.
  
  return (
    <span className={`inline-flex items-center justify-center ${flipOnRtl ? 'rtl-flip' : ''}`}>
      <Icon size={size} className={className} />
      <style jsx global>{`
        /* Global CSS rule for RTL flipping */
        [dir="rtl"] .rtl-flip {
          transform: scaleX(-1);
        }
      `}</style>
    </span>
  );
}
