
import { Event, Category } from '../types';

// Mock event data
const events: Event[] = [
  {
    id: 'e1',
    title: 'Neon Beats Night',
    description: 'Dive into an electrifying night of EDM with India’s top DJs and vibrant laser shows.',
    date: '2023-05-15T19:00:00',
    category: 'music',
    location: 'Jawaharlal Nehru Stadium, New Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    price: 2999.00,
    ticketsAvailable: 500
  },
  {
    id: 'e2',
    title: 'India Tech Summit 2023',
    description: 'Engage with India’s tech leaders and explore the future of innovation and startups.',
    date: '2023-06-22T09:00:00',
    category: 'conference',
    location: 'Bangalore International Exhibition Centre, Bengaluru',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80',
    price: 4999.00,
    ticketsAvailable: 300
  },
  {
    id: 'e3',
    title: 'Basketball Premier League Final',
    description: 'Catch the action as India’s top teams battle it out in the ultimate basketball showdown.',
    date: '2023-04-28T18:30:00',
    category: 'sports',
    location: 'Sardar Vallabhbhai Patel Indoor Stadium, Mumbai',
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    price: 1500.00,
    ticketsAvailable: 1000
  },
  {
    id: 'e4',
    title: 'Kaleidoscope Indie Film Fest',
    description: 'Celebrate creative storytelling at India’s leading indie film festival.',
    date: '2023-07-10T14:00:00',
    category: 'arts',
    location: 'NFAI Auditorium, Pune',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    price: 999.00,
    ticketsAvailable: 400
  },
  {
    id: 'e5',
    title: 'Retro Gaming India Expo',
    description: 'Relive gaming history with classic consoles, tournaments, and cosplay fun.',
    date: '2023-05-05T10:00:00',
    category: 'entertainment',
    location: 'Pragati Maidan, New Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    price: 700.00,
    ticketsAvailable: 600
  },
  {
    id: 'e6',
    title: 'India Gourmet & Wine Festival',
    description: 'Savor world-class cuisine and wine in an elegant riverside experience.',
    date: '2023-08-19T12:00:00',
    category: 'food',
    location: 'Ambrosia Resort, Pune',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    price: 4500.00,
    ticketsAvailable: 250
  },
  {
    id: 'e7',
    title: 'Mumbai Street Dance Showdown',
    description: 'India’s top crews go head-to-head in an epic dance battle for glory.',
    date: '2023-06-03T17:00:00',
    category: 'music',
    location: 'Shanmukhananda Hall, Mumbai',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    price: 1200.00,
    ticketsAvailable: 350
  },
  {
    id: 'e8',
    title: 'Digital Horizons Art Show',
    description: 'Explore groundbreaking digital art installations by India’s contemporary artists.',
    date: '2023-07-27T11:00:00',
    category: 'arts',
    location: 'India Habitat Centre, New Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    price: 500.00,
    ticketsAvailable: 800
  }
];


// Available event categories
export const categories: Category[] = [
  { id: 'all', name: 'All Events' },
  { id: 'music', name: 'Music' },
  { id: 'conference', name: 'Conferences' },
  { id: 'sports', name: 'Sports' },
  { id: 'arts', name: 'Arts & Culture' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'food', name: 'Food & Drink' }
];

// Get all events
export const getAllEvents = (): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(events);
    }, 500);
  });
};

// Get events by category
export const getEventsByCategory = (categoryId: string): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (categoryId === 'all') {
        resolve(events);
      } else {
        resolve(events.filter(event => event.category === categoryId));
      }
    }, 500);
  });
};

// Get event by ID
export const getEventById = (id: string): Promise<Event | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(events.find(event => event.id === id));
    }, 300);
  });
};

// Search events
export const searchEvents = (query: string): Promise<Event[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchResults = events.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase())
      );
      resolve(searchResults);
    }, 300);
  });
};
