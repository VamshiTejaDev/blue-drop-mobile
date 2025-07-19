import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  Zap, 
  Crown, 
  Gift,
  Calendar,
  Truck,
  Clock,
  Percent
} from 'lucide-react';

const Subscription = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('');

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 2999,
      originalPrice: 3999,
      savings: 1000,
      period: 'month',
      deliveries: 4,
      icon: Calendar,
      features: [
        '4 Tanker deliveries per month',
        '5000L capacity per delivery',
        'Free emergency delivery',
        'Priority customer support',
        '25% savings vs regular booking'
      ],
      popular: false
    },
    {
      id: 'quarterly',
      name: 'Quarterly Plan',
      price: 7999,
      originalPrice: 11999,
      savings: 4000,
      period: '3 months',
      deliveries: 12,
      icon: Crown,
      features: [
        '12 Tanker deliveries (3 months)',
        '5000L capacity per delivery',
        'Free emergency deliveries',
        'Priority customer support',
        'Flexible scheduling',
        'Quality guarantee',
        '33% savings vs regular booking'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 14999,
      originalPrice: 23999,
      savings: 9000,
      period: '6 months',
      deliveries: 24,
      icon: Zap,
      features: [
        '24 Tanker deliveries (6 months)',
        '5000L capacity per delivery',
        'Unlimited emergency deliveries',
        'Dedicated customer manager',
        'Same-day delivery guarantee',
        'Water quality testing reports',
        'SMS/Call notifications',
        '37% savings vs regular booking'
      ],
      popular: false
    }
  ];

  const handleSubscribe = () => {
    if (!selectedPlan) return;
    // Simulate subscription process
    navigate('/subscription-success');
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
          <h1 className="text-xl font-semibold">Subscription Plans</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Header Info */}
        <Card className="border-0 shadow-card bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <Gift className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Save Big with Subscriptions</h2>
            <p className="text-primary-foreground/80">
              Get regular water deliveries and save up to 37% compared to individual bookings
            </p>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Percent, title: 'Up to 37% Savings', desc: 'Best value guaranteed' },
            { icon: Truck, title: 'Regular Deliveries', desc: 'Never run out of water' },
            { icon: Clock, title: 'Priority Service', desc: 'Faster delivery times' },
            { icon: CheckCircle, title: 'Quality Assured', desc: 'RO filtered pure water' }
          ].map((benefit, index) => (
            <Card key={index} className="border-0 shadow-card">
              <CardContent className="p-4 text-center">
                <benefit.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium text-sm mb-1">{benefit.title}</h4>
                <p className="text-xs text-muted-foreground">{benefit.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`border-2 cursor-pointer transition-all relative ${
                selectedPlan === plan.id
                  ? 'border-primary bg-primary/5 shadow-water'
                  : 'border-border hover:border-primary/50 shadow-card'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <plan.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {plan.deliveries} deliveries per {plan.period}
                      </p>
                    </div>
                  </div>
                  {selectedPlan === plan.id && (
                    <CheckCircle className="h-6 w-6 text-primary" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold">₹{plan.price}</span>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{plan.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">per {plan.period}</p>
                  <Badge variant="secondary" className="mt-2 bg-success/10 text-success border-success/20">
                    Save ₹{plan.savings}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t">
                  <div className="text-sm text-center text-muted-foreground">
                    <span className="font-medium">₹{Math.round(plan.price / plan.deliveries)}</span> per delivery
                    <span className="text-xs ml-1">(vs ₹1299 regular)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subscribe Button */}
        <Button
          onClick={handleSubscribe}
          disabled={!selectedPlan}
          className="w-full h-12 bg-gradient-primary hover:bg-primary-hover shadow-water"
        >
          {selectedPlan 
            ? `Subscribe to ${plans.find(p => p.id === selectedPlan)?.name} - ₹${plans.find(p => p.id === selectedPlan)?.price}`
            : 'Select a Plan to Continue'
          }
        </Button>

        {/* Terms */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>• Auto-renewal can be cancelled anytime</p>
          <p>• Unused deliveries carry forward to next cycle</p>
          <p>• Full refund if cancelled within 7 days</p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;