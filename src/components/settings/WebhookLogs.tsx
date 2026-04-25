'use client';
import React from 'react';
import { Activity, CheckCircle, XCircle, Clock } from 'lucide-react';

export function WebhookLogs() {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-2 border-b border-border pb-4">
          <Activity size={20} className="text-primary" />
          <h3 className="font-bold text-lg">سجلات الويب هوك (Webhook Events)</h3>
       </div>

       <div className="border border-border rounded-xl overflow-hidden bg-card">
          <table className="w-full text-sm text-right">
             <thead className="bg-muted text-muted-foreground">
                <tr>
                   <th className="p-3">الحالة</th>
                   <th className="p-3">الحدث (Event)</th>
                   <th className="p-3">رابط الهدف (URL)</th>
                   <th className="p-3">التوقيت</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-border">
                <LogItem 
                   status="success" 
                   event="video.upload_completed" 
                   url="https://api.zapier.com/hooks/..." 
                   time="2 mins ago" 
                />
                <LogItem 
                   status="success" 
                   event="comment.created" 
                   url="https://hooks.slack.com/services/..." 
                   time="15 mins ago" 
                />
                <LogItem 
                   status="failed" 
                   event="project.archived" 
                   url="https://my-agency.com/webhook" 
                   time="1 hour ago" 
                />
             </tbody>
          </table>
       </div>
    </div>
  );
}

function LogItem({ status, event, url, time }: any) {
    return (
        <tr className="hover:bg-muted/30">
            <td className="p-3">
               {status === 'success' ? (
                  <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded w-fit">
                     <CheckCircle size={12} /> 200 OK
                  </span>
               ) : (
                  <span className="flex items-center gap-1 text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded w-fit">
                     <XCircle size={12} /> 500 ERR
                  </span>
               )}
            </td>
            <td className="p-3 font-mono text-xs">{event}</td>
            <td className="p-3 text-muted-foreground truncate max-w-[200px]">{url}</td>
            <td className="p-3 text-muted-foreground text-xs flex items-center gap-1">
               <Clock size={12} /> {time}
            </td>
        </tr>
    )
}

################################################################################