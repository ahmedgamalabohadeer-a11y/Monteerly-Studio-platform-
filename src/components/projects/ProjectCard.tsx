import React from 'react';
import Link from 'next/link';
import { Clock, CheckCircle2, MoreHorizontal, PlayCircle } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  status: 'active' | 'review' | 'completed';
  progress: number;
  thumbnail?: string;
  deadline: string;
}

export const ProjectCard = ({ id, title, status, progress, deadline }: ProjectCardProps) => {
  const statusColors = {
    active: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    review: 'text-brand-secondary bg-brand-secondary/10 border-brand-secondary/20',
    completed: 'text-brand-success bg-brand-success/10 border-brand-success/20'
  };

  const statusText = {
    active: 'قيد التنفيذ',
    review: 'مراجعة العميل',
    completed: 'مكتمل'
  };

  return (
    <div className="group bg-brand-surface rounded-2xl border border-gray-800 hover:border-brand-secondary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Thumbnail Area */}
      <div className="h-40 bg-gray-900 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent z-10"></div>
        <PlayCircle size={48} className="text-gray-700 group-hover:text-brand-secondary group-hover:scale-110 transition-all duration-300 relative z-20" />
        {/* Abstract Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className={`text-[10px] px-2 py-1 rounded-lg border font-bold ${statusColors[status]}`}>
            {statusText[status]}
          </span>
          <button className="text-gray-500 hover:text-white transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>

        <Link href={`/ar/projects/${id}`} className="block">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-secondary transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <Clock size={12} />
          <span>التسليم: {deadline}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${status === 'completed' ? 'bg-brand-success' : 'bg-brand-secondary'}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono">
          <span>التقدم</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

################################################################################