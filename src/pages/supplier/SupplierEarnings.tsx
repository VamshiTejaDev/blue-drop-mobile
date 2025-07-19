import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndianRupee, TrendingUp, Download, Calendar, Eye, Wallet } from "lucide-react";

const SupplierEarnings = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const earningsData = {
    today: {
      totalEarnings: "₹630",
      deliveries: 2,
      avgPerDelivery: "₹315",
      commission: "₹70"
    },
    thisWeek: {
      totalEarnings: "₹4,320",
      deliveries: 12,
      avgPerDelivery: "₹360",
      commission: "₹480"
    },
    thisMonth: {
      totalEarnings: "₹16,875",
      deliveries: 45,
      avgPerDelivery: "₹375",
      commission: "₹1,875"
    }
  };

  const paymentHistory = [
    {
      id: "PAY001",
      date: "Today, 2:45 PM",
      orderId: "ORD001",
      customer: "Raj Patel",
      amount: "₹450",
      commission: "₹45",
      earnings: "₹405",
      status: "paid"
    },
    {
      id: "PAY002",
      date: "Today, 11:30 AM",
      orderId: "ORD002",
      customer: "Priya Shah",
      amount: "₹250",
      commission: "₹25",
      earnings: "₹225",
      status: "paid"
    },
    {
      id: "PAY003",
      date: "Yesterday, 6:15 PM",
      orderId: "ORD003",
      customer: "Amit Kumar",
      amount: "₹650",
      commission: "₹65",
      earnings: "₹585",
      status: "paid"
    },
    {
      id: "PAY004",
      date: "Yesterday, 3:20 PM",
      orderId: "ORD004",
      customer: "Neha Gupta",
      amount: "₹350",
      commission: "₹35",
      earnings: "₹315",
      status: "pending"
    }
  ];

  const getCurrentData = () => {
    return earningsData[selectedPeriod as keyof typeof earningsData];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-primary">Earnings</h1>
          <p className="text-muted-foreground">Track your income and payments</p>
        </div>

        {/* Quick Stats */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold">{getCurrentData().totalEarnings}</div>
              <div className="text-primary-foreground/80">
                {selectedPeriod === "today" && "Today's Earnings"}
                {selectedPeriod === "thisWeek" && "This Week's Earnings"}
                {selectedPeriod === "thisMonth" && "This Month's Earnings"}
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {getCurrentData().deliveries} deliveries
                </div>
                <div>
                  Avg: {getCurrentData().avgPerDelivery}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Breakdown */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-green-600">{getCurrentData().totalEarnings}</div>
              <div className="text-sm text-muted-foreground">Total Earned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-xl font-bold text-red-600">{getCurrentData().commission}</div>
              <div className="text-sm text-muted-foreground">Platform Fee</div>
            </CardContent>
          </Card>
        </div>

        {/* Period Tabs */}
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="thisWeek">This Week</TabsTrigger>
            <TabsTrigger value="thisMonth">This Month</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPeriod} className="space-y-4 mt-6">
            
            {/* Payment History */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Payment History</h2>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>

              <div className="space-y-3">
                {paymentHistory
                  .filter(payment => {
                    if (selectedPeriod === "today") return payment.date.includes("Today");
                    return true; // Show all for demo
                  })
                  .map((payment) => (
                  <Card key={payment.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-base">{payment.customer}</h3>
                            <p className="text-sm text-muted-foreground">#{payment.orderId}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{payment.earnings}</div>
                            <Badge variant={getStatusColor(payment.status)} className="text-xs mt-1">
                              {payment.status}
                            </Badge>
                          </div>
                        </div>

                        {/* Payment Breakdown */}
                        <div className="bg-accent/30 p-3 rounded-lg text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Order Amount:</span>
                            <span>{payment.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Platform Fee (10%):</span>
                            <span className="text-red-600">-{payment.commission}</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-1">
                            <span>Your Earnings:</span>
                            <span className="text-green-600">{payment.earnings}</span>
                          </div>
                        </div>

                        {/* Date and Actions */}
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{payment.date}</span>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Summary Card */}
            <Card className="bg-accent/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <IndianRupee className="w-5 h-5 mr-2 text-primary" />
                  {selectedPeriod === "today" && "Today's Summary"}
                  {selectedPeriod === "thisWeek" && "Weekly Summary"}
                  {selectedPeriod === "thisMonth" && "Monthly Summary"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Deliveries:</span>
                    <span className="font-semibold">{getCurrentData().deliveries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gross Earnings:</span>
                    <span className="font-semibold">{getCurrentData().totalEarnings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Commission:</span>
                    <span className="font-semibold text-red-600">-{getCurrentData().commission}</span>
                  </div>
                  <div className="flex justify-between text-lg border-t pt-2">
                    <span className="font-bold">Net Earnings:</span>
                    <span className="font-bold text-green-600">{getCurrentData().totalEarnings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average per Delivery:</span>
                    <span className="font-semibold">{getCurrentData().avgPerDelivery}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payout Action */}
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Available for Payout</h3>
                <p className="text-sm text-muted-foreground">₹4,320 ready to withdraw</p>
              </div>
              <Button>
                <Wallet className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplierEarnings;