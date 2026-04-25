import { create } from "zustand";

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  capacity: number;
  guestCount: number;
  status: "planning" | "active" | "completed" | "cancelled";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface EventState {
  events: Event[];
  selectedEvent: Event | null;
  loading: boolean;
  setEvents: (events: Event[]) => void;
  setSelectedEvent: (event: Event | null) => void;
  setLoading: (loading: boolean) => void;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  selectedEvent: null,
  loading: false,
  setEvents: (events) => set({ events }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setLoading: (loading) => set({ loading }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (event) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === event.id ? event : e)),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
}));
