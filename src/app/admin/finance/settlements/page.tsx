
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Send } from 'lucide-react';
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

const mockSettlements = [
    { id: 'set_1', organizer: 'Future Forward Events', event: 'AI & The Future of Tech', totalRevenue: 12500, platformFee: 1250, netPayout: 11250, status: 'Pending', payoutDate: '2024-09-27' },
    { id: 'set_2', organizer: 'Gourmet Gatherings', event: 'Culinary Canvas', totalRevenue: 8500, platformFee: 850, netPayout: 7650, status: 'Paid', payoutDate: '2024-08-04' },
    { id: 'set_3', organizer: 'City Sports Council', event: 'City Marathon 2024', totalRevenue: 45000, platformFee: 4500, netPayout: 40500, status: 'Pending', payoutDate: '2024-10-19' },
    { id: 'set_4', organizer: 'Arts United', event: 'Modern Art Showcase', totalRevenue: 5000, platformFee: 500, netPayout: 4500, status: 'Paid', payoutDate: '2024-08-08' },
];

export default function SettlementsPage() {
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
                        <CardTitle>Organizer Settlements</CardTitle>
                        <CardDescription>Track and manage payouts to event organizers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Organizer</TableHead>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Total Revenue</TableHead>
                                    <TableHead>Platform Fee</TableHead>
                                    <TableHead>Net Payout</TableHead>
                                    <TableHead>Payout Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockSettlements.map(settlement => (
                                    <TableRow key={settlement.id}>
                                        <TableCell className="font-medium">{settlement.organizer}</TableCell>
                                        <TableCell>{settlement.event}</TableCell>
                                        <TableCell>${settlement.totalRevenue.toFixed(2)}</TableCell>
                                        <TableCell>${settlement.platformFee.toFixed(2)}</TableCell>
                                        <TableCell className="font-semibold text-primary">${settlement.netPayout.toFixed(2)}</TableCell>
                                        <TableCell>{format(new Date(settlement.payoutDate), 'PPP')}</TableCell>
                                        <TableCell>
                                            <Badge variant={settlement.status === 'Paid' ? 'default' : 'secondary'}>
                                                {settlement.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {settlement.status === 'Pending' && (
                                                <Button size="sm">
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Mark as Paid
                                                </Button>
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
