import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, Droplets, Phone, Navigation, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SupplierDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const navigate = useNavigate();

  const mockBookings = [
    {
      id: "ORD001",
      customerName: "Raj Patel",
      address: "Plot 45, Satellite, Ahmedabad",
      distance: "2.3 km",
      tankerSize: "2,000L",
      timeSlot: "2:00 PM - 4:00 PM",
      amount: "₹450",
      priority: "high"
    },
    {
      id: "ORD002", 
      customerName: "Priya Shah",
      address: "B-203, Vastrapur, Ahmedabad",
      distance: "4.1 km",
      tankerSize: "1,000L",
      timeSlot: "4:00 PM - 6:00 PM",
      amount: "₹250",
      priority: "medium"
    },
    {
      id: "ORD003",
      customerName: "Amit Kumar",
      address: "Sector 21, Gandhinagar",
      distance: "8.7 km",
      tankerSize: "3,000L",
      timeSlot: "6:00 PM - 8:00 PM",
      amount: "₹650",
      priority: "low"
    }
  ];

  const handleAcceptOrder = (orderId: string) => {
    navigate(`/supplier/accept-order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Manage your deliveries</p>
        </div>

        {/* Status Card */}
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Status
              <Badge variant={isAvailable ? "default" : "secondary"} className="text-sm">
                {isAvailable ? "Available" : "Offline"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="availability" className="text-base">
                Available for orders
              </Label>
              <Switch
                id="availability"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
            </div>
            {isAvailable && (
              <p className="text-sm text-muted-foreground mt-2">
                You're visible to customers in your area
              </p>
            )}
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Deliveries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">₹2,250</div>
                <div className="text-sm text-muted-foreground">Earnings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">8.2</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Bookings */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">Nearby Bookings</h2>
          
          {isAvailable ? (
            <div className="space-y-3">
              {mockBookings.map((booking) => (
                <Card key={booking.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-base">{booking.customerName}</h3>
                          <p className="text-sm text-muted-foreground flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {booking.address}
                          </p>
                        </div>
                        <Badge 
                          variant={booking.priority === "high" ? "destructive" : booking.priority === "medium" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {booking.priority}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Navigation className="w-4 h-4 mr-2 text-primary" />
                          {booking.distance}
                        </div>
                        <div className="flex items-center">
                          <Droplets className="w-4 h-4 mr-2 text-primary" />
                          {booking.tankerSize}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-primary" />
                          {booking.timeSlot}
                        </div>
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-2 text-primary" />
                          {booking.amount}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {/* Call customer logic */}}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleAcceptOrder(booking.id)}
                        >
                          Accept Order
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-muted-foreground">
                  <Droplets className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Go online to see nearby bookings</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;