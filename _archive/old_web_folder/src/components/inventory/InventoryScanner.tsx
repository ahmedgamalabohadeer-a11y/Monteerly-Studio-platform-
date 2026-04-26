'use client';
import React from 'react';
import { QrCode, Box, AlertTriangle, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function InventoryScanner() {
  const items = [
    { id: 'EQ-001', name: 'Sony FX6 Body', serial: 'SN-882190', status: 'In Stock', location: 'Shelf A-12', condition: 'Good' },
    { id: 'EQ-004', name: 'Canon 24-70mm f/2.8', serial: 'SN-112004', status: 'Rented', location: 'With: Khaled O.', condition: 'Good' },
    { id: 'EQ-012', name: 'Aputure 600d', serial: 'SN-554012', status: 'Maintenance', location: 'Service Center', condition: 'Damaged' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       {/* Scanner UI */}
       <div className="lg:col-span-1 bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
             <QrCode className="text-blue-400" /> فحص المعدات
          </h3>
          
          <div className="aspect-square bg-black rounded-xl border-2 border-dashed border-white/20 relative overflow-hidden mb-6 flex items-center justify-center group cursor-pointer hover:border-blue-500/50">
             <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             <div className="w-64 h-0.5 bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-[scan_2s_ease-in-out_infinite]" />
             <div className="absolute text-slate-500 text-xs mt-12">Click to activate camera</div>
             <style jsx>{`
                @keyframes scan {
                   0% { transform: translateY(-100px); opacity: 0; }
                   50% { opacity: 1; }
                   100% { transform: translateY(100px); opacity: 0; }
                }
             `}</style>
          </div>

          <div className="flex gap-2">
             <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold">Check-OUT</Button>
             <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold">Check-IN</Button>
          </div>
       </div>

       {/* Inventory List */}
       <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-slate-950 flex justify-between items-center">
             <div className="relative w-64">
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="بحث بالاسم أو الرقم التسلسلي..." className="w-full bg-black/30 border border-white/10 rounded-lg pr-9 pl-3 py-2 text-xs text-white" />
             </div>
             <Button variant="outline" className="border-white/10 text-white gap-2 text-xs">
                <Filter size={14}/> تصفية
             </Button>
          </div>

          <table className="w-full text-sm text-left">
             <thead className="bg-white/5 text-slate-400 text-xs uppercase">
                <tr>
                   <th className="p-4 text-right">المعدة</th>
                   <th className="p-4 text-right">الحالة</th>
                   <th className="p-4 text-right">الموقع</th>
                   <th className="p-4 text-right">الحالة الفنية</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {items.map((item) => (
                   <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-right">
                         <div className="font-bold text-white">{item.name}</div>
                         <div className="text-xs text-slate-500 font-mono">{item.id} • {item.serial}</div>
                      </td>
                      <td className="p-4 text-right">
                         <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                            item.status === 'In Stock' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            item.status === 'Rented' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            'bg-red-500/10 text-red-400 border-red-500/20'
                         }`}>
                            {item.status}
                         </span>
                      </td>
                      <td className="p-4 text-right text-slate-300 text-xs">{item.location}</td>
                      <td className="p-4 text-right">
                         {item.condition === 'Damaged' ? (
                            <div className="flex items-center gap-1 text-red-400 text-xs font-bold"><AlertTriangle size={12}/> Needs Repair</div>
                         ) : (
                            <div className="text-green-400 text-xs">OK</div>
                         )}
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
}

