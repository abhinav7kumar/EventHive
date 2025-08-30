
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const mockRefunds = [
    { id: 'ref_1', event: 'City Marathon 2024', attendee: 'Charlie Brown', amount: 90, reason: 'Accidental purchase', status: 'Pending', date: '2024-07-27' },
    { id: 'ref_2', event: 'Innovators Summit', attendee: 'Diana Prince', amount: 950, reason: 'Schedule conflict', status: 'Approved', date: '2024-07-26' },
    { id: 'ref_3', event: 'Culinary Canvas', attendee: 'Bruce Wayne', amount: 120, reason: 'Event cancelled by user', status: 'Denied', date: '2024-07-25' },
];

export default function RefundsPage() {
    const [refunds, setRefunds] = useState(mockRefunds);
    const { toast } = useToast();

    const handleUpdateStatus = (id: string, newStatus: 'Approved' | 'Denied') => {
        setRefunds(refunds.map(r => r.id === id ? { ...r, status: newStatus } : r));
        toast({
            title: `Refund ${newStatus}`,
            description: `The refund request has been ${newStatus.toLowerCase()}.`,
        });
    };

    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                 <div className="mb-8">
                    <Link href="/admin">
                        <Button variant="ghost">
                            <ArrowLeft className="mr-2 h-4 w-4"/>
                            Back to Admin Dashboard
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Manage Refunds</CardTitle>
                        <CardDescription>Review and process all refund requests.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Request ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Attendee</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {refunds.map(refund => (
                                    <TableRow key={refund.id}>
                                        <TableCell className="font-mono text-xs">{refund.id}</TableCell>
                                        <TableCell>{format(new Date(refund.date), 'PPP')}</TableCell>
                                        <TableCell className="font-medium">{refund.event}</TableCell>
                                        <TableCell>{refund.attendee}</TableCell>
                                        <TableCell className="font-semibold">${refund.amount.toFixed(2)}</TableCell>
                                        <TableCell className="text-muted-foreground">{refund.reason}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                refund.status === 'Approved' ? 'default' :
                                                refund.status === 'Denied' ? 'destructive' : 'secondary'
                                            }>
                                                {refund.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {refund.status === 'Pending' && (
                                                <div className="flex gap-2 justify-end">
                                                    <Button variant="ghost" size="icon" className="text-green-500" onClick={() => handleUpdateStatus(refund.id, 'Approved')}>
                                                        <CheckCircle className="h-5 w-5"/>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleUpdateStatus(refund.id, 'Denied')}>
                                                        <XCircle className="h-5 w-5"/>
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
