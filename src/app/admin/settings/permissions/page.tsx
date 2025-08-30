
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Shield, Briefcase, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const roles = [
    { id: 'admin', name: 'Admin', icon: Shield },
    { id: 'organizer', name: 'Organizer', icon: Briefcase },
    { id: 'attendee', name: 'Attendee', icon: User },
    { id: 'vendor', name: 'Vendor', icon: LayoutDashboard },
];

const permissions = [
    { id: 'manage_events', label: 'Manage Events' },
    { id: 'view_analytics', label: 'View Analytics' },
    { id: 'manage_users', label: 'Manage Users' },
    { id: 'manage_settings', label: 'Manage Platform Settings' },
    { id: 'access_billing', label: 'Access Billing' },
];

const initialRolePermissions: Record<string, string[]> = {
    admin: ['manage_events', 'view_analytics', 'manage_users', 'manage_settings', 'access_billing'],
    organizer: ['manage_events', 'view_analytics'],
    attendee: [],
    vendor: ['view_analytics'],
};

export default function PermissionsPage() {
    const [rolePermissions, setRolePermissions] = useState(initialRolePermissions);
    const { toast } = useToast();

    const handlePermissionChange = (roleId: string, permissionId: string, checked: boolean) => {
        setRolePermissions(prev => {
            const currentPermissions = prev[roleId] || [];
            if (checked) {
                return { ...prev, [roleId]: [...currentPermissions, permissionId] };
            } else {
                return { ...prev, [roleId]: currentPermissions.filter(p => p !== permissionId) };
            }
        });
    };

    const handleSaveChanges = () => {
        toast({
            title: 'Permissions Updated',
            description: 'The new role permissions have been saved.',
        });
    };
    
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
                     <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Role-Based Permissions</CardTitle>
                        <CardDescription>Define what each user role can access and do on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Role</TableHead>
                                    {permissions.map(p => <TableHead key={p.id}>{p.label}</TableHead>)}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.map(role => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-semibold flex items-center gap-2">
                                            <role.icon className="h-5 w-5 text-muted-foreground"/>
                                            {role.name}
                                        </TableCell>
                                        {permissions.map(permission => (
                                            <TableCell key={permission.id}>
                                                <Checkbox
                                                    checked={rolePermissions[role.id]?.includes(permission.id)}
                                                    onCheckedChange={(checked) => handlePermissionChange(role.id, permission.id, !!checked)}
                                                    disabled={role.id === 'admin'}
                                                />
                                            </TableCell>
                                        ))}
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
