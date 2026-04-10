'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LegalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const links = [
    { name: 'شروط الخدمة (Terms)', href: '/legal/terms' },
    { name: 'سياسة الخصوصية (Privacy)', href: '/legal/privacy' },
    { name: 'الامتثال (Compliance)', href: '/legal/compliance' },
    { name: 'حقوق الملكية (IP)', href: '/legal/ip' },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 pt-24 pb-12">
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
             <h2 className="text-xl font-bold text-white mb-6">المركز القانوني</h2>
             <nav className="space-y-2">
                {links.map(link => (
                   <Link key={link.href} href={link.href}>
                      <div className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                         pathname === link.href ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}>
                         {link.name}
                      </div>
                   </Link>
                ))}
             </nav>
             <div className="mt-8 p-4 bg-slate-900 rounded-xl border border-white/10">
                <p className="text-xs text-slate-400 mb-2">للاستفسارات القانونية:</p>
                <a href="mailto:legal@monteerly.com" className="text-indigo-400 text-sm font-bold hover:underline">legal@monteerly.com</a>
             </div>
          </div>
          
          <div className="lg:col-span-3 bg-slate-900 border border-white/10 rounded-2xl p-8 min-h-[600px]">
             <div className="prose prose-invert max-w-none">
                {children}
             </div>
          </div>
       </div>
    </div>
  );
}
