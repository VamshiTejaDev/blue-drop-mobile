import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Droplets, Phone, MessageSquare } from 'lucide-react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (phone.length !== 10) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-card rounded-full flex items-center justify-center shadow-floating mb-4">
            <Droplets className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">Swatchh Water</h1>
          <p className="text-primary-foreground/80">Pure water delivered to your doorstep</p>
        </div>

        <Card className="shadow-floating border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">
              {step === 'phone' ? 'Welcome Back' : 'Verify OTP'}
            </CardTitle>
            <CardDescription>
              {step === 'phone' 
                ? 'Enter your phone number to continue' 
                : `Enter the 6-digit code sent to +91 ${phone}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 'phone' ? (
              <>
                <div className="space-y-2">
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Enter mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="pl-10"
                      maxLength={10}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll send you a verification code
                  </p>
                </div>
                <Button 
                  onClick={handleSendOTP}
                  disabled={phone.length !== 10 || loading}
                  className="w-full h-12 bg-gradient-primary hover:bg-primary-hover transition-all duration-200"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="pl-10 text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setStep('phone')}
                      className="text-primary hover:text-primary-hover"
                    >
                      Change number
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleSendOTP}
                      className="text-primary hover:text-primary-hover"
                    >
                      Resend OTP
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || loading}
                  className="w-full h-12 bg-gradient-primary hover:bg-primary-hover transition-all duration-200"
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-primary-foreground/70 text-xs mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;