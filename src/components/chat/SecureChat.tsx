'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, Lock, Paperclip, ShieldCheck } from 'lucide-react';
import { ChatEscrowEngine } from '@/lib/integration/ChatEscrowEngine';
import { useProjectStore } from '@/store/useProjectStore';

type ChatMessage = {
  content: string;
  sender: string;
};

type RealtimeMessage = ChatMessage;

type ChatEngineWithSend = ChatEscrowEngine & {
  sendMessage?: (message: ChatMessage) => void;
};

export const SecureChat = () => {
  const [message, setMessage] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [realMessages, setRealMessages] = useState<RealtimeMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const engineRef = useRef<ChatEscrowEngine | null>(null);
  const setSecurityAlert = useProjectStore((state) => state.setSecurityAlert);

  useEffect(() => {
    engineRef.current = new ChatEscrowEngine('main_room');

    // تصحيح التوافق النمطي هنا: استقبال unknown ثم التحويل داخلياً
    engineRef.current.enableRealtime((payload: unknown) => {
      const newMessage = payload as RealtimeMessage;
      setRealMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      engineRef.current?.cleanup();
    };
  }, []);

  const securityRegex = /(010|011|012|015|05|\+20|\+966)\d{8}|[a-zA-Z0-9._-]+@[a-z]+\.[a-z]+/g;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMessage(text);

    securityRegex.lastIndex = 0;
    const blocked = securityRegex.test(text);

    setIsBlocked(blocked);
    setSecurityAlert(blocked);
  };

  const handleSecureSend = async () => {
    if (!message.trim() || isBlocked) return;
    setIsSending(true);

    try {
      const res = await fetch('/api/ai/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message, type: 'security_audit' })
      });

      const data = await res.json();
      const cleanJson = data.result.replace(/```json/g, '').replace(/```/g, '').trim();
      const aiResult = JSON.parse(cleanJson) as { isBlocked?: boolean; reason?: string };

      if (aiResult.isBlocked) {
        setIsBlocked(true);
        setSecurityAlert(true);
        console.warn('🛡️ AI Guardian Blocked Message:', aiResult.reason);
        setIsSending(false);
        return;
      }

      if (engineRef.current) {
        const outgoingMessage: ChatMessage = { content: message, sender: 'me' };
        setRealMessages((prev) => [...prev, outgoingMessage]);

        const engine = engineRef.current as ChatEngineWithSend;
        if (typeof engine.sendMessage === 'function') {
          engine.sendMessage(outgoingMessage);
        }
      }

      setMessage('');
      setIsBlocked(false);
      setSecurityAlert(false);
    } catch (error: unknown) {
      console.error('AI Check Error:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-brand-surface border-r border-gray-700 w-80">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-brand-dark">
        <h3 className="font-bold text-white flex items-center gap-2">
          <ShieldCheck size={16} className="text-brand-success" />
          غرفة آمنة
        </h3>
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">مشفر</span>
      </div>

      {realMessages.map((msg, i) => (
        <div key={`${msg.sender}-${i}`} className="flex gap-3 animate-in fade-in p-2">
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

      <div className="p-4 border-t border-gray-700 relative">
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
            <button className="text-gray-400 hover:text-white transition-colors" aria-label="إرفاق ملف">
              <Paperclip size={18} />
            </button>
            <button
              onClick={handleSecureSend}
              disabled={isBlocked || !message.trim() || isSending}
              aria-label="إرسال الرسالة"
              className={`p-2 rounded-lg transition-colors ${isBlocked ? 'bg-gray-600 cursor-not-allowed' : 'bg-brand-secondary hover:bg-brand-primary text-white'}`}
            >
              {isSending ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <Send size={18} className={isBlocked ? '' : 'rtl:-rotate-90'} />
              )}
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
