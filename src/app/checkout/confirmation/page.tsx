
'use client';

import { Suspense, useRef, useState } from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import { getEventById } from '@/lib/mock-data';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Download, Ticket, Calendar, MapPin, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { TicketStub } from '@/components/ticket-stub';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function Confirmation() {
    const searchParams = useSearchParams();
    const eventId = searchParams.get('eventId');
    const total = searchParams.get('total');
    
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const ticketRef = useRef<HTMLDivElement>(null);
    
    if (!eventId) {
        return notFound();
    }

    const event = getEventById(eventId);
    if (!event) {
        return notFound();
    }

    const mockTicket = {
      id: `ticket-${Date.now()}`,
      title: event.title,
      date: event.date,
      location: event.location,
      quantity: 1, // This is a simplification
    };

    const handleDownloadPdf = async () => {
        const ticketElement = ticketRef.current;
        if (!ticketElement) return;

        const waitForImages = (element: HTMLElement) => {
            const images = Array.from(element.getElementsByTagName('img'));
            const promises = images.map(img => {
                return new Promise((resolve, reject) => {
                    if (img.complete && img.naturalHeight !== 0) resolve(true);
                    else {
                        img.onload = () => resolve(true);
                        img.onerror = reject;
                    }
                });
            });
            return Promise.all(promises);
        };

        try {
            await waitForImages(ticketElement);
            await new Promise(resolve => setTimeout(resolve, 200));

            const canvas = await html2canvas(ticketElement, { scale: 2, useCORS: true });
            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
        
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`ticket-${event.title.replace(/\s/g, '-')}.pdf`);
        } catch (error) {
            console.error("Failed to download PDF", error);
        }
    };

    return (
        <>
            <SiteHeader />
            <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <Card className="w-full max-w-2xl text-center animate-fade-in">
                    <CardHeader className="items-center">
                        <div className="p-3 bg-green-100 rounded-full mb-4">
                           <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                        <CardTitle className="text-3xl">Booking Confirmed!</CardTitle>
                        <CardDescription>Your tickets for <span className="font-semibold text-primary">{event.title}</span> are ready.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 text-left">
                        <div className="border rounded-lg p-4 space-y-4">
                             <div className="flex justify-between items-center">
                                <span className="text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4"/> Event</span>
                                <span className="font-semibold">{event.title}</span>
                            </div>
                            <Separator/>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4"/> Location</span>
                                <span className="font-semibold">{event.location}</span>
                            </div>
                             <Separator/>
                             {total && (
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground flex items-center gap-2"><DollarSign className="h-4 w-4"/> Amount Paid</span>
                                    <span className="font-bold text-primary text-lg">₹{total}</span>
                                </div>
                            )}
                        </div>
                         <div className="flex justify-center gap-4 pt-4">
                           <Link href="/attendee">
                             <Button variant="outline">
                                <Ticket className="mr-2 h-4 w-4" />
                                View in Dashboard
                             </Button>
                           </Link>
                           <Button onClick={() => setIsTicketModalOpen(true)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Ticket
                           </Button>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <p className="text-xs text-muted-foreground text-center w-full">
                            A confirmation has also been sent to your email. You can view all your tickets in your attendee dashboard.
                        </p>
                    </CardFooter>
                </Card>
            </div>
            
            <Dialog open={isTicketModalOpen} onOpenChange={setIsTicketModalOpen}>
                <DialogContent className="sm:max-w-md bg-transparent shadow-none border-none">
                    <TicketStub ref={ticketRef} ticket={mockTicket} />
                    <DialogFooter className="pt-4 flex-row justify-center sm:justify-center">
                        <Button variant="secondary" onClick={() => setIsTicketModalOpen(false)}>Close</Button>
                        <Button onClick={handleDownloadPdf}>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Confirmation />
        </Suspense>
    )
}
