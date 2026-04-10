'use client';
import React from 'react';
import { Bell, Search, Globe } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle'; // تأكد من وجود هذا الملف سابقاً أو سنقوم بإنشائه
import Image from 'next/image';

export function Topbar() {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg w-full max-w-md">
        <Search size={18} className="text-muted-foreground" />
        <input 
          type="text" 
          placeholder="ابحث عن مشروع، ملف، أو موهبة... (Cmd+K)" 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-muted rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>
        
        <ThemeToggle />
        
        <div className="h-8 w-[1px] bg-border mx-2" />
        
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold">أحمد جمال</p>
            <p className="text-xs text-muted-foreground">Studio Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 overflow-hidden relative">
             <Image src="/images/monteerly/monteerly_03_profile_ahmed_gamal_circle.png" alt="User" fill className="object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
