'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
       <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-xl">
          <Icon size={32} className="text-slate-500" />
       </div>
       <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
       <p className="text-slate-400 max-w-sm mb-8">{description}</p>
       
       {actionLabel && (
          <Button onClick={onAction} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
             {actionLabel}
          </Button>
       )}
    </div>
  );
}
