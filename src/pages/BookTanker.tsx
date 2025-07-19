import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Truck, 
  Clock, 
  MapPin, 
  Calendar,
  CreditCard,
  CheckCircle2
} from 'lucide-react';

const BookTanker = () => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const tankerSizes = [
    { id: '1000', size: '1000L', price: 299, description: 'Small family (2-3 people)' },
    { id: '3000', size: '3000L', price: 799, description: 'Medium family (4-6 people)', popular: true },
    { id: '5000', size: '5000L', price: 1299, description: 'Large family (7+ people)' },
    { id: '10000', size: '10000L', price: 2499, description: 'Commercial use' }
  ];

  const timeSlots = [
    { id: 'asap', label: 'ASAP (2-4 hours)', price: 50 },
    { id: 'morning', label: 'Tomorrow Morning (8-12 PM)', price: 0 },
    { id: 'afternoon', label: 'Tomorrow Afternoon (12-6 PM)', price: 0 },
    { id: 'evening', label: 'Tomorrow Evening (6-10 PM)', price: 0 }
  ];

  const addresses = [
    { id: '1', label: 'Home - HSR Layout, Bangalore', details: '123, 5th Main, HSR Layout Sector 2' },
    { id: '2', label: 'Office - Koramangala, Bangalore', details: '456, Forum Mall Road, Koramangala' }
  ];

  const selectedTanker = tankerSizes.find(t => t.id === selectedSize);
  const selectedTimeSlot = timeSlots.find(t => t.id === selectedTime);
  const totalPrice = (selectedTanker?.price || 0) + (selectedTimeSlot?.price || 0);

  const handleBooking = async () => {
    if (!selectedSize || !selectedTime || !selectedAddress) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/track');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/home')}
            className="text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Book Water Tanker</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Tanker Size Selection */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Select Tanker Size</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tankerSizes.map((tanker) => (
              <div
                key={tanker.id}
                onClick={() => setSelectedSize(tanker.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedSize === tanker.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{tanker.size}</span>
                      {tanker.popular && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{tanker.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">₹{tanker.price}</div>
                    {selectedSize === tanker.id && (
                      <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Delivery Time Selection */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Select Delivery Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Choose delivery time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot.id} value={slot.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{slot.label}</span>
                      {slot.price > 0 && (
                        <span className="text-primary ml-2">+₹{slot.price}</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Delivery Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedAddress} onValueChange={setSelectedAddress}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select delivery address" />
              </SelectTrigger>
              <SelectContent>
                {addresses.map((address) => (
                  <SelectItem key={address.id} value={address.id}>
                    <div>
                      <div className="font-medium">{address.label}</div>
                      <div className="text-sm text-muted-foreground">{address.details}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Order Summary */}
        {selectedSize && selectedTime && (
          <Card className="border-0 shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>{selectedTanker?.size} Water Tanker</span>
                <span>₹{selectedTanker?.price}</span>
              </div>
              {selectedTimeSlot?.price > 0 && (
                <div className="flex justify-between">
                  <span>Express Delivery</span>
                  <span>₹{selectedTimeSlot.price}</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{totalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Book Button */}
        <Button
          onClick={handleBooking}
          disabled={!selectedSize || !selectedTime || !selectedAddress || loading}
          className="w-full h-12 bg-gradient-primary hover:bg-primary-hover shadow-water"
        >
          {loading ? 'Processing...' : `Book Now - ₹${totalPrice}`}
        </Button>

        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Pay after delivery • Free cancellation within 1 hour</span>
        </div>
      </div>
    </div>
  );
};

export default BookTanker;