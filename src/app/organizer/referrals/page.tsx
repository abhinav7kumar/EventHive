
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Gift, Percent, Users, Share2 } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEventById, getEvents } from "@/lib/mock-data";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReferrals, ReferralProgram } from "@/context/ReferralContext";

export default function ManageReferralsPage() {
    const myEvents = getEvents().slice(0, 3);
    const { toast } = useToast();
    const { programs, addProgram } = useReferrals();

    const [selectedEventId, setSelectedEventId] = useState('');
    const [friendDiscount, setFriendDiscount] = useState('');
    const [advocateReward, setAdvocateReward] = useState('');
    
    const handleActivateProgram = () => {
        if (!selectedEventId || !friendDiscount || !advocateReward) {
            toast({
                title: "Incomplete Form",
                description: "Please fill out all fields to activate the program.",
                variant: "destructive",
            });
            return;
        }

        const eventName = myEvents.find(e => e.id === selectedEventId)?.title || "the selected event";
        
        const newProgram: ReferralProgram = {
            id: `ref-${Date.now()}`,
            eventId: selectedEventId,
            friendDiscount: parseInt(friendDiscount, 10),
            advocateReward: parseInt(advocateReward, 10),
        };

        addProgram(newProgram);

        toast({
            title: "Referral Program Activated!",
            description: `Attendees for "${eventName}" can now refer friends.`,
        });

        // Reset form
        setSelectedEventId('');
        setFriendDiscount('');
        setAdvocateReward('');
    };

    const handleShare = (program: ReferralProgram) => {
        const event = getEventById(program.eventId);
        if (!event) return;

        const referralLink = `${window.location.origin}/referral/${program.id}`;
        
        const message = `Hey! Check out this event: "${event.title}". Use my referral to get ${program.friendDiscount}% off your ticket! ${referralLink}`;
        
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    };

  return (
    <div className="bg-muted/40 min-h-screen">
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <Link href="/organizer">
                    <Button variant="ghost">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card className="max-w-4xl mx-auto w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Gift className="h-6 w-6 text-primary"/>
                            Create a Referral Program
                        </CardTitle>
                        <CardDescription>Reward your attendees for spreading the word and drive ticket sales.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-2">
                            <Label htmlFor="event">Select Event</Label>
                            <Select onValueChange={setSelectedEventId} value={selectedEventId}>
                                <SelectTrigger id="event">
                                    <SelectValue placeholder="Choose an event to apply the program to" />
                                </SelectTrigger>
                                <SelectContent>
                                    {myEvents.map(event => (
                                        <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Users className="h-5 w-5"/> Friend's Incentive</h3>
                            <p className="text-sm text-muted-foreground mb-4">The discount the new attendee receives when they use a referral code.</p>
                            <div className="flex items-center gap-4">
                                <Input id="friend-discount" type="number" placeholder="e.g., 15" className="max-w-xs" value={friendDiscount} onChange={(e) => setFriendDiscount(e.target.value)} />
                                <Percent className="h-5 w-5 text-muted-foreground"/>
                                <Label htmlFor="friend-discount" className="whitespace-nowrap">Discount on their ticket</Label>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Gift className="h-5 w-5"/> Advocate's Reward</h3>
                            <p className="text-sm text-muted-foreground mb-4">The reward the original attendee gets after their friend makes a purchase.</p>
                             <div className="flex items-center gap-4">
                                <Input id="advocate-reward" type="number" placeholder="e.g., 20" className="max-w-xs" value={advocateReward} onChange={(e) => setAdvocateReward(e.target.value)}/>
                                <Percent className="h-5 w-5 text-muted-foreground"/>
                                 <Label htmlFor="advocate-reward" className="whitespace-nowrap">Discount on a future event</Label>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button size="lg" onClick={handleActivateProgram}>Activate Referral Program</Button>
                        </div>

                    </CardContent>
                </Card>

                {programs.length > 0 && (
                     <Card>
                        <CardHeader>
                            <CardTitle>Active Referral Programs</CardTitle>
                            <CardDescription>Your currently active referral campaigns.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Event</TableHead>
                                        <TableHead>Friend's Discount</TableHead>
                                        <TableHead>Advocate's Reward</TableHead>
                                        <TableHead className="text-right">Share</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {programs.map(program => {
                                        const event = getEventById(program.eventId);
                                        return (
                                            <TableRow key={program.id}>
                                                <TableCell className="font-medium">{event ? event.title : 'Unknown Event'}</TableCell>
                                                <TableCell className="font-semibold text-primary">{program.friendDiscount}%</TableCell>
                                                <TableCell className="font-semibold text-primary">{program.advocateReward}%</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" onClick={() => handleShare(program)}>
                                                        <Share2 className="h-4 w-4"/>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    </div>
  );
}
