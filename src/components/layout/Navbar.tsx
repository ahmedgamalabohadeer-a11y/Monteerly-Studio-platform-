'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Menu, Wifi, WifiOff, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { NotificationDropdown } from '@/components/layout/NotificationDropdown';

export function Navbar() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-red-600 text-white text-xs font-bold text-center py-1 fixed top-0 w-full z-[100] animate-in slide-in-from-top-2">
           <span className="flex items-center justify-center gap-2">
             <WifiOff size={12} /> أنت غير متصل بالإنترنت. يتم حفظ التغييرات محلياً.
           </span>
        </div>
      )}

      <nav className={`fixed ${!isOnline ? 'top-6' : 'top-0'} w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10 h-16 flex items-center transition-all duration-300`}>
         <div className="container mx-auto px-4 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white group-hover:scale-110 transition-transform">M</div>
               <span className="font-bold text-xl text-white tracking-tight">Monteerly</span>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-4">
               {/* Mobile Quick Action (FAB) Placeholder for Mobile View */}
               <button className="md:hidden w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <Plus size={18} />
               </button>

               <div className="hidden md:block text-sm text-slate-300 hover:text-white cursor-pointer transition-colors">السوق</div>
               <div className="hidden md:block text-sm text-slate-300 hover:text-white cursor-pointer transition-colors">الأسعار</div>
               
               <NotificationDropdown />

               <Link href="/dashboard">
                  <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 h-9 hidden md:flex">
                     <User size={16} className="mr-2" /> دخول
                  </Button>
               </Link>
               <button className="md:hidden text-white"><Menu size={24} /></button>
            </div>
         </div>
      </nav>
    </>
  );
}
