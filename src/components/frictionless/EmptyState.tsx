'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, PlayCircle, HelpCircle } from 'lucide-react';
import { InteractiveButton } from '@/components/system/InteractiveButton'; // Using our new system button
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel: string;
  onAction: () => void;
  secondaryLabel?: string;
}

export function EmptyState({ title, description, icon: Icon, actionLabel, onAction, secondaryLabel }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-white/10 rounded-2xl bg-slate-900/30">
       {/* Animated Icon Container */}
       <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ type: 'spring', duration: 0.8 }}
         className="w-24 h-24 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6 relative group"
       >
          <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-ping opacity-20" />
          <Icon size={40} className="text-indigo-400 group-hover:scale-110 transition-transform" />
       </motion.div>

       <motion.h3 
         initial={{ y: 10, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.1 }}
         className="text-xl font-bold text-white mb-2"
       >
          {title}
       </motion.h3>
       
       <motion.p 
         initial={{ y: 10, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.2 }}
         className="text-slate-400 max-w-md mb-8 leading-relaxed"
       >
          {description}
       </motion.p>

       <motion.div 
         initial={{ y: 10, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.3 }}
         className="flex gap-4"
       >
          <InteractiveButton onClick={onAction} icon={<Plus size={18} />}>
             {actionLabel}
          </InteractiveButton>
          
          {secondaryLabel && (
             <button className="text-sm font-bold text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
                <PlayCircle size={16} /> {secondaryLabel}
             </button>
          )}
       </motion.div>
    </div>
  );
}

################################################################################