'use client';
import React from 'react';
import { MoreVertical, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

interface ProjectCardProps {
  title: string;
  clientName: string;
  dueDate: string;
  progress: number;
  status: 'active' | 'completed' | 'review';
}

export function ProjectCard({ title, clientName, dueDate, progress, status }: ProjectCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer group">
       <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3 items-center">
             <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
                {title.charAt(0)}
             </div>
             <div>
                <h3 className="font-bold text-base group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-xs text-muted-foreground">{clientName}</p>
             </div>
          </div>
          <button className="text-muted-foreground hover:text-foreground"><MoreVertical size={18} /></button>
       </div>

       <div className="space-y-3">
          <div className="flex justify-between text-xs font-medium">
             <span className="text-muted-foreground">التقدم</span>
             <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
             <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </div>
       </div>

       <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
          <div className="flex -space-x-2 space-x-reverse">
             <Avatar size="sm" fallback="A" />
             <Avatar size="sm" fallback="B" />
          </div>
          
          <div className="flex items-center gap-2">
             {status === 'active' && <Badge variant="primary">جاري العمل</Badge>}
             {status === 'review' && <Badge variant="warning">مراجعة</Badge>}
             {status === 'completed' && <Badge variant="success">مكتمل</Badge>}
             
             <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-md">
                <Clock size={12} /> {dueDate}
             </div>
          </div>
       </div>
    </div>
  );
}

