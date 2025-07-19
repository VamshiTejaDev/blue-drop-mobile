import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Truck, 
  Phone, 
  MessageCircle, 
  MapPin,
  Clock,
  User,
  Navigation
} from 'lucide-react';

const TrackTanker = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [estimatedTime, setEstimatedTime] = useState(15);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const orderSteps = [
    { id: 1, title: 'Order Confirmed', time: '2:30 PM', completed: true },
    { id: 2, title: 'Tanker Dispatched', time: '3:15 PM', completed: true },
    { id: 3, title: 'On the Way', time: 'ETA 15 mins', completed: false, active: true },
    { id: 4, title: 'Delivered', time: '', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/home')}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Track Order</h1>
              <p className="text-sm text-primary-foreground/80">#SW12345</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            In Transit
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Live Map */}
        <Card className="border-0 shadow-card">
          <CardContent className="p-0">
            <div className="relative h-64 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg overflow-hidden">
              {/* Simulated Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-12 w-12 text-primary mx-auto mb-2 animate-pulse" />
                  <p className="text-sm text-muted-foreground">Live GPS Tracking</p>
                  <p className="text-xs text-muted-foreground">Tanker is 2.3 km away</p>
                </div>
              </div>
              
              {/* Animated Truck Icon */}
              <div className="absolute bottom-16 left-16 bg-primary text-primary-foreground p-2 rounded-full shadow-floating">
                <Truck className="h-6 w-6" />
              </div>
              
              {/* Destination Pin */}
              <div className="absolute top-16 right-16 bg-destructive text-destructive-foreground p-2 rounded-full shadow-floating">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ETA Card */}
        <Card className="border-0 shadow-card bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Estimated Arrival</h3>
                <p className="text-primary-foreground/80">Your water tanker is on the way</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{estimatedTime} mins</div>
                <div className="text-sm text-primary-foreground/80">3:45 PM</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Progress */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle>Order Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderSteps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-success text-success-foreground' 
                    : step.active 
                    ? 'bg-primary text-primary-foreground animate-pulse' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.completed ? '✓' : step.id}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Driver Details */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Driver Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Ramesh Kumar</div>
                  <div className="text-sm text-muted-foreground">Driver • KA-01-AB-1234</div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm">4.8 rating</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call Driver
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tanker Size:</span>
              <span className="font-medium">5000L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Address:</span>
              <span className="font-medium text-right">HSR Layout, Bangalore</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount:</span>
              <span className="font-medium">₹1,299</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment:</span>
              <span className="font-medium">Cash on Delivery</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/delivery-otp')}
          >
            <Clock className="h-4 w-4 mr-2" />
            Prepare for Delivery
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-destructive/20 text-destructive hover:bg-destructive/5"
          >
            Cancel Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrackTanker;