
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, MoreVertical, ShieldCheck, XCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getOrganizers } from '@/lib/mock-data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge';

export default function ManageOrganizersPage() {
    const organizers = getOrganizers();

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
                        <CardTitle>Manage Organizers</CardTitle>
                        <CardDescription>View, verify, and manage all event organizers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Organizer</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Events Organized</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {organizers.map(organizer => (
                                    <TableRow key={organizer.id}>
                                        <TableCell className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={organizer.avatar} alt={organizer.name}/>
                                                <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{organizer.name}</span>
                                        </TableCell>
                                        <TableCell>{organizer.email}</TableCell>
                                        <TableCell>{organizer.eventsOrganized}</TableCell>
                                        <TableCell>
                                            <Badge variant={organizer.status === 'Active' ? 'default' : 'secondary'}>{organizer.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Edit className="mr-2 h-4 w-4"/> View Profile
                                                    </DropdownMenuItem>
                                                     {!organizer.isVerified && (
                                                        <DropdownMenuItem>
                                                            <ShieldCheck className="mr-2 h-4 w-4"/> Verify Organizer
                                                        </DropdownMenuItem>
                                                     )}
                                                    <DropdownMenuItem className="text-destructive">
                                                        <XCircle className="mr-2 h-4 w-4"/> Suspend Organizer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
