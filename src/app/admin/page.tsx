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
            <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening.</p>
          </div>
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

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                     <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+57</div>
                    <p className="text-xs text-muted-foreground">+12 since last week</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+128</div>
                    <p className="text-xs text-muted-foreground">+32 this week</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Event Approval Queue</CardTitle>
                        <CardDescription>Review and approve new events waiting for verification.</CardDescription>
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
                         <CardDescription>Get insights on platform performance and user engagement.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Detailed charts and reports will be displayed here.</p>
                        <Button variant="outline" className="w-full">View Full Analytics</Button>
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
                        <CardTitle>
                            <span className="flex items-center gap-2">
                                <CreditCard /> Payment & Finance
                            </span>
                        </CardTitle>
                        <CardDescription>Monitor all financial activities.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">View Transactions</Button>
                        <Button variant="outline" className="w-full justify-start">Process Refunds</Button>
                    </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                        <span className="flex items-center gap-2">
                            <Settings /> System & Security
                        </span>
                    </CardTitle>
                     <CardDescription>Configure settings and monitor security.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                     <Button variant="outline" className="w-full justify-start">Manage Permissions</Button>
                     <Button variant="outline" className="w-full justify-start">Set Refund Policies</Button>
                     <Button variant="outline" className="w-full justify-start"><ShieldCheck className="mr-2"/>Security Logs</Button>
                  </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
