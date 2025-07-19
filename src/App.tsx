import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
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

// Components
import BottomNavigation from "./components/BottomNavigation";
import EmergencyButton from "./components/EmergencyButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="pb-16"> {/* Add padding for bottom navigation */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/book" element={<BookTanker />} />
            <Route path="/track" element={<TrackTanker />} />
            <Route path="/delivery-otp" element={<DeliveryOTP />} />
            <Route path="/delivery-success" element={<DeliverySuccess />} />
            <Route path="/history" element={<History />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/subscription-success" element={<SubscriptionSuccess />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNavigation />
          <EmergencyButton />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
