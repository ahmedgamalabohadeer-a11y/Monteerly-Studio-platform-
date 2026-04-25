'use client';
import React, { useState } from 'react';
import { Bell, Moon, Shield, Globe, Lock } from 'lucide-react';
import { SecureInput } from '@/components/ui/SecureInput';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen p-6 pb-24" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold font-cairo text-white mb-8">الإعدادات وتفضيلات الحساب</h1>
        <div className="bg-brand-surface border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
            <div className="p-2 bg-brand-primary/20 text-brand-secondary rounded-lg"><Shield size={20} /></div>
            <h2 className="text-xl font-bold text-white">أمان الحساب</h2>
          </div>
          <div className="space-y-4 max-w-lg">
            <SecureInput label="البريد الإلكتروني" value="ahmed@monteerly.com" readOnly />
            <SecureInput label="كلمة المرور الحالية" type="password" placeholder="••••••••" />
          </div>
        </div>
        <div className="bg-brand-surface border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><Globe size={20} /></div>
            <h2 className="text-xl font-bold text-white">التفضيلات العامة</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="text-gray-400" />
                <div><p className="font-bold text-white text-sm">إشعارات النظام</p></div>
              </div>
              <button onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-green-500' : 'bg-gray-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${notifications ? '-translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
