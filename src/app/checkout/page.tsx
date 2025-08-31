
'use client';

import { Suspense } from 'react';
import { useSearchParams, notFound, useRouter } from 'next/navigation';
import { getEventById } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Ticket } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import Link from 'next/link';

function Checkout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get('eventId');
  const ticketsParam = searchParams.get('tickets');

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
  const processingFee = subtotal * 0.05; // 5% processing fee
  const total = subtotal + processingFee;

  const handleProceedToPayment = () => {
    router.push(`/checkout/payment?eventId=${eventId}&tickets=${ticketsParam}`);
  };

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Link href={`/events/${event.id}`}>
          <Button variant="ghost" className="mb-4">
              <ArrowRight className="mr-2 h-4 w-4 transform rotate-180" /> Back to Event
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-8">Review your order before proceeding to payment.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl"><Ticket /> Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {selectedTickets.map(ticket => (
                            <div key={ticket.id} className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{ticket.name} x{ticket.quantity}</p>
                                    <p className="text-sm text-muted-foreground">₹{ticket.price?.toFixed(2)} each</p>
                                </div>
                                <p className="font-semibold">₹{((ticket.price || 0) * ticket.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            
            <div className="lg:sticky lg:top-24 self-start">
                <Card>
                    <CardHeader>
                        <CardTitle>Total</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p>₹{subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Processing Fee</p>
                            <p>₹{processingFee.toFixed(2)}</p>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <p>Total Amount</p>
                            <p>₹{total.toFixed(2)}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg" onClick={handleProceedToPayment}>
                            Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </div>
    </>
  );
}


export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Checkout />
        </Suspense>
    )
}
