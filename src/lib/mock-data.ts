import type { Event, EventCategory } from '@/types';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Stellar Sound Fest',
    shortDescription: 'An electrifying weekend of music under the stars.',
    description: 'Join us for the 3rd annual Stellar Sound Fest, featuring a diverse lineup of indie rock, electronic, and pop artists. Experience two days of non-stop music, art installations, and gourmet food trucks in the beautiful Greenfield Valley.',
    image: 'https://picsum.photos/seed/music1/1200/800',
    date: '2024-08-15T18:00:00Z',
    location: 'Greenfield Valley, CA',
    category: 'Music',
    isFeatured: true,
    venue: { name: 'Greenfield Valley Amphitheater', address: '123 Music Lane, Greenfield, CA 94536' },
    schedule: [
      { time: '18:00', activity: 'Gates Open', details: 'Doors open for all ticket holders.' },
      { time: '19:00', activity: 'Opening Act: The Voids', details: 'Kicking off the night with some fresh indie sounds.' },
      { time: '21:00', activity: 'Headliner: Galaxy Drifters', details: 'The main event! Get ready for an unforgettable performance.' },
    ],
    speakers: [],
    tickets: [{ id: 't1', name: 'General', price: 75, quantity: 2000, saleStartDate: '2024-05-01', saleEndDate: '2024-08-15' }],
    published: true,
    organizer: 'Stellar Productions',
    externalLink: '#',
  },
  {
    id: '2',
    title: 'AI & The Future of Tech',
    shortDescription: 'Explore the next frontier of artificial intelligence.',
    description: 'A two-day conference bringing together the brightest minds in AI. Attend keynotes, workshops, and panel discussions on machine learning, robotics, and ethical AI. Network with industry leaders and innovators.',
    image: 'https://picsum.photos/seed/tech1/1200/800',
    date: '2024-09-20T09:00:00Z',
    location: 'Metropolis Convention Center',
    category: 'Technology',
    isTrending: true,
    venue: { name: 'Metropolis Convention Center', address: '456 Tech Ave, Metropolis, 90210' },
    schedule: [
      { time: '09:00', activity: 'Registration & Coffee', details: 'Grab your badge and a coffee to start the day.' },
      { time: '10:00', activity: 'Keynote by Dr. Evelyn Reed', details: 'A look into the future of AI and society.' },
      { time: '12:00', activity: 'Lunch Break', details: 'Networking lunch provided for all attendees.' },
      { time: '14:00', activity: 'Workshop: Applied Machine Learning', details: 'A hands-on session for developers.' },
    ],
    speakers: [{ name: 'Dr. Evelyn Reed', title: 'CEO, Innovate AI', avatar: 'https://i.pravatar.cc/150?u=evelyn' }],
    tickets: [{ id: 't2', name: 'Early Bird', price: 450, quantity: 500, saleStartDate: '2024-06-01', saleEndDate: '2024-07-31' }],
    published: true,
    organizer: 'Future Forward Events',
    externalLink: '#',
  },
  {
    id: '3',
    title: 'Culinary Canvas',
    shortDescription: 'A celebration of artful cuisine and local flavors.',
    description: 'Taste your way through a curated selection of dishes from the city\'s top chefs. Culinary Canvas is a unique food festival that pairs gourmet bites with fine wines and craft beers. Enjoy live cooking demos and music.',
    image: 'https://picsum.photos/seed/food1/1200/800',
    date: '2024-07-28T12:00:00Z',
    location: 'Harborfront Park, Bayside',
    category: 'Food',
    venue: { name: 'Harborfront Park', address: '789 Waterfront Rd, Bayside, 33132' },
    tickets: [{ id: 't3', name: 'General', price: 120, quantity: 1000, saleStartDate: '2024-05-15', saleEndDate: '2024-07-28' }],
    published: true,
    organizer: 'Gourmet Gatherings',
    externalLink: '#',
  },
  {
    id: '4',
    title: 'City Marathon 2024',
    shortDescription: 'Race through the heart of the city.',
    description: 'Whether you\'re a seasoned runner or a first-timer, join thousands for the annual City Marathon. The scenic route takes you past iconic landmarks. All finishers receive a medal and a t-shirt.',
    image: 'https://picsum.photos/seed/sports1/1200/800',
    date: '2024-10-12T07:00:00Z',
    location: 'Downtown Plaza',
    category: 'Sports',
    venue: { name: 'Downtown Plaza', address: '1 Main Street, Downtown, 10001' },
    tickets: [{ id: 't4', name: 'General', price: 90, quantity: 5000, saleStartDate: '2024-06-01', saleEndDate: '2024-10-10' }],
    published: true,
    organizer: 'City Sports Council',
    externalLink: '#',
  },
  {
    id: '5',
    title: 'Modern Art Showcase',
    shortDescription: 'A stunning exhibition of contemporary masterpieces.',
    description: 'Immerse yourself in a world of color and form at the Modern Art Showcase. Featuring works from over 50 emerging and established artists, this exhibition explores themes of identity, nature, and society.',
    image: 'https://picsum.photos/seed/art1/1200/800',
    date: '2024-08-01T10:00:00Z',
    location: 'The Grand Gallery',
    category: 'Arts',
    isTrending: true,
    isFeatured: true,
    venue: { name: 'The Grand Gallery', address: '101 Gallery Row, Art District, 60614' },
    tickets: [{ id: 't5', name: 'General', price: 25, quantity: 1500, saleStartDate: '2024-06-15', saleEndDate: '2024-08-31' }],
    published: true,
    organizer: 'Arts United',
    externalLink: '#',
  },
  {
    id: '6',
    title: 'Innovators Summit',
    shortDescription: 'Connect, learn, and grow with industry pioneers.',
    description: 'The Innovators Summit is the premier event for entrepreneurs and business leaders. Gain insights from titans of industry, participate in high-impact networking sessions, and pitch your startup to leading investors.',
    image: 'https://picsum.photos/seed/conference1/1200/800',
    date: '2024-11-05T09:00:00Z',
    location: 'Apex Conference Hall',
    category: 'Conference',
    isFeatured: true,
    venue: { name: 'Apex Conference Hall', address: '202 Summit Peak, Business Bay, 94105' },
    speakers: [{ name: 'Jane Doe', title: 'Founder, TechCorp', avatar: 'https://i.pravatar.cc/150?u=jane' }],
    tickets: [{ id: 't6', name: 'VIP', price: 950, quantity: 200, saleStartDate: '2024-08-01', saleEndDate: '2024-11-01' }],
    published: true,
    organizer: 'VentureUp',
    externalLink: '#',
  },
];

export const getEvents = (): Event[] => mockEvents;

export const getEventById = (id: string): Event | undefined => mockEvents.find(event => event.id === id);

export const getFeaturedEvents = (): Event[] => mockEvents.filter(event => event.isFeatured);

export const getTrendingEvents = (): Event[] => mockEvents.filter(event => event.isTrending);

export const getCategories = (): EventCategory[] => {
  const categories = mockEvents.map(event => event.category);
  return [...new Set(categories)];
};
