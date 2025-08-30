
'use client';

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

export default function ManageVendorsPage() {
    const vendors = getVendors();

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
                                                    <DropdownMenuItem>
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
    )
}
