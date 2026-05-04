import React from 'react';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
}

export default function EmptyState({ icon, title, description, actionText, actionLink }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-900/50 border border-slate-800 border-dashed rounded-3xl">
      <div className="bg-slate-950 p-4 rounded-full mb-6 border border-slate-800 text-slate-500 shadow-inner">
        {icon || <FileQuestion className="w-12 h-12" />}
      </div>
      <h3 className="text-xl font-black text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">{description}</p>
      
      {actionText && actionLink && (
        <Link href={actionLink} className="bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 border border-indigo-500/30 px-6 py-3 rounded-xl font-bold transition-all">
          {actionText}
        </Link>
      )}
    </div>
  );
}
