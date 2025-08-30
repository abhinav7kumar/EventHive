'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Ticket, Sparkles, MessageSquare, Users, UserPlus, QrCode, X, Download, ExternalLink } from "lucide-react";
import { getEvents } from "@/lib/mock-data";
import { getAiRecommendation } from "../actions/ai";
import { EventCard } from "@/components/event-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEvents } from "@/context/EventContext";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import html2canvas from 'html2canvas';
import { TicketStub } from "@/components/ticket-stub";
import Link from "next/link";

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

export default function AttendeeDashboardPage() {
  const { newEvents } = useEvents();
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const recommendedEvents = getEvents().slice(3,5);
  const ticketRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    async function fetchRecommendation() {
        const recommendation = await getAiRecommendation();
        setAiRecommendation(recommendation);
    }
    fetchRecommendation();
  }, []);

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsTicketModalOpen(true);
  }

  const handleDownloadImage = async () => {
    const ticketElement = ticketRef.current;
    if (!ticketElement) return;
    
    // This function waits for all images inside an element to load
    const waitForImages = (element: HTMLElement) => {
        const images = Array.from(element.getElementsByTagName('img'));
        const promises = images.map(img => {
            return new Promise((resolve, reject) => {
                if (img.complete && img.naturalHeight !== 0) {
                    resolve(true);
                } else {
                    img.onload = () => resolve(true);
                    img.onerror = reject;
                }
            });
        });
        return Promise.all(promises);
    };

    try {
        // Wait for images to load before capturing
        await waitForImages(ticketElement);
        // Add a small extra delay just in case, for rendering quirks
        await new Promise(resolve => setTimeout(resolve, 500));

        const canvas = await html2canvas(ticketElement, {
            scale: 4, // Higher scale for better quality
            useCORS: true, // Needed for external images
        });

        const imgData = canvas.toDataURL('image/png');
        
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `ticket-${selectedTicket.title.replace(/\s/g, '-')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error("Failed to download image", error);
    }
  }

  return (
    <>
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
              {[...bookedTickets, ...newEvents].map((ticket: any) => (
                  <Card key={ticket.id}>
                      <CardHeader>
                          <CardTitle>{ticket.title}</CardTitle>
                          <CardDescription>{ticket.date ? new Date(ticket.date).toLocaleDateString() : 'Date not set'} - {ticket.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div className="flex items-center gap-2 text-primary font-semibold">
                              <Ticket className="h-5 w-5"/>
                              <p>x{ticket.quantity || 1} Tickets</p>
                          </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                          <Button variant="outline" className="w-full" asChild>
                              <Link href={`/events/${ticket.id}`}><ExternalLink className="mr-2 h-4 w-4" />View Event</Link>
                          </Button>
                          <Button className="w-full" onClick={() => handleViewTicket(ticket)}>View Ticket</Button>
                      </CardFooter>
                  </Card>
              ))}
              {bookedTickets.length === 0 && newEvents.length === 0 && (
                  <p className="col-span-full text-center text-muted-foreground mt-8">You have no upcoming events.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="recommendations">
              <Card className="mt-6 bg-accent/20 border-accent/50">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Sparkles className="h-6 w-6 text-accent"/>AI Recommendations</CardTitle>
                      <CardDescription>{aiRecommendation || "Our top picks for you based on your interests."}</CardDescription>
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

      {selectedTicket && (
        <Dialog open={isTicketModalOpen} onOpenChange={setIsTicketModalOpen}>
            <DialogContent className="sm:max-w-md bg-transparent shadow-none border-none">
                <TicketStub ref={ticketRef} ticket={selectedTicket} />
                <DialogFooter className="pt-4 flex-row justify-center sm:justify-center">
                    <Button variant="secondary" onClick={() => setIsTicketModalOpen(false)}>Close</Button>
                    <Button onClick={handleDownloadImage}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Image
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}
    </>
  );
}
