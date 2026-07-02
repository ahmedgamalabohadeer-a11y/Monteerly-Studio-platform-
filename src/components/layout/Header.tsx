'use client';

import React, { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { NotificationDropdown } from './NotificationDropdown';
import { MobileDrawer } from '@/components/ui/MobileDrawer';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur md:px-8">
      <button
        type="button"
        className="p-2 -mr-2 md:hidden"
        onClick={() => setShowMobileMenu(true)}
      >
        <Menu size={24} />
      </button>

      <div className="relative ml-4 hidden w-full max-w-md items-center md:flex">
        <Search className="absolute right-3 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="بحث عن مشروع، ملف، أو مبدع..."
          className="w-full rounded-full border-none bg-muted/50 py-2 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Bell size={20} />
            <span className="absolute left-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-background bg-red-500" />
          </button>

          {showNotifications && <NotificationDropdown />}
        </div>

        <div className="flex cursor-pointer items-center gap-3 hover:opacity-80">
          <div className="hidden text-left md:block">
            <p className="text-sm font-bold">أحمد جمال</p>
            <p className="text-[10px] text-muted-foreground">صانع محتوى</p>
          </div>
          <Avatar src="/images/avatar_placeholder.png" fallback="AJ" />
        </div>
      </div>

      <MobileDrawer
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        title="القائمة"
      >
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

type LinkItemProps = {
  href: string;
  label: string;
};

function LinkItem({ href, label }: LinkItemProps) {
  return (
    <a
      href={href}
      className="block w-full rounded-xl bg-muted/30 p-4 font-bold transition-colors hover:bg-primary/10 hover:text-primary"
    >
      {label}
    </a>
  );
}
