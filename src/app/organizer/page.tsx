
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getEvents } from "@/lib/mock-data";
import { PlusCircle, Edit, BarChart3, Users, Ticket, Percent, QrCode, Star, Download, DollarSign, Activity, Gift } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCoupons } from "@/context/CouponContext";
import { useToast } from "@/hooks/use-toast";

export default function OrganizerDashboardPage() {
    const myEvents = getEvents().slice(0, 3); // Mock data for organizer's events
    const { addCoupon } = useCoupons();
    const { toast } = useToast();

    const [isCouponDialogOpen, setIsCouponDialogOpen] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [selectedEventId, setSelectedEventId] = useState('');


    const handleCreateCoupon = () => {
        if (!couponCode || !discount || !selectedEventId) {
            toast({
                title: "Error",
                description: "Please fill out all coupon details.",
                variant: "destructive",
            });
            return;
        }

        const newCoupon = {
            id: `coupon-${Date.now()}`,
            code: couponCode,
            discount: parseInt(discount, 10),
            eventId: selectedEventId,
        };

        addCoupon(newCoupon);

        toast({
            title: "Coupon Created!",
            description: `Code "${couponCode}" for ${discount}% off has been activated.`,
        });

        // Reset and close
        setCouponCode('');
        setDiscount('');
        setSelectedEventId('');
        setIsCouponDialogOpen(false);
    };

    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
                        <p className="text-muted-foreground">Your Event Manager's Toolkit</p>
                    </div>
                    <Link href="/create-event">
                        <Button size="lg">
                            <PlusCircle className="mr-2 h-5 w-5" /> Create New Event
                        </Button>
                    </Link>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <p className="text-xs text-muted-foreground">Earnings from all events</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
                            <Ticket className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2,150</div>
                            <p className="text-xs text-muted-foreground">Across all your events</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Live Check-ins</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+1,232</div>
                            <p className="text-xs text-muted-foreground">From active events</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.8/5</div>
                            <p className="text-xs text-muted-foreground">From attendee feedback</p>
                        </CardContent>
                    </Card>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center">
                                <div>
                                    <CardTitle>My Events</CardTitle>
                                    <CardDescription>Manage your upcoming and past events.</CardDescription>
                                </div>
                                 <Button variant="outline" size="sm">View All</Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Event</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Sold</TableHead>
                                            <TableHead>Revenue</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {myEvents.map(event => (
                                            <TableRow key={event.id}>
                                                <TableCell className="font-medium">{event.title}</TableCell>
                                                <TableCell><Badge variant="default">Live</Badge></TableCell>
                                                <TableCell>850 / 1000</TableCell>
                                                <TableCell>$12,500</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon"><BarChart3 className="h-4 w-4"/></Button>
                                                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Attendee Management</CardTitle>
                                <CardDescription>View and manage your attendees.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">Export your full attendee list.</p>
                                    <Button variant="outline">
                                        <Download className="mr-2 h-4 w-4"/>
                                        Export as CSV
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    
                    {/* Side Column */}
                    <div className="space-y-8">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Percent /> Promotions & Discounts</CardTitle>
                            <CardDescription>Boost sales with special offers.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                             <Dialog open={isCouponDialogOpen} onOpenChange={setIsCouponDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start">Create Coupon</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Create New Coupon</DialogTitle>
                                        <DialogDescription>
                                            Create a discount code for a specific event to drive sales.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="code" className="text-right">Code</Label>
                                            <Input id="code" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} className="col-span-3" placeholder="e.g., SUMMER20"/>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="discount" className="text-right">Discount (%)</Label>
                                            <Input id="discount" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="col-span-3" placeholder="e.g., 20" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="event" className="text-right">Event</Label>
                                            <Select onValueChange={setSelectedEventId} value={selectedEventId}>
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select an event" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {myEvents.map(event => (
                                                        <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleCreateCoupon}>Create Coupon</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Link href="/organizer/discounts" className="w-full">
                                <Button variant="outline" className="w-full justify-start">Manage Discounts</Button>
                            </Link>
                          </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Gift /> Referral Rewards</CardTitle>
                                <CardDescription>Incentivize word-of-mouth marketing.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/organizer/referrals">
                                    <Button variant="outline" className="w-full">Set Up a Program</Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><QrCode/> Event Check-in</CardTitle>
                                <CardDescription>Manage attendee entry at your venue.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="/organizer/check-in">
                                    <Button className="w-full">Launch Check-in Scanner</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );

    
}
