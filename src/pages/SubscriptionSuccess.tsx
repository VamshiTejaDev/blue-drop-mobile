import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Crown, 
  Calendar, 
  Gift,
  Home,
  Download
} from 'lucide-react';

const SubscriptionSuccess = () => {
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
              Subscription Active!
            </h1>
            <p className="text-primary-foreground/80">
              Welcome to Swatchh Water Premium
            </p>
          </div>

          {/* Subscription Details */}
          <Card className="border-0 shadow-floating bg-white/95 backdrop-blur">
            <CardContent className="p-6 space-y-4">
              <div className="text-center border-b pb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Quarterly Plan</h3>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Active until March 19, 2025
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Plan Duration:</span>
                  <span className="font-medium">3 Months</span>
                </div>
                <div className="flex justify-between">
                  <span>Deliveries Included:</span>
                  <span className="font-medium">12 Tankers</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Paid:</span>
                  <span className="font-medium">₹7,999</span>
                </div>
                <div className="flex justify-between">
                  <span>You Saved:</span>
                  <span className="font-medium text-success">₹4,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="border-0 shadow-floating bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 text-center">Your Benefits</h4>
              <div className="space-y-3">
                {[
                  'Priority customer support',
                  'Free emergency deliveries',
                  'Flexible scheduling',
                  'Quality guarantee',
                  'SMS notifications'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Delivery */}
          <Card className="border-0 shadow-floating bg-gradient-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Schedule Your First Delivery</h4>
                  <p className="text-sm text-primary-foreground/80">
                    Book your delivery slot now
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
          onClick={() => navigate('/book')}
          className="w-full h-12 bg-white text-primary hover:bg-white/90 shadow-floating"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Schedule First Delivery
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/home')}
            className="border-white/20 text-primary-foreground hover:bg-white/20"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
          
          <Button
            variant="outline"
            className="border-white/20 text-primary-foreground hover:bg-white/20"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;