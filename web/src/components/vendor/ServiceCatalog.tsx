'use client';
import React from 'react';
import { Mic, Languages, Edit3, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ServiceCatalog() {
  const services = [
    { id: 1, title: 'دبلجة احترافية (Dubbing)', price: '$15 / min', category: 'Audio', icon: Mic, active: true },
    { id: 2, title: 'ترجمة وتفريغ (Subtitling)', price: '$5 / min', category: 'Text', icon: Languages, active: true },
    { id: 3, title: 'تصحيح ألوان (Color Grading)', price: '$50 / min', category: 'Video', icon: Edit3, active: false },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white">كتالوج الخدمات</h3>
          <Button size="sm" className="bg-indigo-600 text-white gap-2">
             <Plus size={16} /> خدمة جديدة
          </Button>
       </div>

       <div className="space-y-4">
          {services.map((service) => (
             <div key={service.id} className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl hover:border-indigo-500/30 transition-all group">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                      <service.icon size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-white">{service.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                         <span className="bg-white/5 px-2 py-0.5 rounded">{service.category}</span>
                         <span>•</span>
                         <span className="text-green-400 font-mono">{service.price}</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${service.active ? 'bg-green-500' : 'bg-slate-500'}`} />
                      <span className="text-xs text-slate-400">{service.active ? 'نشط' : 'متوقف'}</span>
                   </div>
                   <button className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg">
                      <Settings size={18} />
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

