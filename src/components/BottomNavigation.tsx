import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Truck, 
  Clock, 
  CreditCard, 
  User 
} from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/book', icon: Truck, label: 'Book' },
    { path: '/track', icon: Clock, label: 'Track' },
    { path: '/subscription', icon: CreditCard, label: 'Plans' },
    { path: '/history', icon: User, label: 'Profile' }
  ];

  const isActive = (path: string) => location.pathname === path;

  // Don't show navigation on login page
  if (location.pathname === '/') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            size="sm"
            onClick={() => navigate(item.path)}
            className={`flex-col h-12 px-2 ${
              isActive(item.path) 
                ? 'text-primary bg-primary/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;