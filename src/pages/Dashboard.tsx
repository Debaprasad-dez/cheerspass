
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, getTimeRemaining } from '@/lib/utils';
import { useBookings } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Calendar, MapPin, Ticket, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { getUserBookings, cancelBooking } = useBookings();
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const loadBookings = () => {
      const userBookings = getUserBookings();
      setBookings(userBookings);
    };

    loadBookings();
  }, [getUserBookings]);

  const getFilteredBookings = () => {
    if (activeTab === 'all') {
      return bookings;
    }

    const now = new Date().toISOString();
    
    if (activeTab === 'upcoming') {
      return bookings.filter(booking => 
        booking.status === 'confirmed' && booking.event.date > now
      );
    }
    
    if (activeTab === 'past') {
      return bookings.filter(booking => 
        booking.event.date < now || booking.status === 'cancelled'
      );
    }
    
    return [];
  };

  const handleCancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      cancelBooking(bookingId);
      // Refresh bookings
      setBookings(getUserBookings());
    }
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Events</h1>
        <p className="text-xl text-gray-400 mb-8">Manage your upcoming and past event bookings</p>

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white/5 border border-white/10 p-1 mb-8">
            <TabsTrigger 
              value="upcoming" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-neon-blue data-[state=active]:text-white"
            >
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-neon-blue data-[state=active]:text-white"
            >
              Past Events
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-neon-blue data-[state=active]:text-white"
            >
              All Bookings
            </TabsTrigger>
          </TabsList>

          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 glassmorphism rounded-xl animate-fadeIn">
              <div className="mb-4">
                <Ticket className="h-12 w-12 mx-auto text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No {activeTab} bookings found</h3>
              <p className="text-gray-400 mb-6">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming events. Browse events to book tickets!"
                  : activeTab === 'past' 
                    ? "You don't have any past events."
                    : "You haven't booked any events yet. Start by exploring our event listings!"}
              </p>
              <Link to="/events">
                <Button className="neon-button">
                  Browse Events
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => {
                const isPast = new Date(booking.event.date) < new Date();
                const isCancelled = booking.status === 'cancelled';
                
                return (
                  <div 
                    key={booking.id} 
                    className={`glassmorphism rounded-xl overflow-hidden animate-fadeIn ${
                      isCancelled ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/4 h-40 md:h-auto relative">
                        <img 
                          src={booking.event.imageUrl} 
                          alt={booking.event.title}
                          className="w-full h-full object-cover"
                        />
                        {isCancelled && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <div className="bg-red-500/80 px-3 py-1 rounded-full text-sm font-medium">
                              Cancelled
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6 md:w-3/4">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{booking.event.title}</h3>
                            <div className="flex items-center text-sm text-gray-400 mb-2">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{formatDate(booking.event.date)}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{booking.event.location}</span>
                            </div>
                          </div>
                          
                          {!isPast && !isCancelled && (
                            <div className="bg-neon-purple/20 px-3 py-1 rounded-full flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-neon-blue" />
                              <span className="text-xs font-medium">
                                {getTimeRemaining(booking.event.date)}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="text-gray-400">Quantity:</span>{' '}
                              <span className="font-medium">{booking.quantity} tickets</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-400">Total:</span>{' '}
                              <span className="font-medium">₹{booking.totalPrice.toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {!isCancelled && (
                              <Link to={`/pass/${booking.id}`}>
                                <Button size="sm" className="neon-button">
                                  <Ticket className="h-3 w-3 mr-1" />
                                  View Pass
                                </Button>
                              </Link>
                            )}
                            
                            {!isPast && !isCancelled && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-500 border-red-500 hover:bg-red-500/10"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
