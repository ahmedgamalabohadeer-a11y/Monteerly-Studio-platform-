'use client';
import React from 'react';
import { MapPin, Star, Calendar, ShieldCheck, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function GearGrid() {
  const items = [
    { id: 1, name: 'Sony FX6 Cinema Line', category: 'Camera', price: '$150/day', location: 'Riyadh', rating: 4.9, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80', owner: 'ProRentals' },
    { id: 2, name: 'Aputure 600d Pro', category: 'Lighting', price: '$45/day', location: 'Dubai', rating: 5.0, image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=400&q=80', owner: 'Ahmed Light' },
    { id: 3, name: 'DJI Ronin RS3 Pro', category: 'Stabilizer', price: '$30/day', location: 'Cairo', rating: 4.8, image: 'https://images.unsplash.com/photo-1589873098338-92794324fb7b?auto=format&fit=crop&w=400&q=80', owner: 'CamHouse' },
    { id: 4, name: 'Red Komodo 6K', category: 'Camera', price: '$200/day', location: 'Jeddah', rating: 4.7, image: 'https://images.unsplash.com/photo-1564466021188-1e17010f5411?auto=format&fit=crop&w=400&q=80', owner: 'FilmGear' },
  ];

  return (
    <div>
       {/* Filters */}
       <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <Button variant="outline" className="bg-white/5 border-white/10 text-white rounded-full text-xs gap-2"><Filter size={14}/> كل الفئات</Button>
          <Button variant="outline" className="bg-slate-900 border-white/10 text-slate-400 hover:text-white rounded-full text-xs">كاميرات</Button>
          <Button variant="outline" className="bg-slate-900 border-white/10 text-slate-400 hover:text-white rounded-full text-xs">عدسات</Button>
          <Button variant="outline" className="bg-slate-900 border-white/10 text-slate-400 hover:text-white rounded-full text-xs">إضاءة</Button>
          <Button variant="outline" className="bg-slate-900 border-white/10 text-slate-400 hover:text-white rounded-full text-xs">صوت</Button>
       </div>

       {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
             <div key={item.id} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden group hover:border-indigo-500/50 transition-all">
                <div className="h-48 relative overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white flex items-center gap-1">
                      <Star size={10} className="text-yellow-400 fill-yellow-400" /> {item.rating}
                   </div>
                </div>
                
                <div className="p-4">
                   <div className="text-[10px] text-indigo-400 font-bold uppercase mb-1">{item.category}</div>
                   <h3 className="font-bold text-white mb-1 truncate">{item.name}</h3>
                   <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                      <MapPin size={12} /> {item.location} • {item.owner}
                   </div>
                   
                   <div className="flex justify-between items-center border-t border-white/5 pt-3">
                      <div>
                         <span className="font-bold text-white">{item.price}</span>
                      </div>
                      <Button size="sm" className="h-8 text-xs bg-white text-black hover:bg-slate-200 font-bold">
                         حجز
                      </Button>
                   </div>
                   
                   <div className="mt-2 flex items-center gap-1 text-[9px] text-green-500">
                      <ShieldCheck size={10} /> مؤمن ضد السرقة
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################