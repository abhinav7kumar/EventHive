'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Event } from '@/types';

interface EventContextType {
  newEvents: Event[];
  addEvent: (event: Event) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [newEvents, setNewEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setNewEvents((prevEvents) => [...prevEvents, event]);
  };

  return (
    <EventContext.Provider value={{ newEvents, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
