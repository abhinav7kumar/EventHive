
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, User, Shield, Briefcase, LayoutDashboard, KeyRound } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { useToast } from "@/hooks/use-toast";


function LoginForm({ role, email: defaultEmail, password: defaultPassword, dashboardPath }: { role: string, email?: string, password?: string, dashboardPath: string }) {
    const [email, setEmail] = useState(defaultEmail || '');
    const [password, setPassword] = useState(defaultPassword || '');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('credentials'); // 'credentials' or 'otp'
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (!email || !password) {
             toast({
                title: "Login Failed",
                description: "Please enter both email and password.",
                variant: "destructive",
            });
            return;
        }
        
        // In a real app, you would call an API to send the OTP
        console.log(`Simulating OTP sent to ${email}`);
        setStep('otp');
        toast({
            title: "OTP Sent!",
            description: "A one-time password has been sent to your email.",
        });
    };

    const handleVerifyAndLogin = (e: React.FormEvent) => {
        e.preventDefault();
         if (otp.length < 6) {
             toast({
                title: "Invalid OTP",
                description: "Please enter a valid 6-digit OTP.",
                variant: "destructive",
            });
            return;
        }
        // In a real app, you'd verify the OTP against a backend service.
        // For this demo, we'll just log it and redirect.
        console.log(`Verifying OTP ${otp} for ${email}`);
        toast({
            title: "Login Successful!",
            description: `Redirecting to the ${role} dashboard...`,
        });
        router.push(dashboardPath);
    };

    if (step === 'otp') {
        return (
             <form className="space-y-4" onSubmit={handleVerifyAndLogin}>
                <div className="space-y-2">
                    <Label htmlFor={`${role}-otp`}>One-Time Password</Label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            id={`${role}-otp`}
                            type="text"
                            placeholder="Enter 6-digit code"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="pl-10"
                            maxLength={6}
                        />
                    </div>
                </div>
                <Button type="submit" className="w-full">
                    Verify & Login
                </Button>
                 <Button variant="link" size="sm" className="w-full" onClick={() => setStep('credentials')}>
                    Back to login
                </Button>
            </form>
        )
    }

    return (
        <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor={`${role}-email`}>Email</Label>
              <Input 
                id={`${role}-email`} 
                type="email" 
                placeholder="user@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor={`${role}-password`}>Password</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                    </Link>
                </div>
              <Input 
                id={`${role}-password`} 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
                Login as {role}
            </Button>
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
                <Terminal className="h-8 w-8 text-primary"/>
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
