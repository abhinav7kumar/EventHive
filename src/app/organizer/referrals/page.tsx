
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Gift, Percent, Users } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getEvents } from "@/lib/mock-data";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function ManageReferralsPage() {
    const myEvents = getEvents().slice(0, 3);

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

            <Card className="max-w-4xl mx-auto">
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
                        <Select>
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
                            <Input id="friend-discount" type="number" placeholder="e.g., 15" className="max-w-xs"/>
                            <Percent className="h-5 w-5 text-muted-foreground"/>
                            <Label htmlFor="friend-discount" className="whitespace-nowrap">Discount on their ticket</Label>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2"><Gift className="h-5 w-5"/> Advocate's Reward</h3>
                        <p className="text-sm text-muted-foreground mb-4">The reward the original attendee gets after their friend makes a purchase.</p>
                         <div className="flex items-center gap-4">
                            <Input id="advocate-reward" type="number" placeholder="e.g., 20" className="max-w-xs"/>
                            <Percent className="h-5 w-5 text-muted-foreground"/>
                             <Label htmlFor="advocate-reward" className="whitespace-nowrap">Discount on a future event</Label>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button size="lg">Activate Referral Program</Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    </div>
  );
}
