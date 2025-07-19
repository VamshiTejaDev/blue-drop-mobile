import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Navigation, Clock, ArrowLeft, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CustomerTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [eta, setEta] = useState(12);
  const [status, setStatus] = useState<"en_route" | "arrived" | "delivering">("en_route");

  // Mock customer data
  const customerDetails = {
    name: "Raj Patel",
    phone: "+91 98765 43210",
    address: "Plot 45, Near City Mall, Satellite, Ahmedabad - 380015",
    landmark: "Opposite HDFC Bank"
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => {
        if (prev <= 1) {
          setStatus("arrived");
          return 0;
        }
        return prev - 1;
      });
    }, 3000); // Update every 3 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const handleCallCustomer = () => {
    toast({
      title: "Calling customer...",
      description: customerDetails.phone
    });
  };

  const handleArrivedAtLocation = () => {
    setStatus("delivering");
    toast({
      title: "Location Updated",
      description: "Marked as arrived at customer location"
    });
  };

  const handleStartDelivery = () => {
    navigate(`/supplier/delivery-otp/${orderId}`);
  };

  const getStatusText = () => {
    switch (status) {
      case "en_route":
        return `En Route • ETA ${eta} min`;
      case "arrived":
        return "Arrived at Location";
      case "delivering":
        return "Ready for Delivery";
      default:
        return "En Route";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "en_route":
        return "default";
      case "arrived":
        return "secondary";
      case "delivering":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/supplier/dashboard")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-primary">Navigate to Customer</h1>
            <p className="text-sm text-muted-foreground">Order #{orderId}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge 
            variant={getStatusColor() as any}
            className="text-sm px-4 py-2"
          >
            <Truck className="w-4 h-4 mr-2" />
            {getStatusText()}
          </Badge>
        </div>

        {/* Mock Map Area */}
        <Card className="overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 relative flex items-center justify-center">
            <div className="absolute inset-0 opacity-20"></div>
            
            {/* Mock route line */}
            <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-lg"></div>
            
            {/* Your location (truck) */}
            <div className="absolute bottom-8 left-8 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
              <Truck className="w-5 h-5" />
            </div>
            
            {/* Customer location */}
            <div className="absolute top-8 right-8 bg-destructive text-destructive-foreground p-2 rounded-full shadow-lg">
              <MapPin className="w-5 h-5" />
            </div>
            
            {/* Center content */}
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">
                {eta > 0 ? `${eta} min` : "Arrived"}
              </div>
              <div className="text-sm text-muted-foreground">
                {eta > 0 ? "Estimated Time" : "At Destination"}
              </div>
            </div>
          </div>
        </Card>

        {/* Customer Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Customer Details
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCallCustomer}
              >
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-semibold">{customerDetails.name}</p>
              <p className="text-sm text-muted-foreground">{customerDetails.phone}</p>
            </div>
            
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm">{customerDetails.address}</p>
                <p className="text-xs text-muted-foreground mt-1">{customerDetails.landmark}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Actions */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full h-12"
            onClick={() => {
              toast({
                title: "Opening Google Maps",
                description: "Redirecting to navigation..."
              });
            }}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Open in Google Maps
          </Button>

          {status === "en_route" && eta <= 2 && (
            <Button 
              className="w-full h-12"
              onClick={handleArrivedAtLocation}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Mark as Arrived
            </Button>
          )}

          {status === "arrived" && (
            <Button 
              className="w-full h-12"
              onClick={handleArrivedAtLocation}
            >
              <Clock className="w-4 h-4 mr-2" />
              Confirm Arrival
            </Button>
          )}

          {status === "delivering" && (
            <Button 
              className="w-full h-12"
              onClick={handleStartDelivery}
            >
              Start Water Delivery
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerTracking;