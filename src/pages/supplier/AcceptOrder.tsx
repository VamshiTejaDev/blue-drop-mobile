import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Droplets, Phone, Navigation, IndianRupee, User, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AcceptOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data - in real app this would come from API
  const orderDetails = {
    id: orderId || "ORD001",
    customerName: "Raj Patel",
    customerPhone: "+91 98765 43210",
    address: "Plot 45, Near City Mall, Satellite, Ahmedabad - 380015",
    landmark: "Opposite HDFC Bank",
    distance: "2.3 km",
    estimatedTime: "12 minutes",
    tankerSize: "2,000L",
    timeSlot: "2:00 PM - 4:00 PM",
    amount: "₹450",
    priority: "high",
    paymentMethod: "Cash on Delivery",
    specialInstructions: "Please call before arriving. Gate number 3."
  };

  const handleAcceptOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Order Accepted!",
        description: "Proceeding to customer location..."
      });
      navigate(`/supplier/customer-tracking/${orderId}`);
    }, 1500);
  };

  const handleRejectOrder = () => {
    toast({
      title: "Order Rejected",
      description: "Looking for other nearby orders..."
    });
    navigate("/supplier/dashboard");
  };

  const handleCallCustomer = () => {
    toast({
      title: "Calling customer...",
      description: orderDetails.customerPhone
    });
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
            <h1 className="text-xl font-bold text-primary">Order Request</h1>
            <p className="text-sm text-muted-foreground">#{orderDetails.id}</p>
          </div>
        </div>

        {/* Priority Badge */}
        <div className="flex justify-center">
          <Badge 
            variant={orderDetails.priority === "high" ? "destructive" : "default"}
            className="text-sm px-4 py-1"
          >
            {orderDetails.priority.toUpperCase()} PRIORITY
          </Badge>
        </div>

        {/* Customer Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              Customer Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-base">{orderDetails.customerName}</p>
              <p className="text-muted-foreground text-sm">{orderDetails.customerPhone}</p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">{orderDetails.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">{orderDetails.landmark}</p>
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleCallCustomer}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Customer
            </Button>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Navigation className="w-4 h-4 mr-2 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Distance</p>
                    <p className="text-xs text-muted-foreground">{orderDetails.distance}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Droplets className="w-4 h-4 mr-2 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Tanker Size</p>
                    <p className="text-xs text-muted-foreground">{orderDetails.tankerSize}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  <div>
                    <p className="text-sm font-medium">ETA</p>
                    <p className="text-xs text-muted-foreground">{orderDetails.estimatedTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <IndianRupee className="w-4 h-4 mr-2 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Amount</p>
                    <p className="text-xs text-muted-foreground">{orderDetails.amount}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium mb-1">Delivery Time</p>
              <p className="text-sm text-muted-foreground">{orderDetails.timeSlot}</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Payment Method</p>
              <p className="text-sm text-muted-foreground">{orderDetails.paymentMethod}</p>
            </div>

            {orderDetails.specialInstructions && (
              <div>
                <p className="text-sm font-medium mb-1">Special Instructions</p>
                <p className="text-sm text-muted-foreground bg-accent/50 p-3 rounded-lg">
                  {orderDetails.specialInstructions}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 h-12"
            onClick={handleRejectOrder}
            disabled={isProcessing}
          >
            Reject
          </Button>
          <Button 
            className="flex-1 h-12"
            onClick={handleAcceptOrder}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Accept Order"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AcceptOrder;