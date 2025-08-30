
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCoupons } from "@/context/CouponContext";
import { getEventById } from "@/lib/mock-data";
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

export default function ManageDiscountsPage() {
  const { coupons } = useCoupons();

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
                                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                                            <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
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
  );
}
