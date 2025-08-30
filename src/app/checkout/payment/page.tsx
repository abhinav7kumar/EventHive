
'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import { getEventById } from '@/lib/mock-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';

function PaymentQRCode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const eventId = searchParams.get('eventId');
  const ticketsParam = searchParams.get('tickets');

  useEffect(() => {
    // Simulate scanning the QR code and payment processing.
    const timer = setTimeout(() => {
      if (eventId) {
        router.push(`/checkout/confirmation?eventId=${eventId}`);
      }
    }, 4000); // 4-second delay to simulate scanning and payment

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [eventId, router]);


  if (!eventId || !ticketsParam) {
    return notFound();
  }
  const event = getEventById(eventId);
  if (!event) {
    return notFound();
  }

  const qrData = {
    eventId,
    tickets: ticketsParam,
    total: 'CalculatedTotal' // In a real app, you'd pass the total amount here
  }
  const encodedQrData = encodeURIComponent(JSON.stringify(qrData));


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
            <CardDescription>Use your mobile payment app to scan the QR code below.</CardDescription>
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
                <p>Waiting for payment confirmation...</p>
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
            <PaymentQRCode />
        </Suspense>
    )
}
