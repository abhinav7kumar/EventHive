import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import type { Event } from '@/types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <div className="relative w-full h-48">
          <Image
            src={event.image}
            alt={event.title}
            data-ai-hint={`${event.category.toLowerCase()}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            className="absolute top-3 right-3 bg-accent text-accent-foreground"
            variant="secondary"
          >
            {event.category}
          </Badge>
        </div>
        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold truncate">{event.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 h-10 overflow-hidden">
              {event.shortDescription}
            </p>
          </div>
          <div className="mt-4 text-sm text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(event.date), 'eee, MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
