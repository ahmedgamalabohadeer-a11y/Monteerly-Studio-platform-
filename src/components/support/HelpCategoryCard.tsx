'use client';
import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface HelpProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  articles: string[];
}

export function HelpCategoryCard({ icon: Icon, title, desc, articles }: HelpProps) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-all group h-full">
       <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors text-white">
          <Icon size={24} />
       </div>
       <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
       <p className="text-sm text-slate-400 mb-6 h-10">{desc}</p>
       
       <div className="space-y-2">
          {articles.map((article, i) => (
             <a key={i} href="#" className="flex items-center justify-between text-sm text-slate-300 hover:text-white p-2 hover:bg-white/5 rounded transition-colors">
                {article}
                <ChevronRight size={14} className="text-slate-600" />
             </a>
          ))}
       </div>
    </div>
  );
}

################################################################################