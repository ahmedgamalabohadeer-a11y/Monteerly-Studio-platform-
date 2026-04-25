'use client';
import React from 'react';
import { Search, Briefcase, MapPin, DollarSign, Download, ExternalLink } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function TalentSearch() {
  const talents = [
    { id: 1, name: 'سارة العمري', role: 'Senior Video Editor', exp: '7 Years', location: 'Riyadh, SA', salary: '$3k - $5k', status: 'Open to work', skills: ['Premiere', 'After Effects', 'DaVinci'] },
    { id: 2, name: 'خالد يوسف', role: 'Motion Designer', exp: '4 Years', location: 'Cairo, EG', salary: '$1.5k - $2.5k', status: 'Freelance Only', skills: ['Cinema 4D', 'Blender', 'Unreal'] },
    { id: 3, name: 'ليلى أحمد', role: 'Sound Engineer', exp: '5 Years', location: 'Dubai, UAE', salary: '$4k+', status: 'Open to work', skills: ['Pro Tools', 'Audition'] },
  ];

  return (
    <div className="space-y-6">
       {/* Search Filters */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <div className="md:col-span-2 relative">
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="ابحث عن مهارة، اسم، أو مسمى وظيفي..." className="w-full bg-black/30 border border-white/10 rounded-lg pr-9 pl-3 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
             </div>
             <div>
                <select className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-3 text-sm text-slate-300 focus:outline-none">
                   <option>الكل (الموقع)</option>
                   <option>الرياض</option>
                   <option>دبي</option>
                   <option>القاهرة</option>
                </select>
             </div>
             <div>
                <select className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-3 text-sm text-slate-300 focus:outline-none">
                   <option>الحالة الوظيفية</option>
                   <option>متاح للعمل (Full-time)</option>
                   <option>مستقل فقط (Freelance)</option>
                </select>
             </div>
          </div>
       </div>

       {/* Results */}
       <div className="space-y-4">
          {talents.map((talent) => (
             <div key={talent.id} className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-4 flex-1">
                   <Avatar size="lg" fallback={talent.name[0]} />
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                         <h3 className="text-lg font-bold text-white">{talent.name}</h3>
                         {talent.status === 'Open to work' && (
                            <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-0.5 rounded border border-green-500/20 font-bold uppercase">Mawhub Verified</span>
                         )}
                      </div>
                      <p className="text-indigo-400 font-medium text-sm mb-2">{talent.role}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                         <span className="flex items-center gap-1"><Briefcase size={12}/> {talent.exp}</span>
                         <span className="flex items-center gap-1"><MapPin size={12}/> {talent.location}</span>
                         <span className="flex items-center gap-1"><DollarSign size={12}/> {talent.salary}</span>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto">
                   <div className="flex gap-2 mb-2">
                      {talent.skills.map(skill => (
                         <span key={skill} className="bg-white/5 px-2 py-1 rounded text-[10px] text-slate-300 border border-white/5">{skill}</span>
                      ))}
                   </div>
                   <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 border-white/10 text-slate-300 gap-2"><Download size={14}/> CV</Button>
                      <Button size="sm" className="flex-1 bg-white text-black hover:bg-slate-200 font-bold gap-2"><ExternalLink size={14}/> تواصل</Button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################