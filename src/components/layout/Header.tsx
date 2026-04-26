'use client';
import React, { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { NotificationDropdown } from './NotificationDropdown';
import { MobileDrawer } from '@/components/ui/MobileDrawer';
import { Sidebar } from './Sidebar'; // Importing sidebar for mobile drawer content reuse if needed

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="h-16 bg-background/80 backdrop-blur border-b border-border sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
       
       {/* Mobile Menu Trigger */}
       <button className="md:hidden p-2 -mr-2" onClick={() => setShowMobileMenu(true)}>
          <Menu size={24} />
       </button>

       {/* Search Bar */}
       <div className="hidden md:flex items-center relative max-w-md w-full ml-4">
          <Search className="absolute right-3 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="بحث عن مشروع، ملف، أو مبدع..." 
            className="w-full bg-muted/50 border-none rounded-full py-2 pr-10 pl-4 text-sm focus:ring-2 focus:ring-primary outline-none"
          />
       </div>

       {/* Right Actions */}
       <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
             <button 
               onClick={() => setShowNotifications(!showNotifications)}
               className="p-2 rounded-full hover:bg-muted relative text-muted-foreground hover:text-foreground transition-colors"
             >
                <Bell size={20} />
                <span className="absolute top-2 left-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background" />
             </button>
             {showNotifications && <NotificationDropdown />}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
             <div className="text-left hidden md:block">
                <p className="text-sm font-bold">أحمد جمال</p>
                <p className="text-[10px] text-muted-foreground">صانع محتوى</p>
             </div>
             <Avatar src="/images/avatar_placeholder.png" fallback="AJ" />
          </div>
       </div>

       {/* Mobile Menu Drawer */}
       <MobileDrawer isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} title="القائمة">
          <div className="flex flex-col gap-2">
             <LinkItem href="/dashboard" label="الرئيسية" />
             <LinkItem href="/projects" label="مشاريعي" />
             <LinkItem href="/wallet" label="المحفظة" />
             <LinkItem href="/settings" label="الإعدادات" />
          </div>
       </MobileDrawer>
    </header>
  );
}

function LinkItem({ href, label }: any) {
   return (
      <a href={href} className="block w-full p-4 bg-muted/30 rounded-xl font-bold hover:bg-primary/10 hover:text-primary transition-colors">
         {label}
      </a>
   );
}

