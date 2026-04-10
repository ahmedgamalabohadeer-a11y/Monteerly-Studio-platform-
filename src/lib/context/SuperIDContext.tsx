'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

// تعريف الهوية الشاملة
type UserPersona = 'rookie' | 'pro' | 'enterprise';

interface SuperIDState {
  identity: {
    id: string;
    name: string;
    persona: UserPersona;
    xp: number; // Gamification from Academy
    reputation: number; // Trust score from Marketplace
  };
  assets: {
    storageUsed: number;
    totalStorage: number;
  };
  finance: {
    balance: number;
    pendingEscrow: number;
  };
  notifications: number;
  switchPersona: (p: UserPersona) => void;
}

const SuperIDContext = createContext<SuperIDState | null>(null);

export function SuperIDProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersona] = useState<UserPersona>('pro');

  // محاكاة جلب البيانات الموحدة من 3 قواعد بيانات مختلفة (LMS, ERP, CRM)
  const state: SuperIDState = {
    identity: {
      id: 'usr_8821',
      name: 'Ahmed Kamal',
      persona: persona,
      xp: 12450, // Level 12 Editor
      reputation: 4.9, // Top Rated
    },
    assets: {
      storageUsed: 45, // GB
      totalStorage: 100,
    },
    finance: {
      balance: 1250.00,
      pendingEscrow: 300.00,
    },
    notifications: 3,
    switchPersona: setPersona,
  };

  return (
    <SuperIDContext.Provider value={state}>
      {children}
    </SuperIDContext.Provider>
  );
}

export const useSuperID = () => {
  const context = useContext(SuperIDContext);
  if (!context) throw new Error('useSuperID must be used within SuperIDProvider');
  return context;
};
