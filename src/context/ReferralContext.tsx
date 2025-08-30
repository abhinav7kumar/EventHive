'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ReferralProgram {
    id: string;
    eventId: string;
    friendDiscount: number;
    advocateReward: number;
}

interface ReferralContextType {
  programs: ReferralProgram[];
  addProgram: (program: ReferralProgram) => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider = ({ children }: { children: ReactNode }) => {
  const [programs, setPrograms] = useState<ReferralProgram[]>([]);

  const addProgram = (program: ReferralProgram) => {
    setPrograms((prev) => [...prev, program]);
  };

  return (
    <ReferralContext.Provider value={{ programs, addProgram }}>
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferrals = () => {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error('useReferrals must be used within a ReferralProvider');
  }
  return context;
};
