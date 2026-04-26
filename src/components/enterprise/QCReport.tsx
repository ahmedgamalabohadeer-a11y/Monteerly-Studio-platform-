'use client';
import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, XCircle, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function QCReport() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 3000);
  };

  const issues = [
    { id: 1, type: 'Audio', severity: 'Fail', message: 'Audio levels exceed -23 LUFS (EBU R128)', time: '00:02:15' },
    { id: 2, type: 'Video', severity: 'Warning', message: 'Flash frames detected (Photosensitive Epilepsy Risk)', time: '00:04:30' },
    { id: 3, type: 'Color', severity: 'Pass', message: 'Gamut is within Rec.709 standards', time: '-' },
    { id: 4, type: 'Metadata', severity: 'Fail', message: 'Missing ISAN number', time: '-' },
  ];

  return (
    <div className="space-y-6">
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="text-indigo-400" /> فحص الجودة الآلي (Auto-QC)
             </h3>
             <p className="text-sm text-slate-400">فحص الملفات وفق معايير Netflix و البث التلفزيوني.</p>
          </div>
          <Button 
            onClick={startScan} 
            disabled={scanning}
            className={`min-w-[150px] font-bold ${scanning ? 'bg-slate-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
          >
             {scanning ? <RefreshCw className="animate-spin mr-2" size={18} /> : <Search className="mr-2" size={18} />}
             {scanning ? 'جاري الفحص...' : 'بدء الفحص'}
          </Button>
       </div>

       {scanned && (
          <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden animate-in slide-in-from-bottom-4">
             <div className="p-4 border-b border-white/10 bg-slate-950 flex justify-between items-center">
                <span className="text-red-400 font-bold flex items-center gap-2">
                   <XCircle size={18} /> الفحص فشل (2 أخطاء حرجة)
                </span>
                <span className="text-xs text-slate-500">Duration: 3.2s • Profile: Netflix HD</span>
             </div>
             
             <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-slate-400 text-xs uppercase">
                   <tr>
                      <th className="p-4 text-right">الحالة</th>
                      <th className="p-4 text-right">النوع</th>
                      <th className="p-4 text-right">الوصف</th>
                      <th className="p-4 text-right">التوقيت (TC)</th>
                      <th className="p-4"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {issues.map(issue => (
                      <tr key={issue.id} className="hover:bg-white/5 transition-colors">
                         <td className="p-4 text-right">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                               issue.severity === 'Fail' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                               issue.severity === 'Warning' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                               'bg-green-500/10 text-green-400 border-green-500/20'
                            }`}>
                               {issue.severity.toUpperCase()}
                            </span>
                         </td>
                         <td className="p-4 text-right text-white font-bold">{issue.type}</td>
                         <td className="p-4 text-right text-slate-300">{issue.message}</td>
                         <td className="p-4 text-right font-mono text-indigo-400">{issue.time}</td>
                         <td className="p-4 text-right">
                            {issue.severity !== 'Pass' && (
                               <Button size="sm" variant="outline" className="text-xs h-7 border-white/10 text-white hover:bg-white/10">إصلاح آلي</Button>
                            )}
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       )}
    </div>
  );
}

