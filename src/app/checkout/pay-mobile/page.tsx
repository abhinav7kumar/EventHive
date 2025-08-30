
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, notFound, useRouter } from 'next/navigation';
import { getEventById } from '@/lib/mock-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Loader2 } from 'lucide-react';

function MobilePayment() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const transactionId = searchParams.get('transactionId');
    const eventId = searchParams.get('eventId');
    const total = searchParams.get('total');
    
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        if (isPaid) {
            const timer = setTimeout(() => {
                router.push(`/checkout/confirmation?eventId=${eventId}&total=${total}`);
            }, 3000); // 3-second delay
            return () => clearTimeout(timer);
        }
    }, [isPaid, router, eventId, total]);

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
            <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
                <div className="animate-fade-in animate-bounce">
                    <CheckCircle className="h-24 w-24 mb-4 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-green-600 animate-fade-in">Payment Successful!</h1>
                <p className="mt-4 text-muted-foreground flex items-center gap-2 animate-fade-in">
                    <Loader2 className="animate-spin h-5 w-5"/>
                    Redirecting to your confirmation...
                </p>
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
