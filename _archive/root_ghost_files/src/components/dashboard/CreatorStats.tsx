'use client';
import React from 'react';
import { Eye, MousePointer, TrendingUp, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SimpleChart } from '@/components/ui/Chart';

export function CreatorStats() {
  return (
    <div className="space-y-6">
       <h2 className="text-xl font-bold font-heading">أداء حسابك (آخر 30 يوم)</h2>
       
       {/* Key Metrics */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard title="مشاهدات الملف" value="1,240" icon={Eye} color="text-blue-500" bg="bg-blue-50" change="+12%" />
          <MetricCard title="نقرات الخدمات" value="85" icon={MousePointer} color="text-purple-500" bg="bg-purple-50" change="+5%" />
          <MetricCard title="معدل التحويل" value="3.2%" icon={TrendingUp} color="text-emerald-500" bg="bg-emerald-50" change="+0.4%" />
          <MetricCard title="الأرباح المتوقعة" value="$450" icon={DollarSign} color="text-yellow-600" bg="bg-yellow-50" change="+15%" />
       </div>

       {/* Charts */}
       <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 p-6">
             <h3 className="font-bold mb-6 text-sm text-muted-foreground">زيارات الملف الشخصي</h3>
             <SimpleChart 
                data={[120, 150, 180, 140, 200, 240, 300]} 
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} 
                height={250}
                color="#3b82f6"
             />
          </Card>

          <Card className="p-6">
             <h3 className="font-bold mb-4 text-sm text-muted-foreground">أعلى الخدمات مشاهدة</h3>
             <div className="space-y-4">
                <TopGig title="مونتاج فيديو يوتيوب" views="850" />
                <TopGig title="تصميم شعار متحرك" views="210" />
                <TopGig title="كتابة سكربت إعلاني" views="95" />
             </div>
          </Card>
       </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color, bg, change }: any) {
   return (
      <Card className="p-4 flex items-center gap-4">
         <div className={`p-3 rounded-xl ${bg} ${color}`}>
            <Icon size={20} />
         </div>
         <div>
            <p className="text-xs text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2">
               <span className="font-bold text-lg">{value}</span>
               <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">{change}</span>
            </div>
         </div>
      </Card>
   );
}

function TopGig({ title, views }: any) {
   return (
      <div className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-0">
         <span className="truncate max-w-[150px] font-medium">{title}</span>
         <span className="font-mono text-muted-foreground">{views}</span>
      </div>
   );
}

################################################################################