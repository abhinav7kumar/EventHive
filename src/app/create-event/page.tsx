import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";

export default function CreateEventPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Event</CardTitle>
          <CardDescription>Fill in the details below to set up your event.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" placeholder="e.g., Summer Music Festival" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Tell attendees about your event" rows={5}/>
          </div>
          
          <div className="space-y-2">
            <Label>Banner Image</Label>
            <Input type="file" className="file:text-primary file:font-semibold"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="date">Date & Time</Label>
                <Input id="date" type="datetime-local" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                 <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>

           <div className="space-y-2">
            <Label htmlFor="venue">Venue Name & Address</Label>
            <Input id="venue" placeholder="e.g., Central Park, New York" />
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4">Ticket Types</h3>
            <div className="space-y-4 p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="md:col-span-2 space-y-2">
                        <Label>Type</Label>
                        <Select defaultValue="general">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="vip">VIP</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="early-bird">Early Bird</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Price ($)</Label>
                        <Input type="number" placeholder="25.00"/>
                    </div>
                    <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input type="number" placeholder="500"/>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-5 w-5"/>
                    </Button>
                </div>
                 <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Ticket Type
                </Button>
            </div>
          </div>
          
           <Separator />
           
           <div className="space-y-4">
            <h3 className="text-lg font-semibold">Event Status</h3>
             <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="publish" className="font-semibold">Publish Event</Label>
                  <p className="text-sm text-muted-foreground">Make your event visible to everyone.</p>
                </div>
                <Switch id="publish"/>
             </div>
             <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="featured" className="font-semibold">Feature Event</Label>
                  <p className="text-sm text-muted-foreground">Showcase this event on the homepage.</p>
                </div>
                <Switch id="featured"/>
             </div>
           </div>

           <div className="flex justify-end gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button>Publish Event</Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
