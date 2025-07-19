import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  CheckCircle,
  Clock,
  Truck
} from 'lucide-react';

const DeliveryOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerifyOTP = async () => {
    if (otp.length !== 4) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      
      // Navigate to success page after a short delay
      setTimeout(() => {
        navigate('/delivery-success');
      }, 2000);
    }, 1500);
  };

  if (verified) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-floating">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Delivery Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Your water tanker delivery has been successfully verified and completed.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-medium">#SW12345</span>
              </div>
              <div className="flex justify-between">
                <span>Delivered at:</span>
                <span className="font-medium">3:42 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-medium">₹1,299</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/track')}
            className="text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Delivery Verification</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Status Card */}
        <Card className="border-0 shadow-card bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Tanker has arrived!</h3>
                <p className="text-primary-foreground/80 text-sm">Driver is waiting for verification</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OTP Verification */}
        <Card className="border-0 shadow-card">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Enter Delivery OTP</CardTitle>
            <CardDescription>
              Please provide the 4-digit OTP shared by the driver to confirm delivery
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter 4-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="text-center text-2xl tracking-widest h-14 font-mono"
                maxLength={4}
              />
              <p className="text-xs text-muted-foreground text-center">
                Driver will share this OTP once the water is delivered
              </p>
            </div>

            <Button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 4 || loading}
              className="w-full h-12 bg-gradient-primary hover:bg-primary-hover"
            >
              {loading ? 'Verifying...' : 'Verify & Complete Delivery'}
            </Button>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-medium">#SW12345</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tanker Size:</span>
              <span className="font-medium">5000L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Address:</span>
              <span className="font-medium text-right">HSR Layout, Bangalore</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-semibold text-lg">₹1,299</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="text-primary">Cash on Delivery</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver Contact */}
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Need help?</h4>
                <p className="text-sm text-muted-foreground">Contact driver: Ramesh Kumar</p>
              </div>
              <Button variant="outline" size="sm">
                Call Driver
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timer */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">OTP expires in 10 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOTP;