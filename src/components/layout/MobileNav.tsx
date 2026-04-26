'use client';
import React from 'react';
import Link from 'next/link';
import { Home, Search, PlusSquare, Bell, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function MobileNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname?.includes(path);

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-white/10 z-[100] pb-safe">
       <div className="flex justify-around items-center h-16 px-2">
          <Link href="/dashboard" className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive('/dashboard') ? 'text-indigo-400 bg-white/5' : 'text-slate-400'}`}>
             <Home size={20} />
             <span className="text-[9px] font-medium">الرئيسية</span>
          </Link>
          
          <Link href="/marketplace" className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive('/marketplace') ? 'text-indigo-400 bg-white/5' : 'text-slate-400'}`}>
             <Search size={20} />
             <span className="text-[9px] font-medium">السوق</span>
          </Link>

          <Link href="/projects/create" className="relative -top-5">
             <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/40 border-4 border-black text-white hover:scale-105 transition-transform">
                <PlusSquare size={26} />
             </div>
          </Link>

          <Link href="/notifications" className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive('/notifications') ? 'text-indigo-400 bg-white/5' : 'text-slate-400'}`}>
             <Bell size={20} />
             <span className="text-[9px] font-medium">تنبيهات</span>
          </Link>

          <Link href="/settings/profile" className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive('/settings') ? 'text-indigo-400 bg-white/5' : 'text-slate-400'}`}>
             <User size={20} />
             <span className="text-[9px] font-medium">حسابي</span>
          </Link>
       </div>
    </div>
  );
}

