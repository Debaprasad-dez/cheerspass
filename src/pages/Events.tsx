
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  getAllEvents, 
  getEventsByCategory, 
  searchEvents, 
  categories 
} from '@/services/eventService';
import { Event } from '@/types';
import EventCard from '@/components/EventCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Get initial category from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        if (activeCategory === 'all') {
          const allEvents = await getAllEvents();
          setEvents(allEvents);
          setFilteredEvents(allEvents);
        } else {
          const categoryEvents = await getEventsByCategory(activeCategory);
          setEvents(categoryEvents);
          setFilteredEvents(categoryEvents);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [activeCategory]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Update URL
    searchParams.set('category', category);
    setSearchParams(searchParams);
    
    // Reset search
    setSearchQuery('');
  };

  // Handle search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setFilteredEvents(events);
      return;
    }

    setLoading(true);
    try {
      const results = await searchEvents(searchQuery);
      setFilteredEvents(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white to-neon-blue bg-clip-text text-transparent">
            Discover Events
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find and book tickets for the most exciting events happening around you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search events, venues or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 focus:border-neon-blue"
              />
            </div>
            <Button type="submit" className="neon-button">
              Search
            </Button>
          </form>
        </div>

        <div className="mb-10">
          <Tabs defaultValue={activeCategory} onValueChange={handleCategoryChange} value={activeCategory}>
            <TabsList className="bg-white/5 border border-white/10 p-1 overflow-x-auto flex w-full justify-start md:justify-center">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-neon-blue data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-dark/50 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold mb-4">No events found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No results found for "${searchQuery}"`
                : `No events found in this category`}
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                searchParams.delete('category');
                setSearchParams(searchParams);
              }}
            >
              View all events
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
