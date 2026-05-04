import { ChatEscrowEngine } from '@/lib/integration/ChatEscrowEngine';
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, Lock, Paperclip, ShieldCheck } from 'lucide-react';
import { useProjectStore } from '@/store/useProjectStore';

export const SecureChat = () => {
  const [message, setMessage] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [realMessages, setRealMessages] = useState<any[]>([]);
  const engineRef = useRef<ChatEscrowEngine | null>(null);

  useEffect(() => {
    engineRef.current = new ChatEscrowEngine('main_room'); // معرف الغرفة
    const channel = engineRef.current.enableRealtime((newMessage) => {
      setRealMessages((prev) => [...prev, newMessage]);
    });
    return () => engineRef.current?.cleanup();
  }, []);

  const setSecurityAlert = useProjectStore((state) => state.setSecurityAlert);
  
  // Regex للكشف عن الأرقام المصرية والسعودية والإيميلات
  const securityRegex = /(010|011|012|015|05|\+20|\+966)\d{8}|[a-zA-Z0-9._-]+@[a-z]+\.[a-z]+/g;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMessage(text);

    // منطق القبة الحديدية الفوري
    if (securityRegex.test(text)) {
      setIsBlocked(true);
      setSecurityAlert(true); // تفعيل إنذار عام في النظام
    } else {
      setIsBlocked(false);
      setSecurityAlert(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-brand-surface border-r border-gray-700 w-80">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-brand-dark">
        <h3 className="font-bold text-white flex items-center gap-2">
          <ShieldCheck size={16} className="text-brand-success" />
          غرفة آمنة
        </h3>
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">مشفر</span>
      </div>

      {/* Realtime Messages Integration */}
        {realMessages.map((msg, i) => (
          <div key={i} className="flex gap-3 animate-in fade-in">
            <div className="bg-brand-secondary/20 p-3 rounded-lg text-sm text-gray-200">{msg.content}</div>
          </div>
        ))}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-xs text-white">AM</div>
          <div className="bg-gray-700 p-3 rounded-lg rounded-tr-none text-sm text-gray-200">
            مرحباً، هل يمكن تعديل الدقيقة 01:20؟
          </div>
        </div>
        
        {/* System Alert Example */}
        {isBlocked && (
          <div className="bg-brand-alert/10 border border-brand-alert/50 p-3 rounded-lg flex gap-3 animate-pulse">
            <AlertTriangle className="text-brand-alert shrink-0" size={20} />
            <div className="text-xs text-brand-alert">
              <span className="font-bold block mb-1">تم اكتشاف مخالفة أمنية!</span>
              محاولة مشاركة أرقام الهواتف تعرض حسابك للحظر الفوري وضياع مستحقاتك.
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700 relative">
        {/* Blur Overlay if Blocked */}
        {isBlocked && (
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm z-10 flex items-center justify-center text-center p-4">
            <div className="text-brand-alert font-bold text-sm">
              <Lock className="mx-auto mb-2" />
              قم بإزالة رقم الهاتف للإرسال
            </div>
          </div>
        )}

        <div className="relative">
          <textarea
            value={message}
            onChange={handleInputChange}
            placeholder="اكتب ملاحظاتك هنا..."
            className={`w-full bg-gray-800 border ${isBlocked ? 'border-brand-alert' : 'border-gray-600'} rounded-xl p-3 pl-10 text-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-secondary resize-none h-24 font-tajawal`}
          />
          <div className="absolute bottom-3 left-3 flex gap-2">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Paperclip size={18} />
            </button>
            <button 
              disabled={isBlocked || !message.trim()}
              className={`p-2 rounded-lg transition-colors ${isBlocked ? 'bg-gray-600 cursor-not-allowed' : 'bg-brand-secondary hover:bg-brand-primary text-white'}`}
            >
              <Send size={18} className={isBlocked ? '' : 'rtl:-rotate-90'} />
            </button>
          </div>
        </div>
        <div className="text-[10px] text-gray-500 mt-2 text-center">
          جميع المحادثات مراقبة آلياً لضمان حقوق الطرفين
        </div>
      </div>
    </div>
  );
};

