'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Folder, Wallet, ShoppingBag, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'الرئيسية', href: '/dashboard', icon: Home },
  { name: 'مشاريعي', href: '/projects', icon: Folder },
  { name: 'المحفظة', href: '/wallet', icon: Wallet },
  { name: 'السوق', href: '/marketplace', icon: ShoppingBag },
  { name: 'الإعدادات', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col h-full">
      {/* Brand Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
         <Image src="/images/monteerly/monteerly_02_main_logo_full.svg" width={32} height={32} alt="Logo" />
         <span className="font-bold text-lg mr-3">Monteerly</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.includes(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
          <LogOut size={20} />
          تسجيل خروج
        </button>
      </div>
    </aside>
  );
}
