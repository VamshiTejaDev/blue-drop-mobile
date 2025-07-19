import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { CheckCircle, Phone, ArrowLeft, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DeliveryOTPSupplier = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock customer data
  const customerDetails = {
    name: "Raj Patel",
    phone: "+91 98765 43210",
    amount: "₹450"
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 4-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);

    // Simulate OTP verification
    setTimeout(() => {
      const isValid = otp === "1234" || Math.random() > 0.3; // Mock validation
      
      if (isValid) {
        toast({
          title: "OTP Verified Successfully!",
          description: "Delivery confirmed"
        });
        navigate(`/supplier/delivery-success/${orderId}`);
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please ask customer to provide correct OTP",
          variant: "destructive"
        });
        setOtp("");
      }
      setIsVerifying(false);
    }, 2000);
  };

  const handleCallCustomer = () => {
    toast({
      title: "Calling customer...",
      description: customerDetails.phone
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(`/supplier/customer-tracking/${orderId}`)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold text-primary">Delivery Confirmation</h1>
            <p className="text-sm text-muted-foreground">Order #{orderId}</p>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Get OTP from Customer</CardTitle>
              <CardDescription className="text-base mt-2">
                Ask {customerDetails.name} for the 4-digit delivery OTP
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Customer Info */}
            <div className="bg-accent/50 p-4 rounded-lg text-center space-y-2">
              <p className="font-semibold text-lg">{customerDetails.name}</p>
              <p className="text-muted-foreground">{customerDetails.phone}</p>
              <p className="text-primary font-bold text-xl">{customerDetails.amount}</p>
            </div>

            {/* OTP Input */}
            <div className="space-y-4">
              <Label className="text-center block">Enter Delivery OTP</Label>
              <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                <InputOTPGroup className="gap-3 justify-center">
                  <InputOTPSlot index={0} className="h-16 w-16 text-2xl font-bold" />
                  <InputOTPSlot index={1} className="h-16 w-16 text-2xl font-bold" />
                  <InputOTPSlot index={2} className="h-16 w-16 text-2xl font-bold" />
                  <InputOTPSlot index={3} className="h-16 w-16 text-2xl font-bold" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-blue-900 mb-1">Instructions:</p>
                  <ul className="text-blue-800 space-y-1">
                    <li>• Ask customer to check their SMS/App</li>
                    <li>• OTP is required to confirm delivery</li>
                    <li>• Payment will be processed after OTP verification</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleVerifyOTP}
                className="w-full h-12 text-base font-medium"
                disabled={otp.length !== 4 || isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify OTP & Complete Delivery"}
              </Button>

              <Button 
                variant="outline" 
                onClick={handleCallCustomer}
                className="w-full h-12"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Customer for OTP
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryOTPSupplier;