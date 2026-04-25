'use client';
import React from 'react';
import { Plus, Video, FileText, DollarSign, Upload, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  context: 'studio' | 'finance' | 'dashboard' | 'team';
}

export function ContextShortcutsBar({ context }: Props) {
  const shortcuts = {
    dashboard: [
      { icon: Plus, label: 'مشروع جديد' },
      { icon: DollarSign, label: 'إيداع أموال' },
    ],
    studio: [
      { icon: Upload, label: 'رفع ميديا' },
      { icon: Video, label: 'تسجيل شاشة' },
      { icon: Users, label: 'دعوة محرر' },
    ],
    finance: [
      { icon: FileText, label: 'إصدار فاتورة' },
      { icon: DollarSign, label: 'سحب أرباح' },
    ],
    team: [
       { icon: Users, label: 'عضو جديد' },
       { icon: FileText, label: 'عقد توظيف' },
    ]
  }[context] || [];

  return (
    <div className="mb-8">
       <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 px-1">إجراءات سريعة ({context})</h3>
       <div className="flex flex-wrap gap-3">
          {shortcuts.map((action, i) => (
             <motion.button
               key={i}
               whileHover={{ scale: 1.02, y: -2 }}
               whileTap={{ scale: 0.98 }}
               className="flex items-center gap-2 px-4 py-3 bg-slate-900 border border-white/10 rounded-xl hover:bg-indigo-600 hover:border-indigo-500 transition-colors text-sm font-bold text-white shadow-lg"
             >
                <action.icon size={16} />
                {action.label}
             </motion.button>
          ))}
          <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-dashed border-white/20 text-slate-500 hover:text-white hover:border-white/40 transition-colors">
             <Plus size={16} />
          </button>
       </div>
    </div>
  );
}

