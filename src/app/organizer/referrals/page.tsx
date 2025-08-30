
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Gift } from "lucide-react";
import Link from "next/link";

export default function ManageReferralsPage() {

  return (
    <div className="bg-muted/40 min-h-screen">
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <Link href="/organizer">
                    <Button variant="ghost">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Gift className="h-6 w-6 text-primary"/>
                        Referral Program Management
                    </CardTitle>
                    <CardDescription>Create and manage referral campaigns to boost ticket sales through word-of-mouth.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-lg">
                        <Gift className="h-12 w-12 mx-auto mb-4"/>
                        <h3 className="text-lg font-semibold mb-2">You haven't set up a referral program yet.</h3>
                        <p className="mb-4">Create a program to reward attendees for inviting their friends!</p>
                        <Button>Create Your First Referral Program</Button>
                   </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
