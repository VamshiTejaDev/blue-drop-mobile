import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Droplets, 
  Truck, 
  Clock, 
  Phone, 
  Star,
  MapPin,
  Shield,
  Zap
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Same day delivery within 2-4 hours"
    },
    {
      icon: Shield,
      title: "Pure Water",
      description: "RO filtered & quality tested"
    },
    {
      icon: MapPin,
      title: "GPS Tracking",
      description: "Real-time delivery tracking"
    },
    {
      icon: Zap,
      title: "Emergency Service",
      description: "24/7 emergency water delivery"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Good Morning!</h1>
              <p className="text-primary-foreground/80">Rajesh Kumar</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/20"
              onClick={() => navigate('/emergency')}
            >
              <Phone className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Delivering to: HSR Layout, Bangalore</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigate('/book')}
            className="h-24 bg-gradient-primary hover:bg-primary-hover shadow-water"
          >
            <div className="text-center">
              <Truck className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Book Tanker</span>
            </div>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/track')}
            className="h-24 border-primary/20 hover:bg-primary/5"
          >
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
              <span className="text-sm font-medium text-primary">Track Order</span>
            </div>
          </Button>
        </div>

        {/* Current Order Status */}
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Current Order</h3>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                In Transit
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-medium">#SW12345</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tanker Size:</span>
                <span>5000L</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Time:</span>
                <span className="text-success font-medium">15 mins</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3"
              onClick={() => navigate('/track')}
            >
              Track Live
            </Button>
          </CardContent>
        </Card>

        {/* Features */}
        <div>
          <h3 className="font-semibold mb-4">Why Choose Swatchh Water?</h3>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card">
                <CardContent className="p-4 text-center">
                  <feature.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscription Banner */}
        <Card className="border-0 shadow-card bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold mb-1">Save with Subscription</h4>
                <p className="text-sm text-primary-foreground/80">Get up to 25% off on monthly plans</p>
              </div>
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => navigate('/subscription')}
              >
                View Plans
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Orders</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/history')}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {[
              { id: '#SW12340', date: 'Yesterday', status: 'Delivered', size: '3000L' },
              { id: '#SW12339', date: '2 days ago', status: 'Delivered', size: '5000L' }
            ].map((order, index) => (
              <Card key={index} className="border-0 shadow-card">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{order.id}</span>
                        <Badge variant="outline" className="text-xs">
                          {order.size}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        {order.status}
                      </Badge>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground ml-1">4.8</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;