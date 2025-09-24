"use client"

import { AppSidebar } from "./AppSidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Gamepad2, Zap } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen bg-gradient-to-br from-redbull-black via-gaming-slate/5 to-redbull-black">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gaming-slate/20 bg-gradient-to-r from-redbull-black/90 to-gaming-slate/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="hover:bg-gaming-slate/20 text-gaming-light-gray hover:text-white" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-gaming-slate/30" />
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-redbull-red" />
              <span className="text-sm font-medium text-gaming-light-gray font-redbull-book">
                Gaming Dashboard
              </span>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/" className="text-gaming-light-gray hover:text-white font-redbull-book">
                    Red Bull Gaming
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gaming-slate" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white font-redbull-cond-bold">
                    Dashboard
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <div className="flex-1">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
