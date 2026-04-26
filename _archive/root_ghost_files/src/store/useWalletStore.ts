import { create } from 'zustand';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'escrow_lock' | 'escrow_release';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

interface WalletState {
  availableBalance: number;
  escrowBalance: number;
  currency: string;
  transactions: Transaction[];
  addFunds: (amount: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  availableBalance: 1250.00, // رصيد افتراضي
  escrowBalance: 450.00,    // رصيد معلق (ضمان)
  currency: 'USD',
  transactions: [
    { id: 'tx_1', type: 'deposit', amount: 500, date: '2026-01-25', status: 'completed', description: 'شحن رصيد (Paymob)' },
    { id: 'tx_2', type: 'escrow_lock', amount: 200, date: '2026-02-01', status: 'pending', description: 'حجز مشروع: فيديو إعلاني' },
    { id: 'tx_3', type: 'withdrawal', amount: 1000, date: '2025-12-30', status: 'completed', description: 'سحب أرباح' },
  ],
  addFunds: (amount) => set((state) => ({ 
    availableBalance: state.availableBalance + amount,
    transactions: [{
      id: `tx_${Date.now()}`,
      type: 'deposit',
      amount,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      description: 'شحن رصيد جديد'
    }, ...state.transactions]
  })),
}));

################################################################################