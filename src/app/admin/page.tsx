
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, BarChart2, Settings, CreditCard, ShieldCheck, Megaphone, CheckCircle, XCircle, DollarSign, Ticket, Activity } from "lucide-react";
import Link from "next/link";

const pendingEvents = [
    { id: '1', title: 'Community Charity Run', organizer: 'Civic Group', category: 'Sports' },
    { id: '2', title: 'Indie Film Festival', organizer: 'ArtHouse Films', category: 'Arts' },
];

export default function AdminDashboardPage() {
  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platform Governance & Compliance Center</p>
          </div>
          <div className="flex gap-2">
            <Link href="/create-event">
              <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$1,245,231.89</div>
                    <p className="text-xs text-muted-foreground">Total platform earnings</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Global Tickets Sold</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                     <p className="text-xs text-muted-foreground">Across all events</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Attendees Today</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+8,432</div>
                    <p className="text-xs text-muted-foreground">Live event check-ins</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Platform Growth</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+512</div>
                    <p className="text-xs text-muted-foreground">New users this week</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Event Management</CardTitle>
                        <CardDescription>Approve or reject events before they go live.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {pendingEvents.map(event => (
                            <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4">
                                     <div className="p-3 bg-primary/10 rounded-lg">
                                        <Ticket className="h-5 w-5 text-primary" />
                                     </div>
                                    <div>
                                        <p className="font-semibold">{event.title}</p>
                                        <p className="text-sm text-muted-foreground">{event.organizer} • <span className="font-medium text-primary/80">{event.category}</span></p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-600 rounded-full"><CheckCircle className="h-5 w-5"/></Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80 rounded-full"><XCircle className="h-5 w-5"/></Button>
                                </div>
                            </div>
                        ))}
                         {pendingEvents.length === 0 && <p className="text-muted-foreground text-center py-4">No events pending approval.</p>}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                      <CardTitle>
                          <span className="flex items-center gap-2">
                              <BarChart2 /> Analytics & Reports
                          </span>
                      </CardTitle>
                       <CardDescription>Global insights on ticket sales, engagement, and revenue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">High-level reports on platform performance will be shown here.</p>
                        <Link href="/admin/analytics" className="w-full">
                            <Button variant="outline" className="w-full">View Global Analytics</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
            
            {/* Side Column */}
            <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>
                        <span className="flex items-center gap-2">
                            <Users /> User Management
                        </span>
                    </CardTitle>
                    <CardDescription>Manage organizers, attendees, and vendors.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">Manage Attendees</Button>
                    <Button variant="outline" className="w-full justify-start">Manage Organizers</Button>
                    <Button variant="outline" className="w-full justify-start">Manage Vendors</Button>
                  </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <span className="flex items-center gap-2">
                                <CreditCard /> Payment & Finance Control
                            </span>
                        </CardTitle>
                        <CardDescription>Oversee transactions, refunds, and settlements.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">View All Transactions</Button>
                        <Button variant="outline" className="w-full justify-start">Manage Refunds</Button>
                        <Button variant="outline" className="w-full justify-start">Track Settlements</Button>
                    </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                        <span className="flex items-center gap-2">
                            <Settings /> System Rules & Settings
                        </span>
                    </CardTitle>
                     <CardDescription>Configure platform-wide policies and permissions.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                     <Button variant="outline" className="w-full justify-start">Role-Based Permissions</Button>
                     <Button variant="outline" className="w-full justify-start">Configure Refund Workflows</Button>
                     <Button variant="outline" className="w-full justify-start"><ShieldCheck className="mr-2"/>Fraud & Security</Button>
                  </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
