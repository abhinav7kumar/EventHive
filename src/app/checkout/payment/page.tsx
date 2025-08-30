
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import { getEventById } from '@/lib/mock-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Info, Laptop, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function usePaymentStatus(transactionId: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const total = searchParams.get('total');

  useEffect(() => {
    if (!transactionId) return;

    // This function polls localStorage to check if the payment was "completed" on the mobile page.
    const interval = setInterval(() => {
      try {
        const status = localStorage.getItem(`payment_${transactionId}`);
        if (status === 'PAID') {
          clearInterval(interval);
          localStorage.removeItem(`payment_${transactionId}`); // Clean up
          router.push(`/checkout/confirmation?eventId=${eventId}&total=${total}`);
        }
      } catch (error) {
        console.error("Could not access localStorage:", error);
        clearInterval(interval);
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [transactionId, eventId, total, router]);
}


function PaymentFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const eventId = searchParams.get('eventId');
  const ticketsParam = searchParams.get('tickets');
  
  // Generate a unique ID for this transaction
  const [transactionId] = useState(() => `txn_${Date.now()}`);

  
  useEffect(() => {
     // Set initial payment status to PENDING
     try {
        localStorage.setItem(`payment_${transactionId}`, 'PENDING');
     } catch (error) {
        console.error("Could not access localStorage:", error);
     }
  }, [transactionId]);

  
  if (!eventId || !ticketsParam) {
    return notFound();
  }
  const event = getEventById(eventId);
  if (!event) {
    return notFound();
  }
  
  const selectedTickets = ticketsParam.split(',').map(t => {
    const [ticketId, quantity] = t.split(':');
    const ticketInfo = event.tickets.find(ti => ti.id === ticketId);
    return { ...ticketInfo, quantity: parseInt(quantity, 10) };
  });

  const subtotal = selectedTickets.reduce((acc, ticket) => acc + (ticket.price || 0) * ticket.quantity, 0);
  const processingFee = subtotal * 0.05;
  const total = subtotal + processingFee;
  
  // Start polling for payment status, now passing total
  usePaymentStatus(transactionId);

  const mobilePaymentUrl = `/checkout/pay-mobile?transactionId=${transactionId}&eventId=${eventId}&total=${total.toFixed(2)}`;

  const handleSimulatePayment = () => {
    window.open(mobilePaymentUrl, '_blank', 'noopener,noreferrer');
  }


  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-12 max-w-lg">
          <Link href={`/checkout?eventId=${eventId}&tickets=${ticketsParam}`}>
              <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4"/> Back to Order Summary
              </Button>
          </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Complete Your Payment</CardTitle>
            <CardDescription>Click the button below to open the payment screen and finalize your purchase.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6">
            <div className="p-4 border rounded-lg bg-white flex flex-col items-center gap-4">
                <div className="flex items-center text-muted-foreground">
                    <Laptop className="h-8 w-8 mr-4"/>
                    <div className="h-px w-24 bg-border"/>
                    <Smartphone className="h-8 w-8 ml-4"/>
                </div>
                 <Button size="lg" onClick={handleSimulatePayment}>
                    Simulate Mobile Payment
                </Button>
                 <p className="text-xs text-muted-foreground text-center max-w-xs">
                    This will open the payment confirmation page in a new tab.
                </p>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground animate-pulse">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Waiting for payment...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentFlow />
        </Suspense>
    )
}
