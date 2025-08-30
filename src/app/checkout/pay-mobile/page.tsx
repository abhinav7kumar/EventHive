
'use client';

import { Suspense } from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import { getEventById } from '@/lib/mock-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap } from 'lucide-react';
import { useState } from 'react';

function MobilePayment() {
    const searchParams = useSearchParams();
    const transactionId = searchParams.get('transactionId');
    const eventId = searchParams.get('eventId');
    const total = searchParams.get('total');
    
    const [isPaid, setIsPaid] = useState(false);

    if (!transactionId || !eventId || !total) {
        return notFound();
    }
    const event = getEventById(eventId);
    if (!event) {
        return notFound();
    }

    const handlePayNow = () => {
        try {
            // This simulates the payment being completed on the mobile device.
            // It updates localStorage, which the desktop page is polling.
            localStorage.setItem(`payment_${transactionId}`, 'PAID');
            setIsPaid(true);
        } catch (error) {
            console.error("Could not access localStorage:", error);
            alert("Payment failed. Please try again.");
        }
    };

    if (isPaid) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-800 p-4">
                <CheckCircle className="h-24 w-24 mb-4 text-green-500" />
                <h1 className="text-3xl font-bold">Payment Successful!</h1>
                <p className="mt-2 text-center">Your ticket purchase is confirmed.</p>
                <p className="mt-4 text-sm text-center">You can now return to your desktop to view your ticket.</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Confirm Payment</CardTitle>
                    <CardDescription>You are paying for a ticket to:</CardDescription>
                    <p className="font-semibold text-primary pt-2 text-lg">{event.title}</p>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-5xl font-bold">₹{total}</p>
                    </div>
                    <Button size="lg" className="w-full h-14 text-lg" onClick={handlePayNow}>
                        <Zap className="mr-2"/> Pay Now
                    </Button>
                     <p className="text-xs text-muted-foreground text-center">
                        This is a simulated payment screen. Clicking "Pay Now" will complete the transaction.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}


export default function MobilePaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MobilePayment />
        </Suspense>
    )
}
