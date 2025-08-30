import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ticket } from "lucide-react";

const bookedTickets = [
    { id: '1', title: 'Stellar Sound Fest', date: 'Aug 15, 2024', location: 'Greenfield Valley, CA', quantity: 2 },
    { id: '5', title: 'Modern Art Showcase', date: 'Aug 1, 2024', location: 'The Grand Gallery', quantity: 1 }
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="history">Booking History</TabsTrigger>
        </TabsList>
        <TabsContent value="tickets">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {bookedTickets.map(ticket => (
                 <Card key={ticket.id}>
                    <CardHeader>
                        <CardTitle>{ticket.title}</CardTitle>
                        <CardDescription>{ticket.date} - {ticket.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 text-primary font-semibold">
                            <Ticket className="h-5 w-5"/>
                            <p>x{ticket.quantity} Tickets</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button className="w-full">View Ticket</Button>
                        <Button variant="outline" className="w-full">Download</Button>
                    </CardFooter>
                 </Card>
            ))}
            {bookedTickets.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground mt-8">You have no upcoming events.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="history">
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Booking History</CardTitle>
                    <CardDescription>A record of all your past event bookings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground py-8">Your booking history will appear here.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
