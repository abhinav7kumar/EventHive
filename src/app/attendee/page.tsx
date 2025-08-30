
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
import jsPDF from 'jspdf';
import { TicketStub } from "@/components/ticket-stub";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const bookedTickets = [
    { id: '1', title: 'Odoo X CGC Mohali Hackathon 2025', date: 'Aug 30, 2025', location: 'Mohali, Punjab', quantity: 4 }
];

const communityGroups = [
    { eventId: '1', eventName: 'Odoo X CGC', members: 3, description: 'Connect with fellow hackathon lovers!', link: 'https://chat.whatsapp.com/GE4pWuwBLm10kRzDlDW848?mode=ems_copy_t' }
];

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

  const handleDownloadPdf = async () => {
    const ticketElement = ticketRef.current;
    if (!ticketElement) return;

    const waitForImages = (element: HTMLElement) => {
        const images = Array.from(element.getElementsByTagName('img'));
        const promises = images.map(img => {
            return new Promise((resolve, reject) => {
                if (img.complete && img.naturalHeight !== 0) {
                    resolve(true);
                } else {
                    img.onload = () => resolve(true);
                    img.onerror = () => reject(new Error(`Failed to load image: ${img.src}`));
                }
            });
        });
        return Promise.all(promises);
    };

    try {
        await waitForImages(ticketElement);
        // A small delay to ensure rendering is complete after images load
        await new Promise(resolve => setTimeout(resolve, 200));

        const canvas = await html2canvas(ticketElement, {
            scale: 2,
            useCORS: true, 
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`ticket-${selectedTicket.title.replace(/\s/g, '-')}.pdf`);

    } catch (error) {
        console.error("Failed to download PDF", error);
    }
  };


  return (
    <>
      <SiteHeader />
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
                   <CardFooter>
                      <Link href="/events" className="w-full">
                        <Button variant="outline" className="w-full">Browse All Events</Button>
                      </Link>
                  </CardFooter>
              </Card>
          </TabsContent>
          <TabsContent value="community">
              <div className="mt-6">
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
                                  {group.link ? (
                                    <Link href={group.link} target="_blank" rel="noopener noreferrer">
                                        <Button>Join Group</Button>
                                    </Link>
                                  ) : (
                                    <Button>Join Group</Button>
                                  )}
                              </div>
                          ))}
                      </CardContent>
                  </Card>
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
                    <Button onClick={handleDownloadPdf}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}
    </>
  );
}
