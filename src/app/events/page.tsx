
import { EventCard } from "@/components/event-card";
import { SiteHeader } from "@/components/site-header";
import { getEvents } from "@/lib/mock-data";

export default function EventsPage() {
    const events = getEvents();

    return (
        <>
            <SiteHeader />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-extrabold mb-8 tracking-tight">All Events</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </>
    );
}
