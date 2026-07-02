'use client';

import React, { useState } from 'react';
import { Key, Copy, Trash2, Plus, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ApiKeysManager() {
  const [keys] = useState([
    {
      id: 1,
      name: 'Zapier Integration',
      prefix: 'pk_live_...',
      created: '2026-01-10',
      lastUsed: '2 mins ago',
    },
    {
      id: 2,
      name: 'Custom Upload Script',
      prefix: 'pk_test_...',
      created: '2025-12-05',
      lastUsed: '3 days ago',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-4">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Key className="text-primary" size={20} /> مفاتيح API
          </h3>
          <p className="text-sm text-muted-foreground">
            إدارة مفاتيح الربط البرمجي للتطبيقات الخارجية.
          </p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />}>
          إنشاء مفتاح جديد
        </Button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 text-yellow-800 text-sm">
        <ShieldAlert className="shrink-0" size={20} />
        <p>
          هذه المفاتيح تمنح وصولاً كاملاً لحسابك. لا تشاركها مع أي شخص. إذا تم اختراق
          مفتاح، قم بحذفه فوراً.
        </p>
      </div>

      <div className="space-y-4">
        {keys.map((key) => (
          <div
            key={key.id}
            className="flex items-center justify-between p-4 border border-border rounded-xl bg-card"
          >
            <div>
              <h4 className="font-bold text-sm">{key.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono">
                  {key.prefix}****************
                </code>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-primary"
                  title="Copy"
                  aria-label={`نسخ المفتاح ${key.name}`}
                >
                  <Copy size={12} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right text-xs text-muted-foreground">
                <div>Created: {key.created}</div>
                <div>Last used: {key.lastUsed}</div>
              </div>
              <Button
                variant="ghost"
                className="text-red-500 hover:bg-red-50"
                icon={<Trash2 size={16} />}
              >
                Revoke
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
