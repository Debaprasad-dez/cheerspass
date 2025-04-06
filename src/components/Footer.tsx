
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark/80 backdrop-blur-sm border-t border-white/10 py-12 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
              CheersPass
              </span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Discover and book the best events in your city. Your ticket to unforgettable experiences.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-neon-blue transition-colors">
                  My Tickets
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events?category=music" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Music Events
                </Link>
              </li>
              <li>
                <Link to="/events?category=sports" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Sports Events
                </Link>
              </li>
              <li>
                <Link to="/events?category=conference" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Conferences
                </Link>
              </li>
              <li>
                <Link to="/events?category=arts" className="text-gray-400 hover:text-neon-blue transition-colors">
                  Arts & Culture
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                debaprasadpaul208@gmail.com
              </li>
              
              <li className="text-gray-400">
                Halasuru, Bengaluru, India, 560008
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 Debaprasad.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
