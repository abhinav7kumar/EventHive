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
