import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getEvents } from "@/lib/mock-data";
import { PlusCircle, Edit, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function OrganizerDashboardPage() {
    const myEvents = getEvents().slice(0, 3); // Mock data for organizer's events

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
                <Link href="/create-event">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Event
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My Events</CardTitle>
                    <CardDescription>Here are the events you are organizing.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {myEvents.map(event => (
                        <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h3 className="font-semibold">{event.title}</h3>
                                <p className="text-sm text-muted-foreground">{event.date}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm"><BarChart3 className="mr-2 h-4 w-4"/>Performance</Button>
                                <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4"/>Edit</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
