'use client';
import React, { useState } from 'react';
import { Search, Phone, Video, MoreVertical, Paperclip, Send, Mic } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function ChatInterface() {
  const [activeChat, setActiveChat] = useState(1);
  const contacts = [
    { id: 1, name: 'سارة علي', role: 'Client', lastMsg: 'الملفات ممتازة، شكراً!', time: '10:30 AM', unread: 0, status: 'online' },
    { id: 2, name: 'فريق المونتاج', role: 'Group', lastMsg: 'خالد: متى التسليم؟', time: 'Yesterday', unread: 3, status: 'busy' },
    { id: 3, name: 'أحمد كمال', role: 'Sound Eng', lastMsg: 'تم إرسال المؤثرات.', time: 'Monday', unread: 0, status: 'offline' },
  ];

  return (
    <div className="flex h-[calc(100vh-100px)] border border-white/10 rounded-xl overflow-hidden bg-slate-950">
       {/* Sidebar */}
       <div className="w-80 border-l border-white/10 bg-slate-900 flex flex-col">
          <div className="p-4 border-b border-white/10">
             <div className="relative">
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="بحث في المحادثات..." className="w-full bg-black/30 border border-white/10 rounded-lg pr-9 pl-3 py-2 text-xs text-white outline-none" />
             </div>
          </div>
          <div className="flex-1 overflow-y-auto">
             {contacts.map(contact => (
                <div 
                  key={contact.id} 
                  onClick={() => setActiveChat(contact.id)}
                  className={`p-4 flex gap-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 ${activeChat === contact.id ? 'bg-indigo-900/20 border-l-2 border-l-indigo-500' : ''}`}
                >
                   <div className="relative">
                      <Avatar fallback={contact.name[0]} />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                         contact.status === 'online' ? 'bg-green-500' : contact.status === 'busy' ? 'bg-red-500' : 'bg-slate-500'
                      }`} />
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                         <h4 className={`text-sm font-bold truncate ${activeChat === contact.id ? 'text-indigo-400' : 'text-white'}`}>{contact.name}</h4>
                         <span className="text-[10px] text-slate-500">{contact.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{contact.lastMsg}</p>
                   </div>
                   {contact.unread > 0 && (
                      <div className="flex items-center">
                         <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{contact.unread}</span>
                      </div>
                   )}
                </div>
             ))}
          </div>
       </div>

       {/* Main Chat Area */}
       <div className="flex-1 flex flex-col bg-black">
          {/* Header */}
          <div className="h-16 border-b border-white/10 flex justify-between items-center px-6 bg-slate-900/50">
             <div className="flex items-center gap-3">
                <Avatar fallback="S" />
                <div>
                   <h3 className="font-bold text-white text-sm">سارة علي</h3>
                   <span className="text-[10px] text-green-400 flex items-center gap-1">● متصل الآن</span>
                </div>
             </div>
             <div className="flex gap-4 text-slate-400">
                <button className="hover:text-white"><Phone size={20}/></button>
                <button className="hover:text-white"><Video size={20}/></button>
                <button className="hover:text-white"><MoreVertical size={20}/></button>
             </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
             <div className="flex justify-center"><span className="text-[10px] text-slate-600 bg-white/5 px-2 py-1 rounded">Today, 10:23 AM</span></div>
             
             <div className="flex justify-start gap-3">
                <Avatar fallback="S" size="sm" />
                <div className="bg-slate-800 p-3 rounded-2xl rounded-tr-none max-w-md text-sm text-white leading-relaxed">
                   مرحباً محمد، هل يمكنك مراجعة الدقيقة 01:45؟ الإضاءة تبدو منخفضة قليلاً.
                </div>
             </div>

             <div className="flex justify-end gap-3">
                <div className="bg-indigo-600 p-3 rounded-2xl rounded-tl-none max-w-md text-sm text-white leading-relaxed">
                   أهلاً سارة، بالتأكيد! سأقوم بتعديل الـ Exposure وإرسال نسخة جديدة خلال 10 دقائق.
                </div>
                <Avatar fallback="M" size="sm" />
             </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-slate-900/50">
             <div className="flex gap-2 items-end">
                <button className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"><Paperclip size={20}/></button>
                <textarea placeholder="اكتب رسالتك..." className="flex-1 bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-indigo-500 outline-none resize-none h-12 max-h-32" />
                <button className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"><Mic size={20}/></button>
                <button className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-lg"><Send size={20}/></button>
             </div>
          </div>
       </div>
    </div>
  );
}

