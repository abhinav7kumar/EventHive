
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import { getEventById } from '@/lib/mock-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Info } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function usePaymentStatus(transactionId: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');

  useEffect(() => {
    if (!transactionId) return;

    // This function polls localStorage to check if the payment was "completed" on the mobile page.
    const interval = setInterval(() => {
      try {
        const status = localStorage.getItem(`payment_${transactionId}`);
        if (status === 'PAID') {
          clearInterval(interval);
          localStorage.removeItem(`payment_${transactionId}`); // Clean up
          router.push(`/checkout/confirmation?eventId=${eventId}`);
        }
      } catch (error) {
        console.error("Could not access localStorage:", error);
        clearInterval(interval);
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [transactionId, eventId, router]);
}


function PaymentQRCode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const eventId = searchParams.get('eventId');
  const ticketsParam = searchParams.get('tickets');
  
  // Generate a unique ID for this transaction
  const [transactionId] = useState(() => `txn_${Date.now()}`);

  // Start polling for payment status
  usePaymentStatus(transactionId);
  
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
  
  // !! IMPORTANT FOR LOCAL TESTING !!
  // Replace "YOUR_COMPUTER_IP_ADDRESS" with your actual local IP address.
  // Your computer and phone must be on the same Wi-Fi network.
  // The port should match the one your Next.js app is running on (e.g., 9002).
  const localIpAddress = "YOUR_COMPUTER_IP_ADDRESS"; 
  const port = "9002";
  const mobilePaymentUrl = `http://${localIpAddress}:${port}/checkout/pay-mobile?transactionId=${transactionId}&eventId=${eventId}&total=${total.toFixed(2)}`;
  const encodedQrData = encodeURIComponent(mobilePaymentUrl);


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
            <CardTitle>Scan to Pay</CardTitle>
            <CardDescription>Use your mobile phone's camera to scan the QR code and complete the payment.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6">
            <div className="p-4 border rounded-lg bg-white">
                 <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedQrData}`}
                    alt="Payment QR Code"
                    width={250}
                    height={250}
                    data-ai-hint="qr code"
                />
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground animate-pulse">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Waiting for payment...</p>
            </div>
             <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>How to Test Locally</AlertTitle>
                <AlertDescription>
                    To test this, you must replace the placeholder in the code with your computer's local IP address. Then, connect your phone to the same Wi-Fi network as your computer and scan the code.
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentQRCode />
        </Suspense>
    )
}
