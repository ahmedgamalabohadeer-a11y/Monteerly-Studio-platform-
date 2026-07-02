'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Menu, WifiOff, Plus } from 'lucide-react';
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
      {!isOnline && (
        <div className="fixed top-0 z-[100] w-full bg-red-600 py-1 text-center text-xs font-bold text-white animate-in slide-in-from-top-2">
          <span className="flex items-center justify-center gap-2">
            <WifiOff size={12} />
            أنت غير متصل بالإنترنت. يتم حفظ التغييرات محلياً.
          </span>
        </div>
      )}

      <nav
        className={`fixed ${
          !isOnline ? 'top-6' : 'top-0'
        } z-50 flex h-16 w-full items-center border-b border-white/10 bg-black/50 backdrop-blur-lg transition-all duration-300`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-black text-white transition-transform group-hover:scale-110">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Monteerly
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg md:hidden"
            >
              <Plus size={18} />
            </button>

            <div className="hidden cursor-pointer text-sm text-slate-300 transition-colors hover:text-white md:block">
              السوق
            </div>
            <div className="hidden cursor-pointer text-sm text-slate-300 transition-colors hover:text-white md:block">
              الأسعار
            </div>

            <NotificationDropdown />

            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden h-9 border-white/10 text-white hover:bg-white/10 md:flex"
              >
                <User size={16} className="mr-2" />
                دخول
              </Button>
            </Link>

            <button type="button" className="text-white md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
