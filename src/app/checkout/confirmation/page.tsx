
'use client';

import { Suspense } from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import { getEventById } from '@/lib/mock-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, Ticket } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';

function Confirmation() {
    const searchParams = useSearchParams();
    const eventId = searchParams.get('eventId');
    
    if (!eventId) {
        return notFound();
    }

    const event = getEventById(eventId);
    if (!event) {
        return notFound();
    }

    return (
        <>
            <SiteHeader />
            <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <Card className="w-full max-w-lg text-center animate-fade-in">
                    <CardHeader className="items-center">
                        <div className="p-3 bg-green-100 rounded-full mb-4">
                           <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                        <CardTitle className="text-3xl">Payment Successful!</CardTitle>
                        <CardDescription>Your booking for <span className="font-semibold text-primary">{event.title}</span> is confirmed.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            Your tickets have been sent to your email address. You can also view them in your dashboard.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                           <Link href="/attendee">
                             <Button variant="outline">
                                <Ticket className="mr-2 h-4 w-4" />
                                View My Tickets
                             </Button>
                           </Link>
                           <Link href="/">
                             <Button>
                                <Home className="mr-2 h-4 w-4" />
                                Back to Homepage
                             </Button>
                           </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Confirmation />
        </Suspense>
    )
}
