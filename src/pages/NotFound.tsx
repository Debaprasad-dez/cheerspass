
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dark opacity-95" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}
        />
      </div>

      <div className="max-w-md w-full text-center glassmorphism rounded-xl p-10 animate-fadeIn">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-bold mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="neon-button w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link to="/events">
            <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Browse Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
