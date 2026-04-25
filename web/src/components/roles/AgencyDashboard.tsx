'use client';
import React from 'react';
import { Building2, Users, TrendingUp } from 'lucide-react';

export function AgencyDashboard() {
  return (
    <div className="p-6">
       <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-100 text-indigo-700 rounded-lg"><Building2 size={24} /></div>
          <h1 className="text-2xl font-bold">لوحة تحكم الوكالة</h1>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
             <div className="text-muted-foreground text-sm mb-1">إجمالي العملاء</div>
             <div className="text-3xl font-black">12</div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
             <div className="text-muted-foreground text-sm mb-1">المشاريع النشطة</div>
             <div className="text-3xl font-black text-indigo-600">28</div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
             <div className="text-muted-foreground text-sm mb-1">أداء الفريق</div>
             <div className="text-3xl font-black text-emerald-500">94%</div>
          </div>
       </div>

       {/* Team Table Placeholder */}
       <div className="bg-card border border-border rounded-xl p-6 min-h-[200px] flex items-center justify-center text-muted-foreground">
          <Users className="mr-2" /> قائمة إدارة الفرق والموظفين
       </div>
    </div>
  );
}

