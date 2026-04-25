'use client';
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { MobileHeader } from '@/components/dashboard/MobileHeader';
import { NotificationHub } from '@/components/notifications/NotificationHub';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* شريط الجوال العلوي */}
      <MobileHeader setIsOpen={setIsSidebarOpen} />

      {/* الشريط الجانبي (يدعم الجوال والحاسوب) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* شريط الأدوات العلوي (للحاسوب) ومركز التنبيهات */}
        <header className="h-16 border-b border-slate-800 hidden lg:flex items-center justify-end px-8 gap-4 bg-slate-950/50 backdrop-blur-md sticky top-0 z-[100]">
           <NotificationHub />
           <div className="w-8 h-8 rounded-full bg-indigo-600 border border-indigo-500/30 flex items-center justify-center font-bold text-xs">
              AG
           </div>
        </header>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
