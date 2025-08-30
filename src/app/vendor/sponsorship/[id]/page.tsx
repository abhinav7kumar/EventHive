
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { getEventById } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart2, Eye, MousePointerClick, Target, Image as ImageIcon, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import Link from 'next/link';
import { Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell, LabelList } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Image from 'next/image';

const engagementData = [
  { date: '2024-08-24', engagement: 120 },
  { date: '2024-08-25', engagement: 150 },
  { date: '2024-08-26', engagement: 130 },
  { date: '2024-08-27', engagement: 220 },
  { date: '2024-08-28', engagement: 180 },
  { date: '2024-08-29', engagement: 280 },
  { date: '2024-08-30', engagement: 250 },
];

const engagementBreakdownData = [
  { name: 'Impressions', value: 15000, fill: 'hsl(var(--chart-1))' },
  { name: 'Clicks', value: 8500, fill: 'hsl(var(--chart-2))'  },
  { name: 'Leads', value: 4500, fill: 'hsl(var(--chart-3))'  },
];


const chartConfig = {
  engagement: {
    label: "Engagement",
    color: "hsl(var(--primary))",
  },
  impressions: {
    label: "Impressions",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-2))",
  },
  leads: {
    label: "Leads",
    color: "hsl(var(--chart-3))",
  },
} satisfies import("@/components/ui/chart").ChartConfig

export default function SponsorshipAnalyticsPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = params.id as string;
    const event = getEventById(eventId);

    if (!event) {
        notFound();
    }
    
    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto px-4 py-12">
                 <div className="mb-8">
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Back to Vendor Dashboard
                    </Button>
                </div>

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Sponsorship Analytics</h1>
                        <p className="text-muted-foreground">Performance for your sponsorship of: <span className="font-semibold text-primary">{event.title}</span></p>
                    </div>
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">150,234</div>
                             <p className="text-xs text-muted-foreground">Times your brand was seen</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Click-Through Rate (CTR)</CardTitle>
                            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2.5%</div>
                            <p className="text-xs text-muted-foreground">From event page to your site</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+128</div>
                            <p className="text-xs text-muted-foreground">Sign-ups from referral code</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                  <span className="flex items-center gap-2">
                                      <TrendingUp /> Engagement Over Time
                                  </span>
                                </CardTitle>
                                <CardDescription>
                                    Track views and clicks related to your sponsorship.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-[350px] w-full">
                                   <LineChart accessibilityLayer data={engagementData}>
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
                                       <Legend />
                                       <Line type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={2} dot={false} />
                                   </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChartIcon /> Engagement Breakdown
                                </CardTitle>
                                <CardDescription>A snapshot of user interactions.</CardDescription>
                            </CardHeader>
                             <CardContent className="flex items-center justify-center">
                                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                                    <PieChart>
                                        <Tooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
                                        <Pie data={engagementBreakdownData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={100} strokeWidth={2}>
                                            {engagementBreakdownData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                            <LabelList
                                                dataKey="name"
                                                className="fill-primary-foreground font-semibold"
                                                stroke="none"
                                                fontSize={12}
                                                formatter={(value: keyof typeof chartConfig) =>
                                                   chartConfig[value]?.label
                                                }
                                            />
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ImageIcon /> Creative Assets
                                </CardTitle>
                                <CardDescription>Your branding materials for this event.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border rounded-lg p-2 flex items-center gap-4">
                                    <Image src="https://placehold.co/100x50" alt="Company Logo" width={100} height={50} className="rounded" />
                                    <div>
                                        <p className="font-semibold">Company Logo</p>
                                        <p className="text-xs text-muted-foreground">PNG - 256KB</p>
                                    </div>
                                </div>
                                <div className="border rounded-lg p-2 flex items-center gap-4">
                                    <Image src="https://placehold.co/100x50" alt="Promotional Banner" width={100} height={50} className="rounded object-cover" />
                                    <div>
                                        <p className="font-semibold">Promo Banner</p>
                                        <p className="text-xs text-muted-foreground">JPG - 1.2MB</p>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full">Upload New Asset</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
