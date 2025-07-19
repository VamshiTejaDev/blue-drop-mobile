import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, IndianRupee, Star, Phone, Eye } from "lucide-react";

const SupplierHistory = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const deliveries = [
    {
      id: "ORD001",
      customerName: "Raj Patel",
      address: "Plot 45, Satellite, Ahmedabad",
      amount: "₹450",
      earnings: "₹405",
      date: "Today",
      time: "2:45 PM",
      status: "completed",
      rating: 5,
      tankerSize: "2,000L",
      paymentStatus: "paid"
    },
    {
      id: "ORD002",
      customerName: "Priya Shah", 
      address: "B-203, Vastrapur, Ahmedabad",
      amount: "₹250",
      earnings: "₹225",
      date: "Today",
      time: "11:30 AM",
      status: "completed",
      rating: 4,
      tankerSize: "1,000L",
      paymentStatus: "paid"
    },
    {
      id: "ORD003",
      customerName: "Amit Kumar",
      address: "Sector 21, Gandhinagar",
      amount: "₹650",
      earnings: "₹585",
      date: "Yesterday",
      time: "6:15 PM",
      status: "completed",
      rating: 5,
      tankerSize: "3,000L",
      paymentStatus: "paid"
    },
    {
      id: "ORD004",
      customerName: "Neha Gupta",
      address: "Prahlad Nagar, Ahmedabad",
      amount: "₹350",
      earnings: "₹315",
      date: "Yesterday",
      time: "3:20 PM",
      status: "completed",
      rating: 4,
      tankerSize: "1,500L",
      paymentStatus: "paid"
    },
    {
      id: "ORD005",
      customerName: "Rohit Sharma",
      address: "Bodakdev, Ahmedabad",
      amount: "₹400",
      earnings: "₹360",
      date: "2 days ago",
      time: "1:45 PM",
      status: "completed",
      rating: 5,
      tankerSize: "2,000L",
      paymentStatus: "paid"
    }
  ];

  const stats = {
    today: {
      deliveries: 2,
      earnings: "₹630",
      avgRating: 4.5
    },
    thisWeek: {
      deliveries: 12,
      earnings: "₹4,320",
      avgRating: 4.7
    },
    thisMonth: {
      deliveries: 45,
      earnings: "₹16,875",
      avgRating: 4.6
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      default:
        return "destructive";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-primary">My Deliveries</h1>
          <p className="text-muted-foreground">Track your delivery history and earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-primary">{stats.today.deliveries}</div>
              <div className="text-xs text-muted-foreground">Today</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-primary">{stats.today.earnings}</div>
              <div className="text-xs text-muted-foreground">Earned</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-primary">{stats.today.avgRating}</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Period Tabs */}
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPeriod} className="space-y-4 mt-6">
            {/* Delivery List */}
            <div className="space-y-3">
              {deliveries
                .filter(delivery => {
                  if (selectedPeriod === "today") return delivery.date === "Today";
                  if (selectedPeriod === "week") return true; // Show all for demo
                  return true; // Show all for demo
                })
                .map((delivery) => (
                <Card key={delivery.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-base">{delivery.customerName}</h3>
                          <p className="text-sm text-muted-foreground">#{delivery.id}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">{delivery.earnings}</div>
                          <div className="text-xs text-muted-foreground">{delivery.date} • {delivery.time}</div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{delivery.address}</p>
                      </div>

                      {/* Details */}
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-muted-foreground">{delivery.tankerSize}</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                            <span>{delivery.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Badge variant={getStatusColor(delivery.status)} className="text-xs">
                            {delivery.status}
                          </Badge>
                          <Badge variant={getPaymentStatusColor(delivery.paymentStatus)} className="text-xs">
                            {delivery.paymentStatus}
                          </Badge>
                        </div>
                      </div>

                      {/* Earnings breakdown */}
                      <div className="bg-accent/30 p-3 rounded-lg text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Order Amount:</span>
                          <span>{delivery.amount}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Your Earnings:</span>
                          <span className="text-primary">{delivery.earnings}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Period Summary */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedPeriod === "today" && "Today's Summary"}
                  {selectedPeriod === "week" && "This Week's Summary"}
                  {selectedPeriod === "month" && "This Month's Summary"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {selectedPeriod === "today" && stats.today.deliveries}
                      {selectedPeriod === "week" && stats.thisWeek.deliveries}
                      {selectedPeriod === "month" && stats.thisMonth.deliveries}
                    </div>
                    <div className="text-sm text-muted-foreground">Deliveries</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {selectedPeriod === "today" && stats.today.earnings}
                      {selectedPeriod === "week" && stats.thisWeek.earnings}
                      {selectedPeriod === "month" && stats.thisMonth.earnings}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Earnings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {selectedPeriod === "today" && stats.today.avgRating}
                      {selectedPeriod === "week" && stats.thisWeek.avgRating}
                      {selectedPeriod === "month" && stats.thisMonth.avgRating}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupplierHistory;