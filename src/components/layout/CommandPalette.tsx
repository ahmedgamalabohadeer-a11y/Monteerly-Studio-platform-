'use client';
import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, FilePlus, User, CreditCard, Settings } from 'lucide-react';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] animate-in fade-in duration-100">
      <div className="w-full max-w-xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh]">
        
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input 
            className="w-full bg-transparent border-none p-4 text-lg outline-none placeholder:text-muted-foreground"
            placeholder="اكتب أمراً أو ابحث... (Ctrl+K)"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => setIsOpen(false)} className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">Esc</button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-2">
           <MenuGroup title="إجراءات سريعة">
              <CommandItem icon={FilePlus} label="إنشاء مشروع جديد" shortcut="N" />
              <CommandItem icon={User} label="دعوة عضو للفريق" />
              <CommandItem icon={CreditCard} label="سحب الأرباح" />
           </MenuGroup>

           <MenuGroup title="انتقل إلى">
              <CommandItem icon={ArrowRight} label="السوق (Marketplace)" />
              <CommandItem icon={Settings} label="الإعدادات العامة" shortcut="S" />
              <CommandItem icon={ArrowRight} label="محفظتي" />
           </MenuGroup>
        </div>

        {/* Footer */}
        <div className="p-2 bg-muted/20 border-t border-border text-xs text-center text-muted-foreground">
           استخدم الأسهم للتنقل و Enter للاختيار
        </div>
      </div>
    </div>
  );
}

function MenuGroup({ title, children }: any) {
    return (
        <div className="mb-2">
            <h4 className="px-3 py-2 text-xs font-bold text-muted-foreground">{title}</h4>
            {children}
        </div>
    )
}

function CommandItem({ icon: Icon, label, shortcut }: any) {
    return (
        <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-left group">
            <div className="flex items-center gap-3">
                <Icon size={18} className="text-muted-foreground group-hover:text-primary" />
                <span className="text-sm font-medium">{label}</span>
            </div>
            {shortcut && <span className="text-xs bg-background border border-border px-1.5 rounded text-muted-foreground">{shortcut}</span>}
        </button>
    )
}
