
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '@/types';
import { formatDate } from '@/lib/utils';
import { Button } from './ui/button';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const { id, title, date, location, imageUrl, price } = event;

  return (
    <div className="event-card group h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-xl aspect-[4/3]">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-60" />
        <div className="absolute bottom-3 left-3 bg-neon-purple/90 text-white px-3 py-1 rounded-full text-sm font-medium">
          ₹{price.toFixed(2)}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
        
        <div className="space-y-2 mb-4 text-gray-400 flex-grow">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-neon-blue" />
            <span className="text-sm">{formatDate(date)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-neon-blue" />
            <span className="text-sm truncate">{location}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <Link to={`/events/${id}`}>
            <Button variant="link" className="text-neon-blue p-0 h-auto">
              View Details
            </Button>
          </Link>
          <Link to={`/events/${id}`}>
            <Button size="sm" className="neon-button px-4 py-1">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
