'use client';
import React, { useState } from 'react';
import { MapPin, Clock, Sun, CloudRain, Send, Users, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CallSheetBuilder() {
  const [weather, setWeather] = useState({ temp: '24°C', condition: 'Sunny', icon: Sun });

  const crew = [
    { role: 'Director', name: 'Ahmed Kamal', callTime: '07:00 AM', status: 'Confirmed' },
    { role: 'DOP', name: 'Sarah Ali', callTime: '07:00 AM', status: 'Confirmed' },
    { role: 'Sound', name: 'Khaled Omar', callTime: '08:30 AM', status: 'Pending' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       {/* The Sheet Preview */}
       <div className="lg:col-span-2 bg-white text-black rounded-xl overflow-hidden shadow-2xl font-serif">
          {/* Header */}
          <div className="bg-black text-white p-6 flex justify-between items-start">
             <div>
                <h2 className="text-3xl font-bold uppercase tracking-widest mb-1">Call Sheet</h2>
                <div className="text-sm text-slate-400">Day 4 of 12 • Saturday, Jan 17</div>
             </div>
             <div className="text-right">
                <div className="font-bold text-xl">PROJECT: DESERT STORM</div>
                <div className="text-xs text-slate-400">Prod Office: +966 55 123 4567</div>
             </div>
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-2 border-b border-black">
             <div className="p-4 border-r border-black">
                <div className="text-[10px] font-bold uppercase tracking-wider mb-1">General Call Time</div>
                <div className="text-4xl font-black">07:00 AM</div>
             </div>
             <div className="p-4 flex items-center justify-between">
                <div>
                   <div className="text-[10px] font-bold uppercase tracking-wider mb-1">Weather</div>
                   <div className="text-xl font-bold flex items-center gap-2">
                      <weather.icon size={24} /> {weather.temp}
                   </div>
                   <div className="text-xs">{weather.condition} • Sunset: 17:45</div>
                </div>
             </div>
          </div>

          {/* Location */}
          <div className="p-4 border-b border-black bg-slate-50">
             <div className="text-[10px] font-bold uppercase tracking-wider mb-2">Location</div>
             <div className="flex items-start gap-3">
                <div className="p-2 bg-black text-white rounded">
                   <MapPin size={20} />
                </div>
                <div>
                   <div className="font-bold">Al-Ula Heritage Site, Zone B</div>
                   <div className="text-xs text-slate-600">Near Elephant Rock. Parking available at Gate 2.</div>
                   <a href="#" className="text-xs text-blue-600 underline font-bold">Open in Maps</a>
                </div>
             </div>
          </div>

          {/* Schedule */}
          <div className="p-4 border-b border-black">
             <div className="text-[10px] font-bold uppercase tracking-wider mb-2">Shooting Schedule</div>
             <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 uppercase font-bold">
                   <tr>
                      <th className="p-2">Scene</th>
                      <th className="p-2">Set / Description</th>
                      <th className="p-2">Cast</th>
                      <th className="p-2">Pages</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                   <tr>
                      <td className="p-2 font-bold">4A</td>
                      <td className="p-2">INT. TENT - DAY<br/><span className="italic text-slate-500">Hero meets the wise man.</span></td>
                      <td className="p-2">1, 4</td>
                      <td className="p-2">2/8</td>
                   </tr>
                   <tr>
                      <td className="p-2 font-bold">4B</td>
                      <td className="p-2">EXT. DESERT - SUNSET<br/><span className="italic text-slate-500">The journey begins.</span></td>
                      <td className="p-2">1</td>
                      <td className="p-2">4/8</td>
                   </tr>
                </tbody>
             </table>
          </div>

          {/* Crew Call */}
          <div className="p-4">
             <div className="text-[10px] font-bold uppercase tracking-wider mb-2">Crew Call</div>
             <div className="space-y-2">
                {crew.map((c, i) => (
                   <div key={i} className="flex justify-between items-center text-xs border-b border-slate-100 pb-1 last:border-0">
                      <div className="flex items-center gap-2">
                         <span className="font-bold w-20">{c.role}</span>
                         <span>{c.name}</span>
                      </div>
                      <div className="font-mono font-bold">{c.callTime}</div>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* Controls */}
       <div className="space-y-6">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-4">توزيع الأمر (Distribution)</h3>
             <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-white/5">
                   <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Users size={16} /> إجمالي الطاقم
                   </div>
                   <span className="font-bold text-white">45 شخص</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-white/5">
                   <div className="flex items-center gap-2 text-sm text-slate-300">
                      <User size={16} /> تم التأكيد
                   </div>
                   <span className="font-bold text-green-400">38 شخص</span>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 gap-2 mt-4">
                   <Send size={18} /> إرسال عبر WhatsApp
                </Button>
                <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10">
                   تصدير PDF
                </Button>
             </div>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-2">تحديثات الطقس</h3>
             <p className="text-xs text-slate-400 mb-4">يتم التحديث تلقائياً بناءً على الموقع.</p>
             <div className="flex items-center gap-4 bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                <CloudRain className="text-blue-400" size={32} />
                <div>
                   <div className="text-sm font-bold text-white">احتمال أمطار خفيفة</div>
                   <div className="text-xs text-blue-300">الساعة 4:00 PM - يرجى تغطية المعدات.</div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

