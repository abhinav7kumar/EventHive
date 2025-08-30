
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCoupons, Coupon } from "@/context/CouponContext";
import { getEventById, getEvents } from "@/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function ManageDiscountsPage() {
  const { coupons, updateCoupon, deleteCoupon } = useCoupons();
  const myEvents = getEvents().slice(0, 3);
  const { toast } = useToast();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');

  const handleEditClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setCouponCode(coupon.code);
    setDiscount(coupon.discount.toString());
    setSelectedEventId(coupon.eventId);
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (!selectedCoupon) return;

    if (!couponCode || !discount || !selectedEventId) {
        toast({
            title: "Error",
            description: "Please fill out all coupon details.",
            variant: "destructive",
        });
        return;
    }
    
    const updatedCoupon: Coupon = {
        ...selectedCoupon,
        code: couponCode,
        discount: parseInt(discount, 10),
        eventId: selectedEventId,
    };

    updateCoupon(updatedCoupon);

    toast({
        title: "Coupon Updated!",
        description: `Changes to "${couponCode}" have been saved.`,
    });
    
    setIsEditDialogOpen(false);
    setSelectedCoupon(null);
  };
  
  const handleDeleteClick = (couponId: string) => {
    deleteCoupon(couponId);
    toast({
        title: "Coupon Deleted",
        description: "The coupon has been successfully removed.",
    });
  };

  return (
    <>
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

            <Card>
                <CardHeader>
                    <CardTitle>Manage Discounts</CardTitle>
                    <CardDescription>View, edit, or delete your active and past coupon codes.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Discount</TableHead>
                                <TableHead>Event</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coupons.map(coupon => {
                                const event = getEventById(coupon.eventId);
                                return (
                                    <TableRow key={coupon.id}>
                                        <TableCell className="font-medium"><Badge variant="outline">{coupon.code}</Badge></TableCell>
                                        <TableCell className="font-semibold text-primary">{coupon.discount}%</TableCell>
                                        <TableCell>{event ? event.title : 'All Events'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleEditClick(coupon)}><Edit className="h-4 w-4"/></Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteClick(coupon.id)}><Trash2 className="h-4 w-4"/></Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    {coupons.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>You haven't created any coupons yet.</p>
                            <Link href="/organizer">
                                <Button variant="link">Create one from the dashboard</Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Coupon</DialogTitle>
                <DialogDescription>
                    Make changes to your coupon details below.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">Code</Label>
                    <Input id="code" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="discount" className="text-right">Discount (%)</Label>
                    <Input id="discount" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className="col-span-3" />
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
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button type="submit" onClick={handleSaveChanges}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
