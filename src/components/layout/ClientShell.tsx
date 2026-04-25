'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { PowerFab } from '../gamification/PowerFab';

export const ClientShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  // لا تظهر القائمة الجانبية في صفحة الهبوط أو تسجيل الدخول
  const isPublicPage = pathname === '/ar' || pathname === '/ar/login' || pathname === '/en';

  return (
    <div className="min-h-screen bg-brand-dark text-white font-tajawal">
      {!isPublicPage && <Sidebar />}
      
      <main className={`transition-all duration-300 ${!isPublicPage ? 'md:mr-64' : ''}`}>
        {children}
      </main>

      {!isPublicPage && <PowerFab />}
    </div>
  );
};

################################################################################