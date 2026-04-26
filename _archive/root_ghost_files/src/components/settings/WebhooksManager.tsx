'use client';
import React, { useState } from 'react';
import { Webhook, Plus, Trash2, Activity, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function WebhooksManager() {
  const [endpoints, setEndpoints] = useState([
    { id: 1, url: 'https://api.myagency.com/callbacks/monteerly', events: ['project.completed', 'payment.received'], status: 'active' }
  ]);

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <div>
             <h3 className="font-bold text-lg">إدارة Webhooks</h3>
             <p className="text-sm text-muted-foreground">استقبل إشعارات برمجية فورية عند حدوث تغييرات في حسابك.</p>
          </div>
          <Button variant="outline" icon={<Plus size={16} />}>إضافة Endpoint</Button>
       </div>

       <div className="space-y-4">
          {endpoints.map((ep) => (
             <div key={ep.id} className="border border-border rounded-xl p-4 bg-card">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                         <Webhook size={20} />
                      </div>
                      <div>
                         <p className="font-mono text-sm font-bold truncate max-w-md">{ep.url}</p>
                         <div className="flex gap-2 mt-1">
                            {ep.events.map(ev => (
                               <span key={ev} className="text-[10px] bg-muted px-2 py-0.5 rounded border border-border">{ev}</span>
                            ))}
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                         <Activity size={12} /> Active
                      </span>
                      <Button size="sm" variant="ghost" className="text-red-500"><Trash2 size={16} /></Button>
                   </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-lg border border-border flex justify-between items-center">
                   <div className="text-xs text-muted-foreground font-mono">Secret: whsec_••••••••••••••••••</div>
                   <Button size="sm" variant="outline" className="h-7 text-xs">إعادة التوليد</Button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

################################################################################