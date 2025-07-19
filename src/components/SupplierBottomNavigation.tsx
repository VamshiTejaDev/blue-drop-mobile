import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, ClipboardList, History, User } from "lucide-react";

const SupplierBottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/supplier/dashboard",
      isActive: location.pathname === "/supplier/dashboard"
    },
    {
      icon: ClipboardList,
      label: "Orders",
      path: "/supplier/orders",
      isActive: location.pathname.includes("/supplier/orders") || 
                location.pathname.includes("/supplier/accept-order") ||
                location.pathname.includes("/supplier/customer-tracking") ||
                location.pathname.includes("/supplier/delivery-otp")
    },
    {
      icon: History,
      label: "History",
      path: "/supplier/history",
      isActive: location.pathname === "/supplier/history"
    },
    {
      icon: User,
      label: "Profile",
      path: "/supplier/profile",
      isActive: location.pathname === "/supplier/profile" || 
                location.pathname === "/supplier/earnings"
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Don't show on login page
  if (location.pathname === "/supplier/login") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px]",
                item.isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 mb-1",
                item.isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-xs font-medium",
                item.isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SupplierBottomNavigation;