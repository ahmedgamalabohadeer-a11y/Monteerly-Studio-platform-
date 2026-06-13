'use client';
import React from 'react';
import { Smartphone, Monitor, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function ActiveSessions() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
          <div>
             <h3 className="font-bold text-lg">الجلسات النشطة</h3>
             <p className="text-sm text-muted-foreground">الأجهزة التي تم تسجيل الدخول منها إلى حسابك مؤخراً.</p>
          </div>
          <Button variant="outline" className="text-red-500 hover:bg-red-50 hover:border-red-200">
             تسجيل الخروج من كل الأجهزة
          </Button>
       </div>

       <div className="border border-border rounded-xl divide-y divide-border">
          {/* Current Session */}
          <SessionRow 
             device="Windows PC - Chrome" 
             location="Cairo, Egypt" 
             ip="197.55.x.x" 
             date="نشط الآن" 
             isCurrent 
             icon={Monitor}
          />
          
          {/* Other Session */}
          <SessionRow 
             device="iPhone 14 Pro - App" 
             location="Riyadh, KSA" 
             ip="150.20.x.x" 
             date="منذ 2 ساعة" 
             icon={Smartphone}
          />

          <SessionRow 
             device="MacBook Pro - Safari" 
             location="Dubai, UAE" 
             ip="85.10.x.x" 
             date="10 Jan, 2026" 
             icon={Monitor}
          />
       </div>
    </div>
  );
}

function SessionRow({ device, location, ip, date, isCurrent, icon: Icon }: unknown) {
   return (
      <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
         <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${isCurrent ? 'bg-emerald-100 text-emerald-600' : 'bg-muted text-muted-foreground'}`}>
               <Icon size={24} />
            </div>
            <div>
               <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{device}</p>
                  {isCurrent && <Badge variant="success">هذا الجهاز</Badge>}
               </div>
               <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Globe size={12} /> {location}</span>
                  <span className="font-mono">IP: {ip}</span>
                  <span>• {date}</span>
               </div>
            </div>
         </div>
         {!isCurrent && (
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-red-500" icon={<LogOut size={16} />}>
               إنهاء
            </Button>
         )}
      </div>
   );
}

