
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Download, Ticket, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookings } from '@/contexts/BookingContext';
import { formatDate, generateQrCode } from '@/lib/utils';

const EventPass = () => {
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

  const handleDownloadPass = () => {
    // In a real application, this would generate a PDF ticket
    // For now, we'll just show an alert
    alert('In a real application, this would download a PDF ticket for the event.');
  };

  if (!booking) {
    return (
      <div className="min-h-screen pt-24 md:pt-32 flex justify-center">
        <div className="animate-pulse text-xl">Loading event pass...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6 max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Event Pass</h1>
          <p className="text-gray-400">Present this pass at the venue entrance</p>
        </div>

        <div className="neon-border rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-dark to-dark/90">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">{booking.event.title}</h2>
                <p className="text-sm text-gray-400">{booking.event.category}</p>
              </div>
              <div className="bg-gradient-to-r from-neon-purple to-neon-blue p-2 rounded-full">
                <Ticket className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="border-t border-b border-white/10 py-4 mb-4 space-y-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-3 text-neon-blue" />
                <div>
                  <p className="text-xs text-gray-400">Date & Time</p>
                  <p className="text-sm">{formatDate(booking.event.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-neon-blue" />
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-sm">{booking.event.location}</p>
                </div>
              </div>

              <div className="flex items-center">
                <User className="h-4 w-4 mr-3 text-neon-blue" />
                <div>
                  <p className="text-xs text-gray-400">Attendees</p>
                  <p className="text-sm">{booking.quantity} {booking.quantity === 1 ? 'Person' : 'People'}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-1">Ticket Code</p>
              <p className="font-mono text-lg font-bold">{booking.ticketCode}</p>
            </div>

            <div className="flex justify-center mb-4">
              <div className="p-2 bg-white rounded-lg">
                <img 
                  src={generateQrCode(`EVENT:${booking.id}:${booking.ticketCode}`)} 
                  alt="QR Code" 
                  className="h-48 w-48"
                />
              </div>
            </div>

            <div className="text-center text-xs text-gray-400">
              <p>Scan this QR code at the venue entrance</p>
              <p>Booking ID: {booking.id.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <Button 
          className="neon-button w-full"
          onClick={handleDownloadPass}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Pass
        </Button>
      </div>
    </div>
  );
};

export default EventPass;
