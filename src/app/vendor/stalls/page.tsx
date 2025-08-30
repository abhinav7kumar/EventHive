
'use client';

import { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { getEventById } from '@/lib/mock-data';

const initialStalls = [
    { id: '1', eventId: '1', event: 'Oddo X CGC Hackathon', type: 'Virtual Booth', status: 'Active' },
    { id: '2', eventId: '3', event: 'Culinary Canvas', type: 'Food Stall', status: 'Active' },
    { id: '3', eventId: '4', event: 'City Marathon 2024', type: 'Info Kiosk', status: 'Upcoming' },
];

type Stall = typeof initialStalls[0];

export default function MyStallsPage() {
  const [stalls, setStalls] = useState(initialStalls);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const [stallType, setStallType] = useState('');
  const { toast } = useToast();
  
  const handleEditClick = (stall: Stall) => {
    setSelectedStall(stall);
    setStallType(stall.type);
    setIsEditDialogOpen(true);
  };
  
  const handleSaveChanges = () => {
    if (!selectedStall) return;

    setStalls(stalls.map(s => s.id === selectedStall.id ? { ...s, type: stallType } : s));
    
    toast({
        title: "Stall Updated!",
        description: `Your changes to the stall for "${selectedStall.event}" have been saved.`,
    });

    setIsEditDialogOpen(false);
    setSelectedStall(null);
  };

  return (
    <>
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
                                        <Link href={`/vendor/sponsorship/${stall.eventId}`}>
                                            <Button variant="ghost" size="icon"><Eye className="h-4 w-4"/></Button>
                                        </Link>
                                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(stall)}><Edit className="h-4 w-4"/></Button>
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
     <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Stall</DialogTitle>
                <DialogDescription>
                    Make changes to your stall details for the event: <span className="font-semibold text-primary">{selectedStall?.event}</span>
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stall-type" className="text-right">Stall Type</Label>
                    <Input id="stall-type" value={stallType} onChange={(e) => setStallType(e.target.value)} className="col-span-3" />
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
