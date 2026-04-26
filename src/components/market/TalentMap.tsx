'use client';
import React, { useState } from 'react';
import { MapPin, Navigation, User } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

// ملاحظة: في الإنتاج الحقيقي، نستخدم مكتبة مثل 'react-leaflet' أو 'google-maps-react'
// هذا المكون يمثل واجهة المستخدم (UI Layer) للخريطة.

export function TalentMap() {
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const pins = [
    { id: 1, x: '45%', y: '30%', name: 'أحمد كمال', role: 'Drone Operator', price: '$200/day' },
    { id: 2, x: '60%', y: '50%', name: 'سارة علي', role: 'Event Videographer', price: '$150/day' },
    { id: 3, x: '40%', y: '60%', name: 'محمد حسن', role: 'Director', price: '$500/day' },
  ];

  return (
    <div className="relative w-full h-[600px] bg-slate-100 rounded-xl overflow-hidden border border-border group">
       {/* Map Placeholder Background */}
       <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-20 pointer-events-none" />
       
       <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur p-2 rounded-lg shadow-lg flex gap-2">
          <InputPlaceholder placeholder="ابحث عن مدينة..." />
          <Button size="sm" variant="primary" icon={<Navigation size={14} />}>موقعي</Button>
       </div>

       {/* Pins */}
       {pins.map((pin) => (
          <div 
            key={pin.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 hover:z-20"
            style={{ left: pin.x, top: pin.y }}
            onClick={() => setSelectedPin(pin.id)}
          >
             <div className={`p-2 rounded-full shadow-lg border-2 border-white ${selectedPin === pin.id ? 'bg-primary text-white scale-125' : 'bg-slate-900 text-white'}`}>
                <MapPin size={20} fill="currentColor" />
             </div>
             
             {/* Tooltip Card */}
             {selectedPin === pin.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-card rounded-xl shadow-2xl p-3 border border-border animate-in slide-in-from-bottom-2 z-30">
                   <div className="flex items-center gap-3 mb-2">
                      <Avatar size="sm" fallback={pin.name[0]} />
                      <div>
                         <p className="font-bold text-sm">{pin.name}</p>
                         <p className="text-xs text-muted-foreground">{pin.role}</p>
                      </div>
                   </div>
                   <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                      <span className="font-bold text-xs">{pin.price}</span>
                      <Button size="sm" variant="primary" className="h-6 text-xs">توظيف</Button>
                   </div>
                   {/* Arrow */}
                   <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-card" />
                </div>
             )}
          </div>
       ))}

       <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded text-xs text-muted-foreground">
          © Mapbox © OpenStreetMap
       </div>
    </div>
  );
}

function InputPlaceholder({ placeholder }: { placeholder: string }) {
    return <input className="px-3 py-1.5 rounded-md border border-gray-200 text-sm outline-none focus:border-primary" placeholder={placeholder} />
}

