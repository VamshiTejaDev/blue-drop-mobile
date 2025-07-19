import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Star, IndianRupee, Clock, MapPin, Home } from "lucide-react";

const DeliverySuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Mock delivery data
  const deliveryData = {
    orderId: orderId || "ORD001",
    customerName: "Raj Patel",
    amount: "₹450",
    deliveryTime: "2:45 PM",
    address: "Plot 45, Satellite, Ahmedabad",
    rating: 4.8,
    earnings: "₹405", // After platform commission
    commission: "₹45"
  };

  const handleGoHome = () => {
    navigate("/supplier/dashboard");
  };

  const handleViewEarnings = () => {
    navigate("/supplier/earnings");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-2xl text-green-800">Delivery Completed!</CardTitle>
              <CardDescription className="text-base text-green-700 mt-2">
                Great job! Payment has been processed successfully.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <div className="text-center">
                <Badge variant="outline" className="text-sm border-green-300 text-green-800">
                  Order #{deliveryData.orderId}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">{deliveryData.amount}</div>
                  <div className="text-sm text-muted-foreground">Order Value</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-green-600">{deliveryData.earnings}</div>
                  <div className="text-sm text-muted-foreground">Your Earnings</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Delivery Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-base">Delivery Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Customer</span>
                  <span className="text-sm font-medium">{deliveryData.customerName}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completed At</span>
                  <span className="text-sm font-medium">{deliveryData.deliveryTime}</span>
                </div>
                
                <div className="flex items-start justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <span className="text-sm font-medium text-right flex-1 ml-4">{deliveryData.address}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Earnings Breakdown */}
            <div className="space-y-3">
              <h3 className="font-semibold text-base">Earnings Breakdown</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Amount</span>
                  <span>{deliveryData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform Fee (10%)</span>
                  <span className="text-red-600">-{deliveryData.commission}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Your Earnings</span>
                  <span className="text-green-600">{deliveryData.earnings}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold text-yellow-800">Customer Rating</span>
              </div>
              <div className="text-2xl font-bold text-yellow-800">{deliveryData.rating}/5</div>
              <div className="text-sm text-yellow-700">Excellent service!</div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button 
                onClick={handleGoHome}
                className="w-full h-12 text-base font-medium"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleViewEarnings}
                className="w-full h-12"
              >
                <IndianRupee className="w-4 h-4 mr-2" />
                View Earnings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliverySuccess;