'use client';

import React from 'react';
import Image from 'next/image';
import { Ticket, Calendar, MapPin, User, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface TicketStubProps {
    ticket: any;
}

export const TicketStub = React.forwardRef<HTMLDivElement, TicketStubProps>(({ ticket }, ref) => {
    const qrData = {
        ticketId: ticket.id,
        event: ticket.title,
        date: ticket.date,
        location: ticket.location,
        attendee: 'John Doe', // This is currently hardcoded
        quantity: ticket.quantity || 1
    };
    const encodedQrData = encodeURIComponent(JSON.stringify(qrData));

    return (
        <div ref={ref} className="bg-card text-card-foreground rounded-2xl shadow-lg w-full max-w-sm mx-auto font-sans">
            <div className="p-6">
                <div className="flex justify-between items-center pb-4 border-b border-dashed">
                    <div className="flex items-center gap-2">
                        <Ticket className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-bold text-primary">EventSpotlight</h2>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Admit One</p>
                        <p className="text-sm font-semibold">x{ticket.quantity || 1} Ticket(s)</p>
                    </div>
                </div>
                <div className="pt-6">
                    <p className="text-xs text-muted-foreground uppercase">Event</p>
                    <h3 className="text-2xl font-bold leading-tight">{ticket.title}</h3>
                    
                    <div className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{ticket.date ? format(new Date(ticket.date), 'EEEE, MMMM d, yyyy') : 'Date not set'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{ticket.location}</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{ticket.date ? format(new Date(ticket.date), 'p') : 'Time not set'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <div className="w-10 h-10 bg-background rounded-full -mr-5 z-10" />
                <div className="w-full border-t border-dashed" />
                <div className="w-10 h-10 bg-background rounded-full -ml-5 z-10" />
            </div>

            <div className="p-6 flex items-center gap-4">
                <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodedQrData}`}
                    alt="Ticket QR Code"
                    width={100}
                    height={100}
                    className="rounded-lg border p-1"
                    data-ai-hint="qr code"
                />
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">Attendee</p>
                    <p className="font-bold text-lg">John Doe</p>
                    <p className="text-xs text-muted-foreground">Booking ID: #{ticket.id.toUpperCase()}</p>
                </div>
            </div>
        </div>
    );
});

TicketStub.displayName = 'TicketStub';
