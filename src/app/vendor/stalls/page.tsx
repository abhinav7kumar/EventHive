
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Eye } from "lucide-react";
import Link from "next/link";

const stalls = [
    { id: '1', event: 'Oddo X CGC Hackathon', type: 'Virtual Booth', status: 'Active' },
    { id: '2', event: 'Culinary Canvas', type: 'Food Stall', status: 'Active' },
    { id: '3', event: 'City Marathon 2024', type: 'Info Kiosk', status: 'Upcoming' },
];

export default function MyStallsPage() {
  return (
    <div className="bg-muted/40 min-h-screen">
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <Link href="/vendor">
                    <Button variant="ghost">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My Stalls</CardTitle>
                    <CardDescription>Manage your virtual and physical stalls for all events.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Stall Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stalls.map(stall => (
                                <TableRow key={stall.id}>
                                    <TableCell className="font-medium">{stall.event}</TableCell>
                                    <TableCell>{stall.type}</TableCell>
                                    <TableCell><Badge variant={stall.status === 'Active' ? 'default' : 'secondary'}>{stall.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4"/></Button>
                                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {stalls.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>You have no stalls registered.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
