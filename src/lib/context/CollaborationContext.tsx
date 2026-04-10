'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { socketService } from '@/lib/services/mockSocket';
import { useToast } from '@/components/ui/Toast';

interface Cursor {
  userId: string;
  x: number;
  y: number;
  userName: string;
  color: string;
}

interface CollabContextType {
  cursors: Cursor[];
  onlineUsers: number;
}

const CollabContext = createContext<CollabContextType>({ cursors: [], onlineUsers: 1 });

export function CollabProvider({ children }: { children: React.ReactNode }) {
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    // Start Simulation
    socketService.startSimulation();

    // Listen for Cursors
    socketService.on('cursor_move', (data: Cursor) => {
      setCursors(prev => {
        // Update existing or add new
        const filtered = prev.filter(c => c.userId !== data.userId);
        return [...filtered, data];
      });
    });

    // Listen for Notifications
    socketService.on('notification', (data: any) => {
      addToast(data.type, data.text);
    });

    return () => socketService.stopSimulation();
  }, [addToast]);

  return (
    <CollabContext.Provider value={{ cursors, onlineUsers: 2 }}>
      {children}
    </CollabContext.Provider>
  );
}

export const useCollab = () => useContext(CollabContext);
