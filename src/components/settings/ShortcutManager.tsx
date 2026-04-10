'use client';
import React, { useState } from 'react';
import { Keyboard, RotateCcw, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Shortcut {
  id: string;
  action: string;
  keys: string[];
}

export function ShortcutManager() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([
    { id: 'play', action: 'تشغيل / إيقاف', keys: ['Space'] },
    { id: 'split', action: 'قص الكليب (Split)', keys: ['C'] },
    { id: 'marker', action: 'إضافة علامة (Marker)', keys: ['M'] },
    { id: 'undo', action: 'تراجع', keys: ['Ctrl', 'Z'] },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    e.preventDefault();
    const keys: string[] = [];
    if (e.ctrlKey) keys.push('Ctrl');
    if (e.shiftKey) keys.push('Shift');
    if (e.altKey) keys.push('Alt');
    if (e.key !== 'Control' && e.key !== 'Shift' && e.key !== 'Alt') {
      keys.push(e.key.toUpperCase());
    }
    
    if (keys.length > 0) {
      setShortcuts(prev => prev.map(s => s.id === id ? { ...s, keys } : s));
      setEditingId(null);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
       <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10">
          <div className="flex items-center gap-2">
             <Keyboard size={18} />
             <h3 className="font-bold text-sm">تخصيص لوحة المفاتيح</h3>
          </div>
          <Button size="sm" variant="ghost" className="text-xs" icon={<RotateCcw size={12} />}>استعادة الافتراضي</Button>
       </div>

       <div className="divide-y divide-border">
          {shortcuts.map((shortcut) => (
             <div key={shortcut.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <span className="text-sm font-medium">{shortcut.action}</span>
                
                <div className="flex items-center gap-3">
                   {editingId === shortcut.id ? (
                      <div className="relative">
                         <input 
                            autoFocus
                            readOnly
                            value="اضغط المفاتيح الآن..."
                            onKeyDown={(e) => handleKeyDown(e, shortcut.id)}
                            onBlur={() => setEditingId(null)}
                            className="bg-primary/10 border border-primary text-primary text-xs px-3 py-1.5 rounded outline-none w-32 text-center animate-pulse"
                         />
                      </div>
                   ) : (
                      <div className="flex gap-1" onClick={() => setEditingId(shortcut.id)}>
                         {shortcut.keys.map((k, i) => (
                            <kbd key={i} className="bg-muted border border-border px-2 py-1 rounded text-xs font-mono font-bold min-w-[24px] text-center shadow-sm cursor-pointer hover:border-primary">
                               {k}
                            </kbd>
                         ))}
                      </div>
                   )}
                   <button 
                      onClick={() => setEditingId(shortcut.id)} 
                      className="text-muted-foreground hover:text-primary p-1"
                   >
                      <Edit3 size={14} />
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
