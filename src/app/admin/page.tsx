import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, BarChart2, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/create-event">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
            </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <Users /> Manage Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">View and manage all user accounts.</p>
            <Button variant="outline">View Users</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart2 /> View Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Access detailed event and user analytics.</p>
            <Button variant="outline">View Analytics</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
                <Settings /> System Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Configure system-wide settings.</p>
            <Button variant="outline">Configure Rules</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
