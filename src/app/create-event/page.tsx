
'use client';

import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEvents } from "@/context/EventContext";
import type { Event } from "@/types";
import { useSearchParams } from "next/navigation";
import { getEventById } from "@/lib/mock-data";
import { format } from "date-fns";

function CreateEventForm() {
  const { addEvent } = useEvents();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [venue, setVenue] = useState('');

  useEffect(() => {
    if (eventId) {
      const event = getEventById(eventId);
      if (event) {
        setIsEditMode(true);
        setTitle(event.title);
        setDescription(event.description);
        // The browser expects 'yyyy-MM-ddThh:mm' format for datetime-local input
        setDate(format(new Date(event.date), "yyyy-MM-dd'T'HH:mm"));
        setCategory(event.category);
        setVenue(event.venue.address);
      }
    }
  }, [eventId]);

  const handlePublish = () => {
    if(!title || !description || !date || !category || !venue) {
        toast({
            title: "Error",
            description: "Please fill all the required fields.",
            variant: "destructive"
        })
        return;
    }
    
    if (isEditMode) {
       toast({
          title: "Event Updated!",
          description: "Your event details have been successfully saved.",
      });
      return;
    }

    const newEvent: Event = {
      id: `new-${Date.now()}`,
      title,
      description,
      shortDescription: description.substring(0, 100) + '...',
      image: 'https://picsum.photos/seed/newevent/1200/800',
      date,
      location: venue.split(',')[0],
      category: category as any,
      isFeatured: false,
      venue: { name: venue.split(',')[0], address: venue },
      tickets: [{ id: 't-new', name: 'General', price: 50, quantity: 100, saleStartDate: new Date().toISOString(), saleEndDate: date }],
      published: true,
      organizer: 'Admin',
      externalLink: '#',
    };

    addEvent(newEvent);

    toast({
        title: "Event Published!",
        description: "Your new event is now live for attendees to see.",
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDate('');
    setCategory('');
    setVenue('');
  };


  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Edit Event' : 'Create a New Event'}</CardTitle>
          <CardDescription>{isEditMode ? 'Update the details for your event below.' : 'Fill in the details below to set up your event.'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" placeholder="e.g., Summer Music Festival" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Tell attendees about your event" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label>Banner Image</Label>
            <Input type="file" className="file:text-primary file:font-semibold"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="date">Date & Time</Label>
                <Input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                 <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>

           <div className="space-y-2">
            <Label htmlFor="venue">Venue Name & Address</Label>
            <Input id="venue" placeholder="e.g., Central Park, New York" value={venue} onChange={(e) => setVenue(e.target.value)} />
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
                <Switch id="publish" defaultChecked/>
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
            <Button onClick={handlePublish}>{isEditMode ? 'Update Event' : 'Publish Event'}</Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default function CreateEventPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateEventForm />
    </Suspense>
  )
}
