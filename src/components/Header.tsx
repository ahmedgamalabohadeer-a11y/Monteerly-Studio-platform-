"use client";
import { Bell, Search, Menu } from "lucide-react";
export default function Header() {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6 mr-0 md:mr-64 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 hover:bg-accent rounded-md"><Menu size={20} /></button>
        <h1 className="text-lg font-semibold hidden sm:block">لوحة التحكم</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input type="text" placeholder="بحث..." className="h-9 w-64 rounded-full border border-input bg-muted/50 pr-10 pl-4 text-sm outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <button className="relative p-2 hover:bg-accent rounded-full"><Bell size={20} className="text-muted-foreground" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span></button>
      </div>
    </header>
  );
}
