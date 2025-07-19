import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
import { Zap, Clock, MapPin } from 'lucide-react';

const EmergencyButton = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEmergencyBooking = async () => {
    setLoading(true);
    // Simulate emergency booking
    setTimeout(() => {
      setLoading(false);
      navigate('/track');
    }, 2000);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-destructive hover:bg-destructive/90 shadow-floating z-50"
          size="icon"
        >
          <Zap className="h-6 w-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="mx-4">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-destructive" />
            <span>Emergency Water Booking</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>
              Request immediate water delivery to your registered address.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Delivery within 1-2 hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>HSR Layout, Bangalore</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">5000L Tanker - ₹1,549</span>
                <span className="text-xs text-muted-foreground">(+₹250 emergency charge)</span>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleEmergencyBooking}
            disabled={loading}
            className="bg-destructive hover:bg-destructive/90"
          >
            {loading ? 'Booking...' : 'Confirm Emergency Booking'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmergencyButton;