
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDate } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/contexts/BookingContext';
import { getEventById } from '@/services/eventService';
import { toast } from 'sonner';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { bookEvent } = useBookings();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const eventData = await getEventById(id);
        if (eventData) {
          setEvent(eventData);
        } else {
          throw new Error('Event not found');
        }
      } catch (error) {
        console.error('Failed to fetch event details:', error);
        toast.error('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to book this event');
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    
    setIsBookingDialogOpen(true);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleBooking = async () => {
    if (!event) return;
    
    setIsProcessing(true);
    try {
      const booking = await bookEvent(event, quantity);
      setIsBookingDialogOpen(false);
      toast.success('Event booked successfully!');
      navigate(`/confirmation/${booking.id}`);
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('Failed to book event. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 md:pt-32 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-24 md:pt-32 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="text-gray-400 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/events')}>
          Browse All Events
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden mb-8">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-auto object-cover"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6">{event.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center glassmorphism p-4 rounded-lg">
                <Calendar className="h-5 w-5 mr-3 text-neon-blue" />
                <div>
                  <p className="text-gray-400 text-sm">Date & Time</p>
                  <p className="font-medium">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="flex items-center glassmorphism p-4 rounded-lg">
                <MapPin className="h-5 w-5 mr-3 text-neon-blue" />
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center glassmorphism p-4 rounded-lg">
                <Users className="h-5 w-5 mr-3 text-neon-blue" />
                <div>
                  <p className="text-gray-400 text-sm">Available Tickets</p>
                  <p className="font-medium">{event.ticketsAvailable}</p>
                </div>
              </div>

              <div className="flex items-center glassmorphism p-4 rounded-lg">
                <Info className="h-5 w-5 mr-3 text-neon-blue" />
                <div>
                  <p className="text-gray-400 text-sm">Category</p>
                  <p className="font-medium capitalize">{event.category}</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <div className="text-gray-300 space-y-4">
                <p>{event.description}</p>
                <p>
                  Join us for an unforgettable experience at {event.title}. 
                  This event offers a unique opportunity to immerse yourself in an exciting atmosphere.
                </p>
                <p>
                  Don't miss out on this amazing event - tickets are limited, so book yours today!
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glassmorphism rounded-xl p-6 sticky top-32">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Get Your Tickets</h2>
                <p className="text-gray-400">Secure your spot at this amazing event</p>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Price per ticket:</span>
                  <span className="font-bold text-xl">₹{event.price.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-400">Service fee:</span>
                    <span className="text-sm text-gray-400">₹2.50</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Processing fee:</span>
                    <span className="text-sm text-gray-400">₹1.00</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-neon-blue">
                  ₹{(event.price + 3.5).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button 
                className="neon-button w-full mb-4"
                onClick={handleBookNow}
              >
                Book Now
              </Button>

              <p className="text-xs text-gray-400 text-center">
                By booking, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="bg-dark border border-neon-purple/30 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Event</DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete your booking for {event.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Tickets</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={handleQuantityChange}
                className="bg-white/5 border-white/10"
              />
              <p className="text-xs text-gray-400">Maximum 10 tickets per booking</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Price ({quantity} x ${event.price.toFixed(2)})</span>
                <span>₹{(quantity * event.price).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Fees</span>
                <span>₹{(3.5 * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-white/10 pt-2 mt-2">
                <span>Total</span>
                <span className="text-neon-blue">₹{((event.price + 3.5) * quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBookingDialogOpen(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              className="neon-button"
              onClick={handleBooking}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetails;
