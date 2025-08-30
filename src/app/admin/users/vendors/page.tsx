
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, MoreVertical, Eye, XCircle } from 'lucide-react';
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
import { getVendors } from '@/lib/mock-data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Vendor } from '@/types';


export default function ManageVendorsPage() {
    const [vendors, setVendors] = useState(getVendors());
    const { toast } = useToast();

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [companyName, setCompanyName] = useState('');
    const [contactName, setContactName] = useState('');

    const handleEditClick = (vendor: Vendor) => {
        setSelectedVendor(vendor);
        setCompanyName(vendor.companyName || '');
        setContactName(vendor.contactName || '');
        setIsEditDialogOpen(true);
    };

    const handleSaveChanges = () => {
        if (!selectedVendor) return;

        setVendors(vendors.map(v => 
            v.id === selectedVendor.id 
            ? { ...v, companyName: companyName, contactName: contactName } 
            : v
        ));
        
        toast({
            title: "Vendor Updated!",
            description: `Changes for "${companyName}" have been saved.`,
        });

        setIsEditDialogOpen(false);
        setSelectedVendor(null);
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
                        <CardTitle>Manage Vendors</CardTitle>
                        <CardDescription>View and manage all vendors and sponsors on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Vendor/Sponsor</TableHead>
                                    <TableHead>Contact Email</TableHead>
                                    <TableHead>Sponsored Events</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vendors.map(vendor => (
                                    <TableRow key={vendor.id}>
                                        <TableCell className="flex items-center gap-4">
                                             <Avatar>
                                                <AvatarImage src={vendor.avatar} alt={vendor.companyName}/>
                                                <AvatarFallback>{vendor.companyName ? vendor.companyName.charAt(0) : 'V'}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{vendor.companyName || vendor.name}</p>
                                                <p className="text-sm text-muted-foreground">{vendor.contactName}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{vendor.email}</TableCell>
                                        <TableCell>{vendor.sponsoredEvents}</TableCell>
                                        <TableCell>
                                            <Badge variant={vendor.status === 'Active' ? 'default' : 'secondary'}>{vendor.status}</Badge>
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
                                                        <Eye className="mr-2 h-4 w-4"/> View Sponsorships
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEditClick(vendor)}>
                                                        <Edit className="mr-2 h-4 w-4"/> Edit Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">
                                                        <XCircle className="mr-2 h-4 w-4"/> Deactivate
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
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Vendor Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to the vendor's details below.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name</Label>
                        <Input id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSaveChanges}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}
