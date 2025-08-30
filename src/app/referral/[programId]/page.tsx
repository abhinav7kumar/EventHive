
'use client';

import { useReferrals } from '@/context/ReferralContext';
import { getEventById } from '@/lib/mock-data';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Ticket, Calendar, MapPin, Percent, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import Link from 'next/link';

export default function ReferralLandingPage() {
  const { programId } = useParams();
  const { programs } = useReferrals();

  // Find the program. Note: In a real app, you'd fetch this from a DB.
  const program = programs.find(p => p.id === programId);

  if (!program) {
    // A simple fallback if the program isn't found in the context state.
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 p-4 text-center">
            <Ticket className="h-16 w-16 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">Referral Not Found</h1>
            <p className="text-muted-foreground mb-6">This referral link may be expired or invalid.</p>
            <Link href="/">
                <Button>
                    <Home className="mr-2" />
                    Go to Homepage
                </Button>
            </Link>
        </div>
    )
  }

  const event = getEventById(program.eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-2xl animate-fade-in">
        <div className="relative">
          <Image
            src={event.image}
            alt={event.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90 text-primary font-bold py-1 px-3">
                  EXCLUSIVE REFERRAL
              </Badge>
          </div>
        </div>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground font-medium">You're invited to</p>
          <h1 className="text-3xl font-extrabold my-2">{event.title}</h1>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(event.date), 'eee, MMM d, yyyy')}</span>
          </div>
           <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>

          <div className="my-8 p-6 bg-accent/10 border-2 border-dashed border-accent rounded-xl">
            <h2 className="text-xl font-bold text-accent">Your Reward!</h2>
            <p className="text-5xl font-black text-primary my-2">{program.friendDiscount}% OFF</p>
            <p className="text-muted-foreground">your ticket purchase!</p>
          </div>

          <Link href={`/events/${event.id}?ref=${program.id}`} className="w-full">
            <Button size="lg" className="w-full text-lg h-12 group">
              Claim Your Discount
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1"/>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

// Minimal badge component to avoid circular dependency
function Badge({className, children, variant}: {className?: string, children: React.ReactNode, variant?: string}) {
    return <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}>{children}</div>
}
