'use client';
import React from 'react';
import { MousePointer2 } from 'lucide-react';

// هذا المكون يحاكي وجود مستخدمين آخرين في الصفحة
// في الواقع، يتم التحكم بالإحداثيات عبر WebSockets (Socket.io / Firebase)
export function LiveCursors() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
       {/* User A Cursor */}
       <div 
         className="absolute transition-all duration-500 ease-out" 
         style={{ left: '45%', top: '30%' }}
       >
          <MousePointer2 className="text-emerald-500 fill-emerald-500 transform -rotate-12" size={20} />
          <div className="ml-4 -mt-2 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap">
             أحمد (العميل)
          </div>
       </div>

       {/* User B Cursor */}
       <div 
         className="absolute transition-all duration-700 ease-out" 
         style={{ left: '72%', top: '65%' }}
       >
          <MousePointer2 className="text-purple-500 fill-purple-500 transform -rotate-12" size={20} />
          <div className="ml-4 -mt-2 bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap">
             سارة (مشرف)
          </div>
       </div>
    </div>
  );
}

################################################################################