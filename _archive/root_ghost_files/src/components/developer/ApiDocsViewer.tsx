'use client';
import React, { useState } from 'react';
import { Play, Code, Check } from 'lucide-react';
import { InteractiveButton } from '@/components/system/InteractiveButton';

export function ApiDocsViewer() {
  const [activeLang, setActiveLang] = useState<'curl' | 'js' | 'python'>('js');
  
  const codeSnippets = {
    curl: `curl -X POST https://api.monteerly.com/v1/plugins \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{"name": "My Filter", "type": "lut"}'`,
    js: `const monteerly = require('monteerly-sdk');

const plugin = await monteerly.plugins.create({
  name: 'My Filter',
  type: 'lut',
  source: './filter.cube'
});

console.log(plugin.id);`,
    python: `import monteerly

client = monteerly.Client('sk_live_...')
plugin = client.plugins.create(
    name='My Filter',
    type='lut'
)

print(plugin.id)`
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[600px]">
       {/* Navigation */}
       <div className="w-64 hidden lg:block border-r border-white/10 pr-4">
          <div className="text-xs font-bold text-slate-500 uppercase mb-4">Getting Started</div>
          <ul className="space-y-2 text-sm">
             <li className="text-indigo-400 font-bold border-l-2 border-indigo-400 pl-3">Introduction</li>
             <li className="text-slate-400 hover:text-white pl-3.5 cursor-pointer">Authentication</li>
             <li className="text-slate-400 hover:text-white pl-3.5 cursor-pointer">Errors</li>
          </ul>
          <div className="text-xs font-bold text-slate-500 uppercase mt-6 mb-4">Resources</div>
          <ul className="space-y-2 text-sm">
             <li className="text-slate-400 hover:text-white pl-3.5 cursor-pointer">Plugins</li>
             <li className="text-slate-400 hover:text-white pl-3.5 cursor-pointer">Webhooks</li>
          </ul>
       </div>

       {/* Content */}
       <div className="flex-1 overflow-y-auto">
          <h1 className="text-3xl font-bold text-white mb-4">بناء أول إضافة (Plugin)</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
             منصة Monteerly تتيح لك توسيع قدرات الاستوديو. يمكنك بناء فلاتر ألوان، أدوات ذكاء اصطناعي، أو حتى واجهات مخصصة.
          </p>

          {/* Interactive Code Block */}
          <div className="bg-[#1e1e1e] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
             <div className="flex items-center justify-between p-2 bg-[#252526] border-b border-white/5">
                <div className="flex gap-2">
                   <button 
                     onClick={() => setActiveLang('js')} 
                     className={`px-3 py-1 rounded text-xs font-bold ${activeLang === 'js' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                   >Node.js</button>
                   <button 
                     onClick={() => setActiveLang('python')} 
                     className={`px-3 py-1 rounded text-xs font-bold ${activeLang === 'python' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                   >Python</button>
                   <button 
                     onClick={() => setActiveLang('curl')} 
                     className={`px-3 py-1 rounded text-xs font-bold ${activeLang === 'curl' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                   >cURL</button>
                </div>
                <div className="flex gap-2">
                   <InteractiveButton size="sm" icon={<Play size={12}/>}>تشغيل التجربة</InteractiveButton>
                </div>
             </div>

             <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-blue-300">
                   {codeSnippets[activeLang]}
                </pre>
             </div>
             
             <div className="p-2 bg-black border-t border-white/5 text-[10px] text-slate-500 font-mono">
                Response: 201 Created • 124ms
             </div>
          </div>
       </div>
    </div>
  );
}

################################################################################