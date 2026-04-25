'use client';
import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function ComplianceTracker() {
  const items = [
    { label: 'GDPR Compliance', status: 'compliant', date: 'Verified Jan 10' },
    { label: 'Music Licensing Rights', status: 'warning', date: 'Expiring in 5 days' },
    { label: 'Talent Release Forms', status: 'compliant', date: 'All signed' },
    { label: 'Data Residency (KSA)', status: 'compliant', date: 'Servers in Riyadh' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <h3 className="font-bold text-white mb-6">حالة الامتثال القانوني</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
             <div key={i} className="p-4 border border-white/5 rounded-lg bg-black/20 flex items-start gap-3">
                {item.status === 'compliant' ? (
                   <CheckCircle size={20} className="text-green-500 shrink-0" />
                ) : (
                   <AlertCircle size={20} className="text-yellow-500 shrink-0" />
                )}
                <div>
                   <div className="font-bold text-white text-sm">{item.label}</div>
                   <div className={`text-xs mt-1 ${item.status === 'compliant' ? 'text-slate-500' : 'text-yellow-500'}`}>
                      {item.date}
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################