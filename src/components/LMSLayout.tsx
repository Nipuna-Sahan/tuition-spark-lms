import { Outlet, useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, User, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LMSLayout = () => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    const breadcrumbs = [
      { label: 'Dashboard', href: '/', active: path === '/' }
    ];
    
    segments.forEach((segment, index) => {
      if (segment !== '') {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
        breadcrumbs.push({
          label,
          href,
          active: href === path
        });
      }
    });
    
    return breadcrumbs;
  };

  return (
    <div className="min-h-screen flex w-full gradient-academic">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Academic Header */}
        <header className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-lg flex items-center justify-between px-6 shadow-soft">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="hover-scale text-gray-600 hover:text-primary" />
            <div className="hidden md:block">
              <Breadcrumb>
                <BreadcrumbList>
                  {getBreadcrumbs().map((crumb, index) => (
                    <div key={crumb.href} className="flex items-center">
                      <BreadcrumbItem>
                        {crumb.active ? (
                          <BreadcrumbPage className="font-semibold text-gray-900">
                            {crumb.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink 
                            href={crumb.href}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {crumb.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < getBreadcrumbs().length - 1 && <BreadcrumbSeparator className="text-gray-300" />}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          
          {/* Clean Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses, students, assignments..."
                className="academic-input pl-10 border-gray-200 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          
          {/* Professional Header Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-primary text-white border-2 border-white">
                3
              </Badge>
            </Button>
            
            <ThemeToggle />
            
            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 px-3">
                  <Avatar className="h-8 w-8 border-2 border-gray-200">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-white font-medium">JS</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900">John Smith</p>
                    <p className="text-xs text-gray-500">Teacher</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-gray-200 shadow-lg">
                <DropdownMenuLabel className="text-gray-900">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">Profile Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">Billing</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">Support</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem className="text-red-600 hover:bg-red-50">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Clean Main Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LMSLayout;