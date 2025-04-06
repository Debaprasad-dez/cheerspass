
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar = ({ isScrolled }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-black/80 backdrop-blur-md py-2 shadow-lg" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white flex items-center">
            <span className="bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
            CheersPass
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-neon-blue transition-colors">Home</Link>
            <Link to="/events" className="text-white hover:text-neon-blue transition-colors">Events</Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-neon-purple">
                      <AvatarFallback className="bg-gradient-to-r from-neon-purple to-neon-blue text-white">
                        {user?.name ? getInitials(user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-dark border border-neon-purple/30" align="end">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-neon-purple/10"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>My Events</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-500 hover:bg-red-500/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="neon-button">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              className="text-white" 
              onClick={toggleMenu}
              size="icon"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 animate-slideUp bg-dark border border-neon rounded-xl px-2">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-white hover:text-neon-blue px-4 py-2 rounded-md hover:bg-white/5 text-center"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/events" 
                className="text-white hover:text-neon-blue px-4 py-2 rounded-md hover:bg-white/5 text-center"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-white hover:text-neon-blue px-4 py-2 rounded-md hover:bg-white/5 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    My Events
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-red-500 hover:text-red-400 px-4 py-2 rounded-md hover:bg-red-500/10 text-left flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link 
                    to="/login" 
                    className="w-full "
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="outline" className="w-full border-neon-blue text-neon-blue hover:bg-neon-blue/10 ">
                      Login
                    </Button>
                  </Link>
                  <Link 
                    to="/signup" 
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full neon-button">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
