'use client';

import React from 'react';
import { User, Shield, Trash2 } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

export function TeamMembersList() {
  const members = [
    { id: 1, name: 'أنت (المالك)', email: 'me@monteerly.com', role: 'Owner', status: 'active' },
    { id: 2, name: 'سارة أحمد', email: 'sara@example.com', role: 'Editor', status: 'active' },
    { id: 3, name: 'محمد علي', email: 'mohamed@client.com', role: 'Viewer', status: 'pending' },
  ];

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/10">
        <h3 className="font-bold text-sm">أعضاء الفريق ({members.length})</h3>
      </div>

      <div className="divide-y divide-border">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Avatar fallback={member.name[0]} />
              <div>
                <h4 className="font-bold text-sm flex items-center gap-2">
                  {member.name}
                  {member.status === 'pending' && (
                    <Badge variant="secondary" className="text-[10px]">
                      معلق
                    </Badge>
                  )}
                </h4>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-xs font-bold">
                {member.role === 'Owner' ? (
                  <Shield size={12} className="text-primary" />
                ) : (
                  <User size={12} />
                )}
                {member.role}
              </div>

              {member.role !== 'Owner' && (
                <button className="text-muted-foreground hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
