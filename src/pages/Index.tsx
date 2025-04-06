
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getAllEvents } from '@/services/eventService';
import { Event } from '@/types';
import EventCard from '@/components/EventCard';
import { ArrowRight, Calendar, Map, Search } from 'lucide-react';

const Index = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await getAllEvents();
        setFeaturedEvents(events.slice(0, 4));
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/20 via-transparent to-transparent" />
        <div 
          className="absolute inset-0 z-[-1] bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}
        />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-neon-blue bg-clip-text text-transparent animate-fadeIn">
              Discover Incredible Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Your ticket to unforgettable experiences. Find, book, and enjoy events that match your interests.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <Link to="/events">
                <Button className="neon-button w-full sm:w-auto">
                  Browse Events <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 w-full sm:w-auto">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-dark to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glassmorphism p-6 rounded-xl flex flex-col items-center text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Events</h3>
              <p className="text-gray-400">
                Discover events that match your interests, from music festivals to tech conferences.
              </p>
            </div>

            <div className="glassmorphism p-6 rounded-xl flex flex-col items-center text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Instantly</h3>
              <p className="text-gray-400">
                Secure your spot with our seamless booking process, get tickets in seconds.
              </p>
            </div>

            <div className="glassmorphism p-6 rounded-xl flex flex-col items-center text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue flex items-center justify-center mb-4">
                <Map className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Attend & Enjoy</h3>
              <p className="text-gray-400">
                Access your digital passes and enjoy unforgettable experiences with friends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <Link to="/events" className="text-neon-blue hover:text-neon-purple transition-colors">
              <div className="flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-dark/50 rounded-xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-neon-purple/10 z-[-1]" />
        <div 
          className="absolute inset-0 z-[-2] bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}
        />
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Amazing Events?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users finding and booking their next great experience.
            </p>
            <Link to="/events">
              <Button className="neon-button">
                Explore Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
