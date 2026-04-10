'use client';
import React, { useState } from 'react';
import { Play, Copy, Server, Code } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ApiPlayground() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    setTimeout(() => {
       setResponse(JSON.stringify({
          data: {
             id: "vid_882190",
             title: "Ramadan_Promo_Final.mp4",
             duration: 30.5,
             streams: {
                hls: "https://cdn.monteerly.com/hls/vid_882190/master.m3u8",
                dash: "https://cdn.monteerly.com/dash/vid_882190/manifest.mpd"
             },
             metadata: {
                director: "Ahmed Kamal",
                location: "Riyadh"
             }
          }
       }, null, 3));
       setLoading(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
       {/* Request Panel */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
             <Server className="text-green-400" /> طلب API (Request)
          </h3>
          
          <div className="space-y-4">
             <div>
                <label className="text-xs text-slate-400 font-bold mb-2 block">Endpoint</label>
                <div className="flex bg-black rounded-lg border border-white/10 overflow-hidden">
                   <div className="bg-slate-800 px-3 py-3 text-xs font-bold text-green-400 border-r border-white/10">GET</div>
                   <div className="flex-1 px-3 py-3 text-xs font-mono text-white">
                      https://api.monteerly.com/v1/videos/{'{id}'}
                   </div>
                </div>
             </div>

             <div>
                <label className="text-xs text-slate-400 font-bold mb-2 block">Headers</label>
                <div className="bg-black p-3 rounded-lg border border-white/10 text-xs font-mono text-slate-300">
                   <div>Authorization: Bearer sk_live_51Mxq...</div>
                   <div>Content-Type: application/json</div>
                </div>
             </div>

             <Button 
               onClick={handleFetch}
               disabled={loading}
               className="w-full mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 gap-2"
             >
                <Play size={16} className={loading ? 'animate-spin' : ''} /> {loading ? 'Sending...' : 'Send Request'}
             </Button>
          </div>
       </div>

       {/* Response Panel */}
       <div className="bg-[#1e1e1e] border border-white/10 rounded-xl p-6 flex flex-col relative">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Code className="text-blue-400" /> الاستجابة (JSON Response)
             </h3>
             <button className="text-slate-400 hover:text-white"><Copy size={16}/></button>
          </div>

          <div className="flex-1 bg-[#111] rounded-lg p-4 overflow-y-auto font-mono text-xs border border-white/5 shadow-inner">
             {response ? (
                <pre className="text-green-400">
                   {response}
                </pre>
             ) : (
                <div className="text-slate-600 h-full flex items-center justify-center">
                   Waiting for request...
                </div>
             )}
          </div>
          
          <div className="absolute bottom-8 right-8">
             {response && <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-[10px] font-bold border border-green-500/30">Status: 200 OK</span>}
          </div>
       </div>
    </div>
  );
}
