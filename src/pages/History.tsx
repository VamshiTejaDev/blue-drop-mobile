import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Truck, 
  Star,
  Download,
  RotateCcw,
  MapPin,
  Clock
} from 'lucide-react';

const History = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');

  const orders = [
    {
      id: '#SW12345',
      date: 'Today, 3:42 PM',
      status: 'delivered',
      size: '5000L',
      amount: 1299,
      address: 'HSR Layout, Bangalore',
      driver: 'Ramesh Kumar',
      rating: 5
    },
    {
      id: '#SW12340',
      date: 'Yesterday, 2:15 PM',
      status: 'delivered',
      size: '3000L',
      amount: 799,
      address: 'HSR Layout, Bangalore',
      driver: 'Suresh Singh',
      rating: 4
    },
    {
      id: '#SW12339',
      date: '2 days ago, 10:30 AM',
      status: 'delivered',
      size: '5000L',
      amount: 1299,
      address: 'Koramangala, Bangalore',
      driver: 'Rajesh Kumar',
      rating: 5
    },
    {
      id: '#SW12338',
      date: '5 days ago, 4:20 PM',
      status: 'cancelled',
      size: '1000L',
      amount: 299,
      address: 'HSR Layout, Bangalore',
      driver: null,
      rating: null
    },
    {
      id: '#SW12337',
      date: '1 week ago, 11:45 AM',
      status: 'delivered',
      size: '3000L',
      amount: 799,
      address: 'HSR Layout, Bangalore',
      driver: 'Mohan Das',
      rating: 4
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-success/10 text-success border-success/20">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'pending':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'all') return true;
    return order.status === selectedTab;
  });

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
          <h1 className="text-xl font-semibold">Order History</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Filter Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <Card key={order.id} className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold">{order.id}</span>
                      <Badge variant="outline" className="text-xs">
                        {order.size}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{order.date}</span>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{order.address}</span>
                    </div>
                    <span className="font-semibold">₹{order.amount}</span>
                  </div>
                  
                  {order.driver && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Driver: {order.driver}</span>
                      {order.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{order.rating}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  {order.status === 'delivered' && (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-2" />
                        Receipt
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <RotateCcw className="h-3 w-3 mr-2" />
                        Reorder
                      </Button>
                    </>
                  )}
                  {order.status === 'cancelled' && (
                    <Button variant="outline" size="sm" className="w-full">
                      <RotateCcw className="h-3 w-3 mr-2" />
                      Reorder
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="border-0 shadow-card">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-4">
                {selectedTab === 'all' 
                  ? "You haven't placed any orders yet" 
                  : `No ${selectedTab} orders found`}
              </p>
              <Button 
                onClick={() => navigate('/book')}
                className="bg-gradient-primary hover:bg-primary-hover"
              >
                <Truck className="h-4 w-4 mr-2" />
                Book Your First Tanker
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Summary Card */}
        {filteredOrders.length > 0 && (
          <Card className="border-0 shadow-card mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Orders:</span>
                <span className="font-medium">{orders.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivered:</span>
                <span className="font-medium text-success">
                  {orders.filter(o => o.status === 'delivered').length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Spent:</span>
                <span className="font-medium">
                  ₹{orders.filter(o => o.status === 'delivered').reduce((sum, order) => sum + order.amount, 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default History;