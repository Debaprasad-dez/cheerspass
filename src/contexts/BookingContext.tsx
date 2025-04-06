
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { Event, Booking } from '../types';

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  bookEvent: (event: Event, quantity: number) => Promise<Booking>;
  cancelBooking: (bookingId: string) => void;
  getUserBookings: () => Booking[];
  getBookingById: (id: string) => Booking | undefined;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Load bookings from localStorage when user logs in
      const savedBookings = localStorage.getItem(`bookings-${user.id}`);
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    } else {
      // Clear bookings when user logs out
      setBookings([]);
    }
    setLoading(false);
  }, [user]);

  const saveBookings = (updatedBookings: Booking[]) => {
    if (user) {
      localStorage.setItem(`bookings-${user.id}`, JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
    }
  };

  const bookEvent = async (event: Event, quantity: number): Promise<Booking> => {
    if (!user) {
      toast.error('You must be logged in to book an event');
      throw new Error('User not authenticated');
    }

    setLoading(true);
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new booking
      const newBooking: Booking = {
        id: 'booking-' + Math.random().toString(36).substring(2, 9),
        eventId: event.id,
        userId: user.id,
        event: event,
        quantity: quantity,
        totalPrice: event.price * quantity,
        bookingDate: new Date().toISOString(),
        status: 'confirmed',
        ticketCode: Math.random().toString(36).substring(2, 12).toUpperCase()
      };
      
      // Save booking
      const updatedBookings = [...bookings, newBooking];
      saveBookings(updatedBookings);
      
      toast.success('Event booked successfully!');
      return newBooking;
    } catch (error) {
      toast.error('Booking failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = (bookingId: string) => {
    if (!user) {
      toast.error('You must be logged in to cancel a booking');
      return;
    }

    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) {
        toast.error('Booking not found');
        return;
      }

      // Update booking status
      const updatedBookings = bookings.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      );
      saveBookings(updatedBookings);
      
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  const getUserBookings = () => {
    if (!user) return [];
    return bookings.filter(booking => booking.userId === user.id);
  };

  const getBookingById = (id: string) => {
    return bookings.find(booking => booking.id === id);
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      loading,
      bookEvent,
      cancelBooking,
      getUserBookings,
      getBookingById
    }}>
      {children}
    </BookingContext.Provider>
  );
};
