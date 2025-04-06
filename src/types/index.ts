
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  location: string;
  imageUrl: string;
  price: number;
  ticketsAvailable: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  event: Event;
  quantity: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  ticketCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
