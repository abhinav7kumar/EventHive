
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function RefundWorkflowsPage() {
    const { toast } = useToast();
    const [rules, setRules] = useState([
        { id: 1, condition: 'amount_less_than', value: '50', action: 'auto_approve' },
        { id: 2, condition: 'request_within_hours', value: '24', action: 'auto_approve' },
    ]);

    const handleSaveChanges = () => {
        toast({
            title: 'Workflows Updated',
            description: 'Your refund workflow rules have been saved.',
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
                        <CardTitle>Configure Refund Workflows</CardTitle>
                        <CardDescription>Set up automated rules to handle refund requests efficiently.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            {rules.map((rule, index) => (
                                <div key={rule.id} className="p-4 border rounded-lg space-y-4">
                                     <div className="flex justify-between items-center">
                                        <p className="font-semibold">Rule {index + 1}</p>
                                        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
                                     </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label>If</Label>
                                            <Select defaultValue={rule.condition}>
                                                <SelectTrigger>
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="amount_less_than">Amount is less than ($)</SelectItem>
                                                    <SelectItem value="request_within_hours">Request is within (hours)</SelectItem>
                                                    <SelectItem value="event_cancelled">Event is cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                         <div className="space-y-2">
                                            <Label>Value</Label>
                                            <Input defaultValue={rule.value} />
                                        </div>
                                         <div className="space-y-2">
                                            <Label>Then</Label>
                                             <Select defaultValue={rule.action}>
                                                <SelectTrigger>
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="auto_approve">Automatically Approve</SelectItem>
                                                    <SelectItem value="manual_review">Flag for Manual Review</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator/>
                        
                        <Button variant="outline" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4"/> Add New Rule
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
