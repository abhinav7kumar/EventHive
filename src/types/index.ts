
export type EventCategory = 'Music' | 'Sports' | 'Technology' | 'Conference' | 'Arts' | 'Food';

export type Event = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  date: string;
  location: string;
  category: EventCategory;
  isFeatured?: boolean;
  isTrending?: boolean;
  schedule?: { time: string; activity: string; details?: string }[];
  speakers?: { name:string; title: string; avatar: string }[];
  venue: {
    name: string;
    address: string;
    lat?: number;
    lng?: number;
  };
  tickets: TicketType[];
  published: boolean;
  organizer: string;
  externalLink: string;
};

export type TicketType = {
  id: string;
  name: 'General' | 'VIP' | 'Student' | 'Early Bird';
  price: number;
  quantity: number;
  saleStartDate: string;
  saleEndDate: string;
};

export type Attendee = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  eventsAttended: number;
  lastActive: string;
  status?: 'Active' | 'Suspended';
};

export type Organizer = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  eventsOrganized: number;
  isVerified: boolean;
  status: 'Active' | 'Pending Review' | 'Suspended';
};

export type Vendor = {
  id: string;
  name?: string;
  companyName: string;
  contactName: string;
  email: string;
  avatar: string;
  sponsoredEvents: number;
  status: 'Active' | 'Inactive';
};
