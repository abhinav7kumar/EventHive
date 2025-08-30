
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Handshake, Store, BarChart } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function VendorDashboardPage() {
  const sponsoredEvents = [
    { id: '1', title: 'Oddo X CGC Hackathon', status: 'Active' },
    { id: '3', title: 'Culinary Canvas', status: 'Upcoming' },
  ];

  return (
    <>
      <SiteHeader />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Vendor & Sponsor Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                  <CardTitle>My Sponsorships</CardTitle>
                  <CardDescription>Events you are sponsoring or have a stall at.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  {sponsoredEvents.map(event => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                              <h3 className="font-semibold">{event.title}</h3>
                              <Badge variant={event.status === 'Active' ? 'default' : 'secondary'}>{event.status}</Badge>
                          </div>
                          <Link href={`/vendor/sponsorship/${event.id}`}>
                            <Button variant="outline" size="sm">Manage</Button>
                          </Link>
                      </div>
                  ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Handshake />Sponsorship Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground mb-4">Find new events to sponsor.</p>
                      <Link href="/events" className="w-full">
                          <Button className="w-full">Browse Events</Button>
                      </Link>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Store />My Stalls</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground mb-4">Manage your virtual or physical stalls.</p>
                      <Link href="/vendor/stalls" className="w-full">
                          <Button variant="outline" className="w-full">View Stalls</Button>
                      </Link>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><BarChart />Engagement Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground mb-4">Track your ROI and engagement.</p>
                      <Link href="/vendor/metrics">
                        <Button variant="outline" className="w-full">View Metrics</Button>
                      </Link>
                  </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </>
  );
}
