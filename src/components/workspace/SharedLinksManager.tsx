'use client';
import React, { useState } from 'react';
import { Link, Eye, Calendar, Trash2, Power } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function SharedLinksManager() {
  const [links, setLinks] = useState([
    { id: 1, name: 'Review: Pepsi Ad v3', url: 'monteerly.com/r/xk9s', views: 12, created: '2026-01-12', active: true },
    { id: 2, name: 'Final: Real Estate Project', url: 'monteerly.com/r/pm2z', views: 45, created: '2026-01-10', active: true },
    { id: 3, name: 'Draft: Vlog Intro', url: 'monteerly.com/r/ab12', views: 3, created: '2026-01-05', active: false },
  ]);

  const toggleStatus = (id: number) => {
    setLinks(links.map(l => l.id === id ? { ...l, active: !l.active } : l));
  };

  const deleteLink = (id: number) => {
    setLinks(links.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
             <h3 className="font-bold text-lg">الروابط المشاركة</h3>
             <p className="text-sm text-muted-foreground">إدارة الروابط الخارجية التي أنشأتها للمراجعة.</p>
          </div>
       </div>

       <div className="space-y-3">
          {links.map((link) => (
             <div key={link.id} className={`flex items-center justify-between p-4 border rounded-xl bg-card transition-all ${!link.active ? 'opacity-60 border-dashed' : 'border-border'}`}>
                <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-full ${link.active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <Link size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-sm flex items-center gap-2">
                         {link.name}
                         {!link.active && <span className="text-[10px] bg-red-100 text-red-600 px-2 rounded-full">معطل</span>}
                      </h4>
                      <p className="text-xs text-muted-foreground font-mono mt-1">{link.url}</p>
                   </div>
                </div>

                <div className="flex items-center gap-6">
                   <div className="text-center">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-bold"><Eye size={12} /> {link.views}</div>
                      <div className="text-[10px] text-muted-foreground">مشاهدة</div>
                   </div>
                   <div className="text-center hidden md:block">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-bold"><Calendar size={12} /> {link.created}</div>
                      <div className="text-[10px] text-muted-foreground">تاريخ الإنشاء</div>
                   </div>
                   
                   <div className="flex items-center gap-2 border-r border-border pr-4 mr-2">
                      <button 
                         onClick={() => toggleStatus(link.id)}
                         className={`p-2 rounded-lg hover:bg-muted ${link.active ? 'text-emerald-500' : 'text-slate-400'}`}
                         title={link.active ? 'تعطيل الرابط' : 'تفعيل الرابط'}
                      >
                         <Power size={18} />
                      </button>
                      <button 
                         onClick={() => deleteLink(link.id)}
                         className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                         title="حذف نهائي"
                      >
                         <Trash2 size={18} />
                      </button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
