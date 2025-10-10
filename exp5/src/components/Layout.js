import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Map, Search, Compass, Home, BookOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Culture Map",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Explore Regions",
    url: createPageUrl("Regions"),
    icon: Map,
  },
  {
    title: "Cultural Categories",
    url: createPageUrl("Categories"),
    icon: BookOpen,
  },
  {
    title: "Discover",
    url: createPageUrl("Discover"),
    icon: Search,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div style={{
      '--primary-saffron': '#FF6B35',
      '--primary-blue': '#005F8C', 
      '--primary-green': '#2D5A27',
      '--accent-gold': '#DAA520',
      '--warm-cream': '#FEF9E7',
      '--deep-burgundy': '#8B0000'
    }}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-amber-50 via-white to-orange-50">
          <Sidebar className="border-r border-orange-200/50 bg-white/95 backdrop-blur-sm">
            <SidebarHeader className="border-b border-orange-100 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#DAA520] rounded-xl flex items-center justify-center shadow-lg">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-gray-900">Culture Map</h2>
                  <p className="text-xs text-[#FF6B35] font-medium">Incredible India</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-3">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                  Navigate
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:text-[#FF6B35] transition-all duration-300 rounded-xl mb-2 ${
                            location.pathname === item.url ? 'bg-gradient-to-r from-[#FF6B35]/10 to-[#DAA520]/10 text-[#FF6B35] border-l-4 border-[#FF6B35]' : ''
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="mt-6">
                <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-3">
                  Quick Facts
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-4 py-3 space-y-3">
                    <div className="bg-gradient-to-r from-[#FF6B35]/10 to-[#DAA520]/10 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">States & UTs</span>
                        <span className="font-bold text-[#FF6B35]">36</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#005F8C]/10 to-[#2D5A27]/10 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Languages</span>
                        <span className="font-bold text-[#005F8C]">700+</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#2D5A27]/10 to-[#FF6B35]/10 rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Art Forms</span>
                        <span className="font-bold text-[#2D5A27]">200+</span>
                      </div>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-orange-100 p-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#DAA520] rounded-full mx-auto mb-2 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">🇮🇳</span>
                </div>
                <p className="text-xs text-gray-500">Celebrating Unity</p>
                <p className="text-xs text-gray-500">in Diversity</p>
              </div>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 flex flex-col">
            <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200/50 px-6 py-4 md:hidden">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-orange-100 p-2 rounded-xl transition-colors duration-200" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#DAA520] bg-clip-text text-transparent">
                  Culture Map of India
                </h1>
              </div>
            </header>

            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}