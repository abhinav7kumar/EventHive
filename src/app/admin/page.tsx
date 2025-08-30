import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, BarChart2, Settings, CreditCard, ShieldCheck, Megaphone, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const pendingEvents = [
    { id: '1', title: 'Community Charity Run', organizer: 'Civic Group' },
    { id: '2', title: 'Indie Film Festival', organizer: 'ArtHouse Films' },
];

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
            <Button variant="outline">
                <Megaphone className="mr-2 h-4 w-4" /> Send Announcement
            </Button>
            <Link href="/create-event">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
                </Button>
            </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users /> User Management
                </CardTitle>
                <CardDescription>Oversee all platform users.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">View Attendees</Button>
                <Button variant="outline" className="w-full justify-start">Manage Organizers</Button>
                <Button variant="outline" className="w-full justify-start">Handle Vendors</Button>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard /> Payment & Finance
                    </CardTitle>
                    <CardDescription>Monitor all financial activities.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">View Transactions</Button>
                    <Button variant="outline" className="w-full justify-start">Process Refunds</Button>
                    <Button variant="outline" className="w-full justify-start">Set Commissions</Button>
                </CardContent>
            </Card>
        </div>

        {/* Column 2 */}
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Event Approval Queue</CardTitle>
                    <CardDescription>Review and approve new events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {pendingEvents.map(event => (
                        <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                                <p className="font-semibold">{event.title}</p>
                                <p className="text-sm text-muted-foreground">{event.organizer}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-600"><CheckCircle className="h-5 w-5"/></Button>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80"><XCircle className="h-5 w-5"/></Button>
                            </div>
                        </div>
                    ))}
                     {pendingEvents.length === 0 && <p className="text-muted-foreground text-center">No events pending approval.</p>}
                </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart2 /> Analytics & Reports
                </CardTitle>
                 <CardDescription>Get insights on platform performance.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Full Analytics</Button>
              </CardContent>
            </Card>
        </div>
        
        {/* Column 3 */}
        <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings /> System Rules & Settings
                </CardTitle>
                 <CardDescription>Configure platform-wide settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                 <Button variant="outline" className="w-full justify-start">Manage Permissions</Button>
                 <Button variant="outline" className="w-full justify-start">Set Refund Policies</Button>
                 <Button variant="outline" className="w-full justify-start">App Configurations</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ShieldCheck /> Security & Compliance
                </CardTitle>
                 <CardDescription>Monitor security and data privacy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                 <Button variant="outline" className="w-full justify-start">View Access Logs</Button>
                 <Button variant="outline" className="w-full justify-start">Data Privacy Settings</Button>
                 <Button variant="outline" className="w-full justify-start">Flag Suspicious Activity</Button>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Dashboard Customization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Configure widgets and reports.</p>
                <Button variant="outline" className="w-full">Customize Dashboard</Button>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
