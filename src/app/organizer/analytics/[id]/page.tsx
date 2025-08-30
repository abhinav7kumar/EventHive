
'use client';

import { useParams, notFound } from 'next/navigation';
import { getEventById } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart2, DollarSign, Ticket, Users } from 'lucide-react';
import Link from 'next/link';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


const salesData = [
  { date: '2024-08-24', tickets: 50 },
  { date: '2024-08-25', tickets: 75 },
  { date: '2024-08-26', tickets: 60 },
  { date: '2024-08-27', tickets: 120 },
  { date: '2024-08-28', tickets: 90 },
  { date: '2024-08-29', tickets: 150 },
  { date: '2024-08-30', tickets: 130 },
];

const chartConfig = {
  tickets: {
    label: "Tickets",
    color: "hsl(var(--primary))",
  },
} satisfies import("@/components/ui/chart").ChartConfig


export default function EventAnalyticsPage() {
    const params = useParams();
    const eventId = params.id as string;
    const event = getEventById(eventId);

    if (!event) {
        notFound();
    }
    
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

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Event Analytics</h1>
                        <p className="text-muted-foreground">Insights for: <span className="font-semibold text-primary">{event.title}</span></p>
                    </div>
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Event Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$12,500</div>
                             <p className="text-xs text-muted-foreground">Total earnings from this event</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
                            <Ticket className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">850 / 1000</div>
                            <p className="text-xs text-muted-foreground">General Admission</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unique Attendees</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+780</div>
                            <p className="text-xs text-muted-foreground">Total individual ticket holders</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>
                          <span className="flex items-center gap-2">
                              <BarChart2 /> Ticket Sales Over Time
                          </span>
                        </CardTitle>
                        <CardDescription>
                            Track how your ticket sales have performed since launch.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[350px] w-full">
                           <BarChart accessibilityLayer data={salesData}>
                               <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
                                <Bar dataKey="tickets" fill="var(--color-tickets)" radius={4} />
                           </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
