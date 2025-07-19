import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Phone, User, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupplierLogin = () => {
  const [step, setStep] = useState<"phone" | "otp" | "signup">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tankerNumber: "",
    tankerSize: "",
    serviceArea: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = () => {
    if (phone.length !== 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate checking if user exists
    const existingUser = Math.random() > 0.5;
    setIsExistingUser(existingUser);
    setStep("otp");
    
    toast({
      title: "OTP Sent",
      description: "Please check your phone for the verification code"
    });
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    if (isExistingUser) {
      navigate("/supplier/dashboard");
    } else {
      setStep("signup");
    }
  };

  const handleSignup = () => {
    if (!formData.name || !formData.tankerNumber || !formData.tankerSize || !formData.serviceArea) {
      toast({
        title: "Incomplete information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Registration successful!",
      description: "Welcome to Swatchh Water Tanker"
    });
    navigate("/supplier/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Truck className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Supplier Portal</CardTitle>
            <CardDescription>
              {step === "phone" && "Enter your phone number to continue"}
              {step === "otp" && "Enter the OTP sent to your phone"}
              {step === "signup" && "Complete your registration"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === "phone" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>
              <Button onClick={handleSendOTP} className="w-full h-12 text-base font-medium">
                Send OTP
              </Button>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Enter OTP</Label>
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup className="gap-2 justify-center">
                    <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                    <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button onClick={handleVerifyOTP} className="w-full h-12 text-base font-medium">
                Verify OTP
              </Button>
              <Button variant="ghost" onClick={() => setStep("phone")} className="w-full">
                Change Phone Number
              </Button>
            </div>
          )}

          {step === "signup" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tankerNumber">Tanker Number</Label>
                <div className="relative">
                  <Truck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="tankerNumber"
                    placeholder="e.g., GJ-01-AB-1234"
                    value={formData.tankerNumber}
                    onChange={(e) => setFormData({ ...formData, tankerNumber: e.target.value.toUpperCase() })}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tankerSize">Tanker Capacity</Label>
                <Select value={formData.tankerSize} onValueChange={(value) => setFormData({ ...formData, tankerSize: value })}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select tanker capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000L">1,000 Liters</SelectItem>
                    <SelectItem value="2000L">2,000 Liters</SelectItem>
                    <SelectItem value="3000L">3,000 Liters</SelectItem>
                    <SelectItem value="5000L">5,000 Liters</SelectItem>
                    <SelectItem value="10000L">10,000 Liters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceArea">Service Area</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="serviceArea"
                    placeholder="e.g., Ahmedabad, Gandhinagar"
                    value={formData.serviceArea}
                    onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>

              <Button onClick={handleSignup} className="w-full h-12 text-base font-medium">
                Complete Registration
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierLogin;