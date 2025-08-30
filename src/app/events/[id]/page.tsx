import { getEventById } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, User, Tag, Ticket, Plus, Minus, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-[40vh] md:h-[60vh] rounded-lg overflow-hidden shadow-lg mb-8">
        <Image
          src={event.image}
          alt={event.title}
          data-ai-hint={`${event.category.toLowerCase()}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <Badge className="text-lg mb-2">{event.category}</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white font-headline shadow-md">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6 text-lg text-foreground/80">
              {event.description}
            </CardContent>
          </Card>

          {event.schedule && event.schedule.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {event.schedule.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="text-base font-semibold">
                        {item.time} - {item.activity}
                      </AccordionTrigger>
                      <AccordionContent>
                        More details about this part of the event can be added here.
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}

          {event.speakers && event.speakers.length > 0 && (
             <Card>
             <CardHeader>
               <CardTitle>Speakers</CardTitle>
             </CardHeader>
             <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.speakers.map((speaker) => (
                    <div key={speaker.name} className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={speaker.avatar} alt={speaker.name}/>
                            <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold">{speaker.name}</p>
                            <p className="text-sm text-muted-foreground">{speaker.title}</p>
                        </div>
                    </div>
                ))}
             </CardContent>
           </Card>
          )}

        </div>

        <div className="space-y-6 lg:sticky lg:top-24 self-start">
            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                        <Calendar className="h-5 w-5 mt-1 text-primary"/>
                        <div>
                            <p className="font-semibold">Date & Time</p>
                            <p className="text-muted-foreground">{format(new Date(event.date), 'PPPP p')}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 mt-1 text-primary"/>
                        <div>
                            <p className="font-semibold">{event.venue.name}</p>
                            <p className="text-muted-foreground">{event.venue.address}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <User className="h-5 w-5 mt-1 text-primary"/>
                        <div>
                            <p className="font-semibold">Organizer</p>
                            <p className="text-muted-foreground">{event.organizer}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Ticket className="h-6 w-6" />
                        Get Your Tickets
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   {event.tickets.map(ticket => (
                    <div key={ticket.id} className="flex justify-between items-center p-3 rounded-lg border">
                        <div>
                            <p className="font-semibold">{ticket.name}</p>
                            <p className="text-sm font-bold text-primary">${ticket.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8"><Minus className="h-4 w-4"/></Button>
                            <span className="font-bold w-4 text-center">1</span>
                             <Button variant="outline" size="icon" className="h-8 w-8"><Plus className="h-4 w-4"/></Button>
                        </div>
                    </div>
                   ))}
                   <Separator/>
                   <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>${event.tickets[0].price.toFixed(2)}</p>
                   </div>
                   <Link href={event.externalLink} className="w-full">
                    <Button className="w-full" size="lg">Register Now</Button>
                   </Link>
                </CardContent>
            </Card>

            <div className="text-center">
                <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4"/>
                    Share Event
                </Button>
            </div>
        </div>

      </div>
    </div>
  );
}
