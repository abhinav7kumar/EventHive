
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/event-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Calendar,
  MapPin,
  Search,
  Ticket,
  Music,
  Zap,
  Palette,
  Utensils,
  Landmark,
} from 'lucide-react';
import { getCategories } from '@/lib/mock-data';
import type { Event, EventCategory } from '@/types';
import { AiRecommendations } from './ai-recommendations';

const categoryIcons: Record<EventCategory, React.ElementType> = {
  Music: Music,
  Sports: Zap,
  Technology: Zap,
  Conference: Landmark,
  Arts: Palette,
  Food: Utensils,
};

export function HomePageClient({
  allEvents,
  featuredEvents,
  trendingEvents,
  aiRecommendation,
}: {
  allEvents: Event[];
  featuredEvents: Event[];
  trendingEvents: Event[];
  aiRecommendation: string;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const categories = ['All', ...getCategories()];

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const matchesCategory =
        selectedCategory === 'All' || event.category === selectedCategory;
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allEvents, searchTerm, selectedCategory]);

  return (
    <div className="flex flex-col min-h-dvh">
      <section className="relative w-full h-[60vh] md:h-[70vh] text-white">
        <Image
          src="https://picsum.photos/seed/hero/1800/1000"
          alt="Hero background"
          data-ai-hint="concert crowd"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg font-headline">
            Find Your Next Experience
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow-md">
            Discover, book, and enjoy unforgettable events.
          </p>
          <form className="mt-8 w-full max-w-lg bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-lg flex flex-col sm:flex-row items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-background" />
              <Input
                type="text"
                placeholder="Search by event, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 h-12 text-base text-white placeholder:text-white/80 border-none rounded-full bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="rounded-full h-12 px-8 bg-primary hover:bg-primary/90 w-full sm:w-auto"
            >
              Search
            </Button>
          </form>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {featuredEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Featured Events</h2>
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full"
            >
              <CarouselContent>
                {featuredEvents.map((event) => (
                  <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <EventCard event={event} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-4" />
              <CarouselNext className="hidden sm:flex -right-4" />
            </Carousel>
          </section>
        )}

        {trendingEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingEvents.slice(0, 4).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}
        
        <AiRecommendations recommendation={aiRecommendation} />

        <section id="events" className="mt-16">
          <h2 className="text-3xl font-bold mb-6">All Events</h2>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map((category) => {
              const Icon = categoryIcons[category as EventCategory] || Ticket;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category as EventCategory | 'All')}
                  className="rounded-full"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {category}
                </Button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {filteredEvents.length === 0 && (
            <div className="text-center col-span-full py-16">
              <p className="text-muted-foreground text-lg">No events found. Try a different search or category.</p>
            </div>
          )}
        </section>
        <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg">Load More</Button>
        </div>
      </div>
    </div>
  );
}
