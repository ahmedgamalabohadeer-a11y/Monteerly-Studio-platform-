import { create } from 'zustand';

interface WorkspaceState {
  open: boolean;
  toggle: () => void;
}

export const useStore = create<WorkspaceState>((set) => ({
  open: true,
  toggle: () => set((state) => ({ open: !state.open }))
}));
