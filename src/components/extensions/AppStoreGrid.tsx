'use client';
import React, { useState } from 'react';
import { Download, Star, Puzzle, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AppStoreGrid() {
  const [installed, setInstalled] = useState<number[]>([1]);

  const apps = [
    { id: 1, name: 'Frame.io Sync', developer: 'Adobe', rating: 4.8, downloads: '50k+', desc: 'Sync comments directly to your timeline.', icon: 'F', color: 'bg-purple-600' },
    { id: 2, name: 'Auto-Subtitles Pro', developer: 'AI Labs', rating: 4.5, downloads: '12k+', desc: 'Generate captions in 50 languages instantly.', icon: 'S', color: 'bg-green-600' },
    { id: 3, name: 'Epidemic Sound', developer: 'Epidemic', rating: 4.9, downloads: '80k+', desc: 'Access 30,000+ tracks directly in the editor.', icon: 'E', color: 'bg-red-600' },
    { id: 4, name: 'Slack Notify', developer: 'Slack', rating: 4.2, downloads: '25k+', desc: 'Get notified when a render is complete.', icon: '#', color: 'bg-blue-600' },
    { id: 5, name: 'Notion Planner', developer: 'Notion', rating: 4.7, downloads: '10k+', desc: 'Embed your project roadmap.', icon: 'N', color: 'bg-black' },
    { id: 6, name: 'Dropbox Sync', developer: 'Dropbox', rating: 4.3, downloads: '40k+', desc: 'Two-way sync for heavy raw files.', icon: 'D', color: 'bg-blue-500' },
  ];

  const toggleInstall = (id: number) => {
    if (installed.includes(id)) {
       setInstalled(installed.filter(i => i !== id));
    } else {
       setInstalled([...installed, id]);
    }
  };

  return (
    <div className="space-y-8">
       {/* Featured Banner */}
       <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 flex items-center justify-between relative overflow-hidden border border-white/10">
          <div className="relative z-10">
             <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded mb-2 inline-block">FEATURED APP</span>
             <h2 className="text-3xl font-bold text-white mb-2">DaVinci Resolve Connect</h2>
             <p className="text-indigo-200 max-w-md mb-6">
                قم بربط سيرفرات Monteerly مباشرة مع DaVinci Resolve للعمل التعاوني (Remote Grading) بدقة 10-bit.
             </p>
             <Button className="bg-white text-indigo-900 font-bold hover:bg-indigo-50">تثبيت الآن</Button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
          <Puzzle size={180} className="absolute -right-10 -bottom-10 text-white/5 rotate-12" />
       </div>

       {/* Search & Categories */}
       <div className="flex gap-4">
          <div className="relative flex-1">
             <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
             <input type="text" placeholder="ابحث عن أدوات، إضافات، ومحركات AI..." className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pr-12 pl-4 text-white focus:border-indigo-500 outline-none" />
          </div>
          <select className="bg-slate-900 border border-white/10 rounded-xl px-4 text-slate-300 outline-none">
             <option>كل الفئات</option>
             <option>الإنتاجية</option>
             <option>الذكاء الاصطناعي</option>
             <option>الموارد (Assets)</option>
          </select>
       </div>

       {/* Apps Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
             <div key={app.id} className="bg-slate-900 border border-white/10 rounded-xl p-5 hover:border-indigo-500/50 transition-all group">
                <div className="flex justify-between items-start mb-4">
                   <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                      {app.icon}
                   </div>
                   <button 
                     onClick={() => toggleInstall(app.id)}
                     className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        installed.includes(app.id) 
                        ? 'bg-white/10 text-slate-300 hover:bg-red-500/20 hover:text-red-400' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                     }`}
                   >
                      {installed.includes(app.id) ? 'إزالة' : 'تثبيت'}
                   </button>
                </div>
                
                <h3 className="font-bold text-white text-lg mb-1">{app.name}</h3>
                <p className="text-xs text-slate-400 mb-3">by {app.developer}</p>
                <p className="text-sm text-slate-300 mb-4 h-10 line-clamp-2">{app.desc}</p>
                
                <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-white/5 pt-3">
                   <span className="flex items-center gap-1 text-yellow-400"><Star size={12} fill="currentColor"/> {app.rating}</span>
                   <span className="flex items-center gap-1"><Download size={12}/> {app.downloads}</span>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

