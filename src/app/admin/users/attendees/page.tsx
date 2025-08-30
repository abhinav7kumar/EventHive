
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, MoreVertical, Trash2, Eye, UserX, ShieldCheck } from 'lucide-react';
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
import { getAttendees } from '@/lib/mock-data';
import type { Attendee } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function ManageAttendeesPage() {
    const [attendees, setAttendees] = useState(getAttendees().map(a => ({...a, status: 'Active' as 'Active' | 'Suspended' })));
    const { toast } = useToast();
    
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
    const [selectedAttendee, setSelectedAttendee] = useState<typeof attendees[0] | null>(null);

    const handleViewClick = (attendee: typeof attendees[0]) => {
        setSelectedAttendee(attendee);
        setIsViewDialogOpen(true);
    };

    const handleSuspendClick = (attendee: typeof attendees[0]) => {
        setSelectedAttendee(attendee);
        setIsSuspendDialogOpen(true);
    };

    const confirmSuspend = () => {
        if (!selectedAttendee) return;

        setAttendees(attendees.map(a => 
            a.id === selectedAttendee.id ? { ...a, status: 'Suspended' } : a
        ));

        toast({
            title: "Account Suspended",
            description: `The account for ${selectedAttendee.name} has been suspended.`,
            variant: "destructive"
        });

        setIsSuspendDialogOpen(false);
        setSelectedAttendee(null);
    };

    return (
        <>
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
                        <CardTitle>Manage Attendees</CardTitle>
                        <CardDescription>View and manage all attendees on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Attendee</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Events Attended</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendees.map(attendee => (
                                    <TableRow key={attendee.id}>
                                        <TableCell className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={attendee.avatar} alt={attendee.name}/>
                                                <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{attendee.name}</span>
                                        </TableCell>
                                        <TableCell>{attendee.email}</TableCell>
                                        <TableCell>{attendee.eventsAttended}</TableCell>
                                         <TableCell>
                                            <Badge variant={attendee.status === 'Active' ? 'default' : 'destructive'}>{attendee.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleViewClick(attendee)}>
                                                        <Eye className="mr-2 h-4 w-4"/> View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleSuspendClick(attendee)} className="text-destructive">
                                                        <UserX className="mr-2 h-4 w-4"/> Suspend Account
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

        {/* View Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Attendee Details</DialogTitle>
                </DialogHeader>
                {selectedAttendee && (
                    <div className="space-y-4 py-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={selectedAttendee.avatar} alt={selectedAttendee.name}/>
                                <AvatarFallback>{selectedAttendee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-xl font-bold">{selectedAttendee.name}</p>
                                <p className="text-muted-foreground">{selectedAttendee.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">Events Attended</p>
                                <p className="font-semibold">{selectedAttendee.eventsAttended}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Last Active</p>
                                <p className="font-semibold">{format(new Date(selectedAttendee.lastActive), 'PPP')}</p>
                            </div>
                             <div>
                                <p className="text-muted-foreground">Status</p>
                                <p><Badge variant={selectedAttendee.status === 'Active' ? 'default' : 'destructive'}>{selectedAttendee.status}</Badge></p>
                            </div>
                        </div>
                    </div>
                )}
                 <DialogFooter>
                    <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
        {/* Suspend Confirmation Dialog */}
        <AlertDialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will suspend the account for <span className="font-semibold">{selectedAttendee?.name}</span>. They will not be able to log in or purchase tickets. This action can be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmSuspend} className="bg-destructive hover:bg-destructive/90">Suspend</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    )
}
