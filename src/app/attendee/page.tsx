import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ticket, Sparkles, MessageSquare, Users, UserPlus } from "lucide-react";
import { getEvents } from "@/lib/mock-data";
import { getAiRecommendation } from "../actions/ai";
import { EventCard } from "@/components/event-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const bookedTickets = [
    { id: '1', title: 'Stellar Sound Fest', date: 'Aug 15, 2024', location: 'Greenfield Valley, CA', quantity: 2 },
    { id: '5', title: 'Modern Art Showcase', date: 'Aug 1, 2024', location: 'The Grand Gallery', quantity: 1 }
];

const communityGroups = [
    { eventId: '1', eventName: 'Stellar Sound Fest', members: 128, description: 'Connect with fellow music lovers!' },
    { eventId: '2', eventName: 'AI & The Future of Tech', members: 450, description: 'Discuss the latest in AI.' }
]

const recentChats = [
    { name: 'Jane Doe', message: 'Excited for the keynote!', avatar: 'https://i.pravatar.cc/150?u=jane' },
    { name: 'John Smith', message: 'See you at the workshop.', avatar: 'https://i.pravatar.cc/150?u=john' }
]

export default async function AttendeeDashboardPage() {
  const aiRecommendation = await getAiRecommendation();
  const recommendedEvents = getEvents().slice(3,5);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Attendee Dashboard</h1>

      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-[800px]">
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="recommendations">For You</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
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
        <TabsContent value="recommendations">
            <Card className="mt-6 bg-accent/20 border-accent/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Sparkles className="h-6 w-6 text-accent"/>AI Recommendations</CardTitle>
                    <CardDescription>{aiRecommendation}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendedEvents.map(event => <EventCard key={event.id} event={event} />)}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="community">
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Groups</CardTitle>
                            <CardDescription>Join discussions for events you're attending.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {communityGroups.map(group => (
                                <div key={group.eventId} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                                    <div>
                                        <h3 className="font-semibold">{group.eventName}</h3>
                                        <p className="text-sm text-muted-foreground">{group.description}</p>
                                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                                            <Users className="h-4 w-4 mr-1"/>
                                            {group.members} members
                                        </div>
                                    </div>
                                    <Button>Join Group</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Connections</CardTitle>
                            <CardDescription>Chat with other attendees.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recentChats.map(chat => (
                                <div key={chat.name} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50">
                                    <Avatar>
                                        <AvatarImage src={chat.avatar} />
                                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{chat.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full">
                                <MessageSquare className="mr-2"/> View All Chats
                            </Button>
                        </CardContent>
                    </Card>
                </div>
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
