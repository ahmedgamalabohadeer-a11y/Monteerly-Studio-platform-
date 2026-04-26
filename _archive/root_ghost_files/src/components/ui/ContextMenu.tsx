'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Trash2, Edit2, Share2, Copy, FolderPlus, Download } from 'lucide-react';

export function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Check if the target is a file/folder item (using data-attribute simulation)
      const target = (e.target as HTMLElement).closest('[data-context-menu]');
      if (target) {
        e.preventDefault();
        setVisible(true);
        setPosition({ x: e.pageX, y: e.pageY });
      } else {
        setVisible(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!visible) return null;

  return (
    <div 
       ref={menuRef}
       className="fixed z-[9999] w-56 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
       style={{ top: position.y, left: position.x }}
    >
       <div className="p-1 space-y-0.5">
          <MenuItem icon={Edit2} label="إعادة تسمية" shortcut="F2" />
          <MenuItem icon={Copy} label="إنشاء نسخة" shortcut="Ctrl+D" />
          <MenuItem icon={Share2} label="مشاركة الرابط" />
          <MenuItem icon={Download} label="تحميل" />
          <div className="h-[1px] bg-border my-1" />
          <MenuItem icon={FolderPlus} label="مجلد جديد" />
          <div className="h-[1px] bg-border my-1" />
          <MenuItem icon={Trash2} label="حذف" color="text-red-500 hover:bg-red-50" shortcut="Del" />
       </div>
    </div>
  );
}

function MenuItem({ icon: Icon, label, shortcut, color }: any) {
    return (
        <button className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors ${color || 'text-foreground'}`}>
            <div className="flex items-center gap-2">
               <Icon size={14} />
               <span>{label}</span>
            </div>
            {shortcut && <span className="text-[10px] text-muted-foreground font-mono">{shortcut}</span>}
        </button>
    )
}

################################################################################