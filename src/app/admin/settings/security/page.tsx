
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function SecurityPage() {
    const { toast } = useToast();
    
    const handleSaveChanges = () => {
        toast({
            title: 'Security Settings Updated',
            description: 'Your new security policies have been saved and are now active.',
        });
    };
    
    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
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
                        <CardTitle className="flex items-center gap-2"><ShieldCheck/> Fraud & Security</CardTitle>
                        <CardDescription>Manage security protocols and fraud prevention measures for the platform.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4 p-4 border rounded-lg">
                            <h3 className="font-semibold">Login Security</h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="tfa" className="font-medium">Require Two-Factor Authentication (2FA) for Admins</Label>
                                    <p className="text-sm text-muted-foreground">Enhance security for administrator accounts.</p>
                                </div>
                                <Switch id="tfa" />
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Label htmlFor="login-attempts">Max Login Attempts</Label>
                                <Input id="login-attempts" type="number" defaultValue="5" className="max-w-xs" />
                                <p className="text-sm text-muted-foreground">Lock account after specified number of failed login attempts.</p>
                            </div>
                        </div>

                        <div className="space-y-4 p-4 border rounded-lg">
                            <h3 className="font-semibold">IP Management</h3>
                            <div className="space-y-2">
                                <Label htmlFor="ip-blocklist">Blocked IP Addresses</Label>
                                <Textarea id="ip-blocklist" placeholder="Enter one IP address per line, e.g.&#10;192.168.1.1&#10;10.0.0.5" rows={4}/>
                                <p className="text-sm text-muted-foreground">Prevent access from specific IP addresses.</p>
                            </div>
                        </div>
                         <div className="space-y-4 p-4 border rounded-lg">
                            <h3 className="font-semibold">Payment Gateway Security</h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="cvv-check" className="font-medium">Always require CVV for transactions</Label>
                                    <p className="text-sm text-muted-foreground">Adds an extra layer of verification for card payments.</p>
                                </div>
                                <Switch id="cvv-check" defaultChecked/>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
