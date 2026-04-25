'use client';
import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

interface TransactionProps {
  type: 'deposit' | 'withdrawal' | 'payment';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export function TransactionRow({ type, amount, description, date, status }: TransactionProps) {
  const isPositive = type === 'deposit';
  
  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/30 rounded-xl transition-colors border-b border-border last:border-0">
       <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${isPositive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
             {isPositive ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
          </div>
          <div>
             <h4 className="font-bold text-sm">{description}</h4>
             <p className="text-xs text-muted-foreground flex items-center gap-1">
                {date} • 
                <span className={`capitalize ${status === 'pending' ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                   {status}
                </span>
             </p>
          </div>
       </div>

       <div className={`font-mono font-bold ${isPositive ? 'text-emerald-600' : 'text-foreground'}`}>
          {isPositive ? '+' : '-'}${amount.toFixed(2)}
       </div>
    </div>
  );
}

################################################################################