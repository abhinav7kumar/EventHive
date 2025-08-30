
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
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

const mockTransactions = [
    { id: 'txn_1', event: 'Odoo x CGC Mohali Hackathon 2025', attendee: 'Alice Johnson', amount: 450, status: 'Success', date: '2024-07-28' },
    { id: 'txn_2', event: 'Culinary Canvas', attendee: 'Bob Williams', amount: 120, status: 'Success', date: '2024-07-27' },
    { id: 'txn_3', event: 'City Marathon 2024', attendee: 'Charlie Brown', amount: 90, status: 'Failed', date: '2024-07-26' },
    { id: 'txn_4', event: 'Modern Art Showcase', attendee: 'Diana Prince', amount: 25, status: 'Success', date: '2024-07-25' },
    { id: 'txn_5', event: 'Innovators Summit', attendee: 'Bruce Wayne', amount: 950, status: 'Success', date: '2024-07-24' },
];

export default function TransactionsPage() {
    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-8 flex justify-between items-center">
                    <Link href="/admin">
                        <Button variant="ghost">
                            <ArrowLeft className="mr-2 h-4 w-4"/>
                            Back to Admin Dashboard
                        </Button>
                    </Link>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Transactions</CardTitle>
                        <CardDescription>A complete log of all payment transactions on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Attendee</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Receipt</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockTransactions.map(transaction => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                                        <TableCell>{format(new Date(transaction.date), 'PPP')}</TableCell>
                                        <TableCell className="font-medium">{transaction.event}</TableCell>
                                        <TableCell>{transaction.attendee}</TableCell>
                                        <TableCell className="font-semibold">${transaction.amount.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge variant={transaction.status === 'Success' ? 'default' : 'destructive'}>
                                                {transaction.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="link" size="sm">View</Button>
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

