"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Monitor, 
  BarChart3, 
  Settings, 
  Users,
  Trophy,
  Gamepad2,
  LogOut,
  Database
} from "lucide-react"
import { logout } from "@/lib/auth"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Overlays",
    url: "/overlays",
    icon: Monitor,
  },
  {
    title: "Teams",
    url: "/teams",
    icon: Users,
  },
  {
    title: "Challenges",
    url: "/challenges",
    icon: Trophy,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Data Sync",
    url: "/data-sync",
    icon: Database,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      variant="sidebar"
      className="border-r border-gaming-slate/20 bg-gradient-to-b from-redbull-black via-redbull-black/95 to-gaming-slate/10 bg-redbull-black"
    >
      <SidebarHeader className="border-b border-gaming-slate/20 bg-redbull-black">
        <div className="flex items-center gap-3 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-redbull-red to-redbull-dark-red">
            <Gamepad2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-redbull-cond-bold tracking-wider">
              RED BULL
            </h2>
            <p className="text-xs text-gaming-light-gray font-redbull-book tracking-wider">
              GAMING
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 bg-redbull-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gaming-light-gray/70 font-redbull-book text-xs tracking-widest uppercase px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="data-[active=true]:bg-gradient-to-r data-[active=true]:from-redbull-red/20 data-[active=true]:to-redbull-dark-red/20 data-[active=true]:border-r-2 data-[active=true]:border-redbull-red hover:bg-gaming-slate/10 text-gaming-light-gray hover:text-white transition-all duration-200 font-redbull-book tracking-wide"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gaming-slate/20 p-4 bg-redbull-black">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2 mb-2 text-gaming-light-gray hover:text-white hover:bg-gaming-slate/10 rounded-lg transition-all duration-200 font-redbull-book tracking-wide"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
        <div className="text-xs text-gaming-light-gray/50 text-center font-redbull-book">
          © 2024 Red Bull Gaming
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
