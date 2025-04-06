
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookings } from '@/contexts/BookingContext';
import { formatDate } from '@/lib/utils';

const BookingConfirmation = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { getBookingById } = useBookings();
  const [booking, setBooking] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookingId) {
      navigate('/dashboard');
      return;
    }

    const loadBooking = () => {
      const foundBooking = getBookingById(bookingId);
      if (foundBooking) {
        setBooking(foundBooking);
      } else {
        navigate('/dashboard');
      }
    };

    loadBooking();
  }, [bookingId, getBookingById, navigate]);

  if (!booking) {
    return (
      <div className="min-h-screen pt-24 md:pt-32 flex justify-center">
        <div className="animate-pulse text-xl">Loading booking details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-gray-300">Your tickets for {booking.event.title} have been booked successfully.</p>
        </div>

        <div className="glassmorphism rounded-xl overflow-hidden mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="relative h-40 md:h-60">
            <img 
              src={booking.event.imageUrl} 
              alt={booking.event.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-2xl font-bold">{booking.event.title}</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Date & Time</p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-neon-blue" />
                  <p>{formatDate(booking.event.date)}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-gray-400 text-sm">Location</p>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-neon-blue" />
                  <p>{booking.event.location}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="font-semibold mb-4">Booking Details</h3>
              <div className="grid grid-cols-2 gap-y-3">
                <span className="text-gray-400">Booking Reference</span>
                <span className="font-mono">{booking.id.toUpperCase()}</span>
                
                <span className="text-gray-400">Ticket Quantity</span>
                <span>{booking.quantity}</span>
                
                <span className="text-gray-400">Total Amount</span>
                <span>${booking.totalPrice.toFixed(2)}</span>
                
                <span className="text-gray-400">Booking Date</span>
                <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="bg-neon-purple/10 rounded-lg p-4 border border-neon-purple/30">
              <p className="text-center text-sm">
                Your event pass is ready! Download it now or access it anytime from your dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <Link to={`/pass/${booking.id}`}>
            <Button className="neon-button w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              View Event Pass
            </Button>
          </Link>
          
          <Link to="/dashboard">
            <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 w-full sm:w-auto">
              Go to My Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
