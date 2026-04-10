'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, USER_ROLES } from '@/lib/constants/roles';

interface RoleContextType {
  currentRole: UserRole;
  setRole: (roleId: string) => void;
  isLayer: (layer: UserRole['layer']) => boolean;
}

// Default to Creator Novice
const defaultRole = USER_ROLES[0];

const RoleContext = createContext<RoleContextType>({
  currentRole: defaultRole,
  setRole: () => {},
  isLayer: () => false,
});

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>(defaultRole);

  const setRole = (roleId: string) => {
    const role = USER_ROLES.find(r => r.id === roleId);
    if (role) {
      setCurrentRole(role);
      // Optional: Save to local storage for persistence during demo
      localStorage.setItem('monteerly_demo_role', roleId);
    }
  };

  const isLayer = (layer: UserRole['layer']) => currentRole.layer === layer;

  // Load from storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('monteerly_demo_role');
    if (saved) setRole(saved);
  }, []);

  return (
    <RoleContext.Provider value={{ currentRole, setRole, isLayer }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => useContext(RoleContext);
