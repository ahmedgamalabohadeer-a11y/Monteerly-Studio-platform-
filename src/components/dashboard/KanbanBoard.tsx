'use client';
import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';

export function KanbanBoard() {
  return (
    <div className="flex overflow-x-auto gap-6 pb-4 h-[calc(100vh-200px)]">
       <KanbanColumn title="قيد الانتظار (To Do)" count={2} color="bg-slate-100 dark:bg-slate-800">
          <KanbanItem title="تعديل فيديو العقارات" client="شركة إعمار" tag="تصحيح ألوان" />
          <KanbanItem title="إنترو يوتيوب" client="قناة التقنية" tag="3D" />
       </KanbanColumn>

       <KanbanColumn title="جاري العمل (In Progress)" count={1} color="bg-blue-50 dark:bg-blue-900/20">
          <KanbanItem title="إعلان بيبسي" client="Pepsi Co" tag="مونتاج" active />
       </KanbanColumn>

       <KanbanColumn title="مراجعة (Review)" count={1} color="bg-yellow-50 dark:bg-yellow-900/20">
          <KanbanItem title="وثائقي قصير" client="الجزيرة" tag="صوتيات" />
       </KanbanColumn>

       <KanbanColumn title="مكتمل (Done)" count={5} color="bg-emerald-50 dark:bg-emerald-900/20">
          <KanbanItem title="Reels لمتجر ملابس" client="Zara" tag="Social" />
       </KanbanColumn>
    </div>
  );
}

function KanbanColumn({ title, count, children, color }: any) {
    return (
        <div className={`min-w-[280px] w-80 rounded-xl p-4 flex flex-col gap-3 ${color}`}>
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-sm">{title} <span className="opacity-50">({count})</span></h4>
                <button className="text-muted-foreground hover:text-foreground"><Plus size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {children}
            </div>
        </div>
    )
}

function KanbanItem({ title, client, tag, active }: any) {
    return (
        <div className={`bg-card p-3 rounded-lg shadow-sm border cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${active ? 'border-primary ring-1 ring-primary/20' : 'border-border'}`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-bold text-muted-foreground">{tag}</span>
                <button className="text-muted-foreground"><MoreHorizontal size={14} /></button>
            </div>
            <h5 className="font-bold text-sm mb-1">{title}</h5>
            <p className="text-xs text-muted-foreground">{client}</p>
        </div>
    )
}
