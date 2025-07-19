import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Customer Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import BookTanker from "./pages/BookTanker";
import TrackTanker from "./pages/TrackTanker";
import DeliveryOTP from "./pages/DeliveryOTP";
import DeliverySuccess from "./pages/DeliverySuccess";
import History from "./pages/History";
import Subscription from "./pages/Subscription";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import NotFound from "./pages/NotFound";

// Supplier Pages
import SupplierLogin from "./pages/supplier/SupplierLogin";
import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import AcceptOrder from "./pages/supplier/AcceptOrder";
import CustomerTracking from "./pages/supplier/CustomerTracking";
import DeliveryOTPSupplier from "./pages/supplier/DeliveryOTPSupplier";
import DeliverySuccessSupplier from "./pages/supplier/DeliverySuccess";
import SupplierHistory from "./pages/supplier/SupplierHistory";
import SupplierProfile from "./pages/supplier/SupplierProfile";
import SupplierEarnings from "./pages/supplier/SupplierEarnings";

// Components
import BottomNavigation from "./components/BottomNavigation";
import SupplierBottomNavigation from "./components/SupplierBottomNavigation";
import EmergencyButton from "./components/EmergencyButton";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="pb-16"> {/* Add padding for bottom navigation */}
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/book" element={<BookTanker />} />
              <Route path="/track" element={<TrackTanker />} />
              <Route path="/delivery-otp" element={<DeliveryOTP />} />
              <Route path="/delivery-success" element={<DeliverySuccess />} />
              <Route path="/history" element={<History />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/subscription-success" element={<SubscriptionSuccess />} />
              
              {/* Supplier Routes */}
              <Route path="/supplier/login" element={<SupplierLogin />} />
              <Route path="/supplier/dashboard" element={<SupplierDashboard />} />
              <Route path="/supplier/accept-order/:orderId" element={<AcceptOrder />} />
              <Route path="/supplier/customer-tracking/:orderId" element={<CustomerTracking />} />
              <Route path="/supplier/delivery-otp/:orderId" element={<DeliveryOTPSupplier />} />
              <Route path="/supplier/delivery-success/:orderId" element={<DeliverySuccessSupplier />} />
              <Route path="/supplier/history" element={<SupplierHistory />} />
              <Route path="/supplier/profile" element={<SupplierProfile />} />
              <Route path="/supplier/earnings" element={<SupplierEarnings />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Show customer navigation for customer routes */}
            {!window.location.pathname.includes('/supplier') && (
              <>
                <BottomNavigation />
                <EmergencyButton />
              </>
            )}
            
            {/* Show supplier navigation for supplier routes */}
            {window.location.pathname.includes('/supplier') && <SupplierBottomNavigation />}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
