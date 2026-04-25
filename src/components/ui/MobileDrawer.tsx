'use client';
import React from 'react';
import { X } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function MobileDrawer({ isOpen, onClose, title, children }: MobileDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl p-6 z-[70] transition-transform duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'} shadow-2xl border-t border-border max-h-[85vh] overflow-y-auto`}>
         <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6" />
         
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{title}</h3>
            <button onClick={onClose} className="p-2 bg-muted rounded-full hover:bg-muted/80"><X size={20} /></button>
         </div>

         <div className="space-y-4">
            {children}
         </div>
      </div>
    </>
  );
}

################################################################################