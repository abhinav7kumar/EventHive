'use client';

import { useParams, notFound } from 'next/navigation';
import { useReferrals } from '@/context/ReferralContext';
import { getEventById } from '@/lib/mock-data';
import Image from 'next/image';
import { Ticket, Calendar, MapPin, Percent, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function ReferralLandingPage() {
    const { programId } = useParams();
    const { programs } = useReferrals();
    
    const program = programs.find(p => p.id === programId);
    
    if (!program) {
        // You could show a generic "invalid link" page here
        return notFound();
    }
    
    const event = getEventById(program.eventId);

    if (!event) {
        return notFound();
    }

    return (
        <div className="bg-muted/40 min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full animate-fade-in">
                <CardHeader className="text-center p-6">
                    <p className="text-sm text-primary font-semibold">YOU'VE BEEN REFERRED!</p>
                    <CardTitle className="text-3xl">You Get a Discount!</CardTitle>
                    <CardDescription>Your friend invited you to {event.title}. Claim your discount below.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="bg-card text-card-foreground rounded-2xl shadow-lg w-full max-w-sm mx-auto font-sans border overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center pb-4 border-b border-dashed">
                                <div className="flex items-center gap-2">
                                    <Ticket className="h-6 w-6 text-primary" />
                                    <h2 className="text-xl font-bold text-primary">EventSpotlight</h2>
                                </div>
                                 <Badge variant="outline" className="text-lg border-primary text-primary">
                                    <Percent className="h-4 w-4 mr-1"/> {program.friendDiscount}% OFF
                                </Badge>
                            </div>
                            <div className="pt-6">
                                <p className="text-xs text-muted-foreground uppercase">Event</p>
                                <h3 className="text-2xl font-bold leading-tight">{event.title}</h3>
                                
                                <div className="mt-4 space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{event.date ? format(new Date(event.date), 'EEEE, MMMM d, yyyy') : 'Date not set'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-muted/50 p-6">
                             <Link href={`/events/${event.id}`}>
                                <Button className="w-full" size="lg">
                                    Claim Your Discount <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </Link>
                            <p className="text-xs text-muted-foreground text-center mt-2">Discount will be applied at checkout.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
