import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Truck, MapPin, Clock, Settings, Star, Shield, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SupplierProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    tankerNumber: "GJ-01-AB-1234",
    tankerSize: "2000L",
    serviceArea: "Ahmedabad, Gandhinagar",
    isAvailable: true,
    workingHours: {
      start: "06:00",
      end: "22:00"
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const stats = {
    totalDeliveries: 156,
    rating: 4.7,
    totalEarnings: "₹78,450",
    verification: "verified"
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully"
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully"
    });
    navigate("/supplier/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-4 pb-20">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-primary">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account and vehicle details</p>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <div className="flex items-center justify-center space-x-2">
                  <Badge variant="default" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    {stats.verification}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    {stats.rating}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full text-center">
                <div>
                  <div className="text-lg font-bold text-primary">{stats.totalDeliveries}</div>
                  <div className="text-xs text-muted-foreground">Deliveries</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">{stats.rating}</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">{stats.totalEarnings}</div>
                  <div className="text-xs text-muted-foreground">Earned</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Personal Information
              </CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                disabled={!isEditing}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                disabled={!isEditing}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                disabled={!isEditing}
                className="h-11"
              />
            </div>

            {isEditing && (
              <Button onClick={handleSaveProfile} className="w-full">
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Truck className="w-5 h-5 mr-2 text-primary" />
              Vehicle Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tankerNumber">Tanker Number</Label>
              <Input
                id="tankerNumber"
                value={profile.tankerNumber}
                onChange={(e) => setProfile({...profile, tankerNumber: e.target.value.toUpperCase()})}
                disabled={!isEditing}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tankerSize">Tanker Capacity</Label>
              <Select 
                value={profile.tankerSize} 
                onValueChange={(value) => setProfile({...profile, tankerSize: value})}
                disabled={!isEditing}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
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
              <Input
                id="serviceArea"
                value={profile.serviceArea}
                onChange={(e) => setProfile({...profile, serviceArea: e.target.value})}
                disabled={!isEditing}
                className="h-11"
                placeholder="e.g., Ahmedabad, Gandhinagar"
              />
            </div>
          </CardContent>
        </Card>

        {/* Availability Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Availability Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Available for Orders</Label>
                <p className="text-sm text-muted-foreground">Toggle to go online/offline</p>
              </div>
              <Switch
                checked={profile.isAvailable}
                onCheckedChange={(checked) => setProfile({...profile, isAvailable: checked})}
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Working Hours</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="startTime" className="text-sm">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={profile.workingHours.start}
                    onChange={(e) => setProfile({
                      ...profile, 
                      workingHours: {...profile.workingHours, start: e.target.value}
                    })}
                    className="h-11"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime" className="text-sm">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={profile.workingHours.end}
                    onChange={(e) => setProfile({
                      ...profile, 
                      workingHours: {...profile.workingHours, end: e.target.value}
                    })}
                    className="h-11"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings & Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Settings className="w-5 h-5 mr-2 text-primary" />
              Settings & Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-12">
              <Shield className="w-4 h-4 mr-3" />
              Document Verification
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-12">
              <Star className="w-4 h-4 mr-3" />
              Ratings & Reviews
            </Button>
            
            <Button variant="outline" className="w-full justify-start h-12">
              <Settings className="w-4 h-4 mr-3" />
              Notification Settings
            </Button>

            <Separator />

            <Button 
              variant="destructive" 
              className="w-full justify-start h-12"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplierProfile;