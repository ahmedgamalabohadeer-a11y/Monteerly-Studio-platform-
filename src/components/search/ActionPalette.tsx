'use client';
import React, { useState, useEffect } from 'react';
import { Command, Moon, Sun, FolderPlus, LogOut, User, Settings } from 'lucide-react';

export function ActionPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!isOpen) return null;

  const actions = [
    { id: 'new-folder', label: 'Create New Folder', icon: FolderPlus, section: 'General' },
    { id: 'theme-toggle', label: 'Toggle Dark/Light Mode', icon: Moon, section: 'Appearance' },
    { id: 'profile', label: 'Go to Profile', icon: User, section: 'Navigation' },
    { id: 'settings', label: 'Open Settings', icon: Settings, section: 'Navigation' },
    { id: 'logout', label: 'Log Out', icon: LogOut, section: 'Account' },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[10002] bg-black/50 backdrop-blur-[1px] flex items-start justify-center pt-[20vh]" onClick={() => setIsOpen(false)}>
       <div 
          className="bg-card w-full max-w-xl rounded-xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
       >
          <div className="flex items-center gap-3 p-4 border-b border-border">
             <Command className="text-muted-foreground" size={20} />
             <input 
                autoFocus
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
             />
             <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                ESC
             </kbd>
          </div>

          <div className="max-h-[300px] overflow-y-auto p-2">
             {filtered.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">No commands found.</div>
             ) : (
                filtered.map((action) => (
                   <button 
                      key={action.id}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-left group"
                      onClick={() => { console.log('Action:', action.id); setIsOpen(false); }}
                   >
                      <action.icon size={18} className="text-muted-foreground group-hover:text-primary" />
                      <span className="flex-1 text-sm font-medium">{action.label}</span>
                      <span className="text-[10px] text-muted-foreground capitalize">{action.section}</span>
                   </button>
                ))
             )}
          </div>
          
          <div className="bg-muted/50 p-2 border-t border-border text-[10px] text-muted-foreground flex justify-between px-4">
             <span>Pro Tip: Use ↑↓ to navigate</span>
             <span>Monteerly OS v1.0</span>
          </div>
       </div>
    </div>
  );
}

################################################################################