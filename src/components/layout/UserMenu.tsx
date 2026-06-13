'use client';
import React from 'react';
import Link from 'next/link';
import { User, Settings, CreditCard, LogOut, HelpCircle } from 'lucide-react';

export function UserMenu() {
  return (
    <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-2">
       
       <div className="p-3 border-b border-border bg-muted/30">
          <p className="font-bold text-sm">أحمد جمال</p>
          <p className="text-xs text-muted-foreground truncate">ahmed@monteerly.com</p>
       </div>

       <div className="p-2 space-y-1">
          <MenuItem href="/profile" icon={User} label="الملف الشخصي" />
          <MenuItem href="/wallet" icon={CreditCard} label="المحفظة والفواتير" />
          <MenuItem href="/settings" icon={Settings} label="الإعدادات" />
       </div>

       <div className="p-2 border-t border-border space-y-1">
          <MenuItem href="/help" icon={HelpCircle} label="المساعدة" />
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
             <LogOut size={16} />
             <span>تسجيل الخروج</span>
          </button>
       </div>
    </div>
  );
}

function MenuItem({ href, icon: Icon, label }: unknown) {
    return (
        <Link href={href} className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
            <Icon size={16} className="text-muted-foreground" />
            <span>{label}</span>
        </Link>
    )
}

