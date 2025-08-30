
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ticket, User, Shield, Briefcase, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

function LoginForm({ role, email, password, dashboardPath }: { role: string, email?: string, password?: string, dashboardPath: string }) {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor={`${role}-email`}>Email</Label>
              <Input id={`${role}-email`} type="email" placeholder="user@example.com" required defaultValue={email} />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor={`${role}-password`}>Password</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                    </Link>
                </div>
              <Input id={`${role}-password`} type="password" required defaultValue={password} />
            </div>
            <Link href={dashboardPath} className="w-full block">
              <Button type="submit" className="w-full">
                Login as {role}
              </Button>
            </Link>
        </form>
    )
}

export default function LoginPage() {
  return (
    <>
    <SiteHeader />
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
                <Ticket className="h-8 w-8 text-primary"/>
            </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Select your role to sign in to your account.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="attendee" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="attendee"><User className="mr-2"/>Attendee</TabsTrigger>
                    <TabsTrigger value="organizer"><Briefcase className="mr-2"/>Organizer</TabsTrigger>
                    <TabsTrigger value="admin"><Shield className="mr-2"/>Admin</TabsTrigger>
                    <TabsTrigger value="vendor"><LayoutDashboard className="mr-2"/>Vendor</TabsTrigger>
                </TabsList>
                <TabsContent value="attendee">
                    <LoginForm role="Attendee" email="attendee@example.com" password="password123" dashboardPath="/attendee" />
                </TabsContent>
                <TabsContent value="organizer">
                    <LoginForm role="Organizer" email="organizer@example.com" password="password123" dashboardPath="/organizer" />
                </TabsContent>
                <TabsContent value="admin">
                    <LoginForm role="Admin" email="admin@example.com" password="password123" dashboardPath="/admin" />
                </TabsContent>
                <TabsContent value="vendor">
                    <LoginForm role="Vendor" email="vendor@example.com" password="password123" dashboardPath="/vendor" />
                </TabsContent>
            </Tabs>
           <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link href="#" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
