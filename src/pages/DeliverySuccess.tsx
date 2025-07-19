import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Star, 
  Home, 
  Receipt,
  Gift,
  Share2
} from 'lucide-react';

const DeliverySuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Success Animation */}
          <div className="text-center">
            <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in">
              <CheckCircle className="w-16 h-16 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              Delivery Complete!
            </h1>
            <p className="text-primary-foreground/80">
              Your water tanker has been successfully delivered
            </p>
          </div>

          {/* Order Details */}
          <Card className="border-0 shadow-floating bg-white/95 backdrop-blur">
            <CardContent className="p-6 space-y-4">
              <div className="text-center border-b pb-4">
                <h3 className="font-semibold text-lg">Order #SW12345</h3>
                <p className="text-muted-foreground">Delivered at 3:42 PM</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Tanker Size:</span>
                  <span className="font-medium">5000L</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Paid:</span>
                  <span className="font-medium">₹1,299</span>
                </div>
                <div className="flex justify-between">
                  <span>Driver:</span>
                  <span className="font-medium">Ramesh Kumar</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating */}
          <Card className="border-0 shadow-floating bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 text-center">Rate your experience</h4>
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="w-8 h-8 text-yellow-400 fill-current cursor-pointer hover:scale-110 transition-transform" 
                  />
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Tap to rate your delivery experience
              </p>
            </CardContent>
          </Card>

          {/* Rewards */}
          <Card className="border-0 shadow-floating bg-gradient-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Congratulations!</h4>
                  <p className="text-sm text-primary-foreground/80">
                    You earned 50 loyalty points
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3">
        <Button
          onClick={() => navigate('/home')}
          className="w-full h-12 bg-white text-primary hover:bg-white/90 shadow-floating"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/history')}
            className="border-white/20 text-primary-foreground hover:bg-white/20"
          >
            <Receipt className="w-4 h-4 mr-2" />
            View Receipt
          </Button>
          
          <Button
            variant="outline"
            className="border-white/20 text-primary-foreground hover:bg-white/20"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliverySuccess;