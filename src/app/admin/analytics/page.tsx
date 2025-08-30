
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart2, DollarSign, Ticket, Users, TrendingUp, LineChart as LineChartIcon } from 'lucide-react';
import Link from 'next/link';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
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

const topEvents = getEvents().slice(0,5).map(e => ({
    ...e,
    revenue: Math.floor(Math.random() * 50000) + 10000,
    ticketsSold: Math.floor(Math.random() * 2000) + 500,
})).sort((a,b) => b.revenue - a.revenue);

const revenueByCategoryData = [
    { category: 'Technology', revenue: 450000 },
    { category: 'Conference', revenue: 320000 },
    { category: 'Music', revenue: 280000 },
    { category: 'Food', revenue: 180000 },
    { category: 'Sports', revenue: 150000 },
    { category: 'Arts', revenue: 120000 },
];

const platformGrowthData = [
  { month: 'Jan', revenue: 25000, users: 400 },
  { month: 'Feb', revenue: 28000, users: 450 },
  { month: 'Mar', revenue: 35000, users: 520 },
  { month: 'Apr', revenue: 42000, users: 600 },
  { month: 'May', revenue: 55000, users: 700 },
  { month: 'Jun', revenue: 65000, users: 850 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  users: {
    label: "New Users",
    color: "hsl(var(--chart-2))",
  },
} satisfies import("@/components/ui/chart").ChartConfig


export default function GlobalAnalyticsPage() {
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

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Global Platform Analytics</h1>
                        <p className="text-muted-foreground">A high-level overview of your entire platform.</p>
                    </div>
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Overall Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$1,245,231.89</div>
                             <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Tickets Sold</CardTitle>
                            <Ticket className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                            <BarChart2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+57</div>
                            <p className="text-xs text-muted-foreground">Currently live on the platform</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">New Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+1,834</div>
                            <p className="text-xs text-muted-foreground">Joined this month</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue by Event Category</CardTitle>
                            <CardDescription>
                                See which categories are driving the most revenue.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[350px] w-full">
                               <BarChart accessibilityLayer data={revenueByCategoryData} layout="vertical" margin={{ left: 20 }}>
                                   <CartesianGrid horizontal={false} />
                                   <YAxis
                                        dataKey="category"
                                        type="category"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    />
                                    <XAxis type="number" hide />
                                   <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" />}
                                   />
                                   <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                               </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Platform Growth Over Time</CardTitle>
                            <CardDescription>
                                Track revenue and new user acquisition monthly.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ChartContainer config={chartConfig} className="h-[350px] w-full">
                                <LineChart accessibilityLayer data={platformGrowthData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={true} />
                                    <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} dot={true} />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
                 <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Events</CardTitle>
                        <CardDescription>Events ranked by total revenue and tickets sold.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Organizer</TableHead>
                                    <TableHead>Total Revenue</TableHead>
                                    <TableHead>Tickets Sold</TableHead>
                                    <TableHead className="text-right">View</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topEvents.map(event => (
                                    <TableRow key={event.id}>
                                        <TableCell className="font-medium">{event.title}</TableCell>
                                        <TableCell>{event.organizer}</TableCell>
                                        <TableCell className="font-semibold text-primary">${event.revenue.toLocaleString()}</TableCell>
                                        <TableCell>{event.ticketsSold.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/organizer/analytics/${event.id}`}>
                                               <Button variant="outline" size="sm">View Analytics</Button>
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
    )
}
