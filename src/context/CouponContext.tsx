'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Coupon {
  id: string;
  code: string;
  discount: number; // Percentage
  eventId: string;
}

interface CouponContextType {
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider = ({ children }: { children: ReactNode }) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, coupon]);
  };

  return (
    <CouponContext.Provider value={{ coupons, addCoupon }}>
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupons = () => {
  const context = useContext(CouponContext);
  if (context === undefined) {
    throw new Error('useCoupons must be used within a CouponProvider');
  }
  return context;
};
