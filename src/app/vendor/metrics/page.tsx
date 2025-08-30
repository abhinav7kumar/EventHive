
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart2, DollarSign, Ticket, Users, Eye, MousePointerClick, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEvents } from '@/lib/mock-data';

const sponsoredEvents = getEvents().filter(e => ['1','3','5'].includes(e.id)).map(e => ({
    ...e,
    impressions: Math.floor(Math.random() * 20000) + 5000,
    clicks: Math.floor(Math.random() * 1000) + 200,
    leads: Math.floor(Math.random() * 100) + 10,
}));

const totalImpressions = sponsoredEvents.reduce((acc, e) => acc + e.impressions, 0);
const totalClicks = sponsoredEvents.reduce((acc, e) => acc + e.clicks, 0);
const totalLeads = sponsoredEvents.reduce((acc, e) => acc + e.leads, 0);


const chartConfig = {
  impressions: {
    label: "Impressions",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-2))",
  },
} satisfies import("@/components/ui/chart").ChartConfig


export default function VendorMetricsPage() {
    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                 <div className="mb-8">
                    <Link href="/vendor">
                        <Button variant="ghost">
                            <ArrowLeft className="mr-2 h-4 w-4"/>
                            Back to Vendor Dashboard
                        </Button>
                    </Link>
                </div>

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Global Engagement Metrics</h1>
                        <p className="text-muted-foreground">An overview of your performance across all sponsored events.</p>
                    </div>
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
                             <p className="text-xs text-muted-foreground">Across all sponsored events</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">Total clicks from all event pages</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Leads Generated</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{totalLeads.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">Sign-ups from all referral codes</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                              <span className="flex items-center gap-2">
                                  <TrendingUp /> Performance by Event
                              </span>
                            </CardTitle>
                            <CardDescription>
                                Compare impressions and clicks for each event you've sponsored.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[350px] w-full">
                               <BarChart accessibilityLayer data={sponsoredEvents}>
                                   <CartesianGrid vertical={false} />
                                   <XAxis
                                        dataKey="title"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 15) + (value.length > 15 ? '...' : '')}
                                    />
                                    <YAxis 
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    />
                                   <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" />}
                                   />
                                   <Legend />
                                   <Bar dataKey="impressions" fill="var(--color-impressions)" radius={4} />
                                   <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4} />
                               </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Sponsorships Breakdown</CardTitle>
                            <CardDescription>A detailed look at each sponsorship's performance.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Event</TableHead>
                                        <TableHead>Impressions</TableHead>
                                        <TableHead>Clicks</TableHead>
                                        <TableHead>Leads</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sponsoredEvents.map(event => (
                                        <TableRow key={event.id}>
                                            <TableCell className="font-medium">{event.title}</TableCell>
                                            <TableCell>{event.impressions.toLocaleString()}</TableCell>
                                            <TableCell>{event.clicks.toLocaleString()}</TableCell>
                                            <TableCell className="font-semibold text-primary">+{event.leads.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/vendor/sponsorship/${event.id}`}>
                                                   <Button variant="outline" size="sm">View Details</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
