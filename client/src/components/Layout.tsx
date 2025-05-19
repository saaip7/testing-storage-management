"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Package2, LayoutDashboard, ClipboardList, Settings, Users, LogOut, Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
            <Link href="/" className="flex items-center">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="ml-2 text-lg font-semibold">StockManager</span>
            </Link>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <SidebarItem icon={LayoutDashboard} text="Dashboard" href="/" active={pathname === "/"} />
              <SidebarItem icon={ClipboardList} text="Inventory" href="/inventory" active={pathname === "/inventory"} />
              <SidebarItem icon={Users} text="Suppliers" href="/suppliers" active={pathname === "/suppliers"} />
              <SidebarItem icon={Settings} text="Settings" href="/settings" active={pathname === "/settings"} />
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>WM</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Warehouse Manager</p>
                <Button variant="link" size="sm" className="p-0 text-xs text-gray-500 flex items-center" asChild>
                  <Link href="/logout">
                    <LogOut className="mr-1 h-3 w-3" />
                    Sign out
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="sticky top-0 z-10 md:hidden bg-white border-b border-gray-200">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
                  <Link href="/" className="flex items-center">
                    <Package2 className="h-6 w-6 text-primary" />
                    <span className="ml-2 text-lg font-semibold">StockManager</span>
                  </Link>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  <SidebarItem icon={LayoutDashboard} text="Dashboard" href="/" active={pathname === "/"} />
                  <SidebarItem
                    icon={ClipboardList}
                    text="Inventory"
                    href="/inventory"
                    active={pathname === "/inventory"}
                  />
                  <SidebarItem icon={Users} text="Suppliers" href="/suppliers" active={pathname === "/suppliers"} />
                  <SidebarItem icon={Settings} text="Settings" href="/settings" active={pathname === "/settings"} />
                </nav>
                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
                  <div className="flex items-center">
                    <div>
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback>WM</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Warehouse Manager</p>
                      <Button variant="link" size="sm" className="p-0 text-xs text-gray-500 flex items-center" asChild>
                        <Link href="/logout">
                          <LogOut className="mr-1 h-3 w-3" />
                          Sign out
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="ml-2 flex items-center">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="ml-2 text-lg font-semibold">StockManager</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>WM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  icon: React.ElementType
  text: string
  href: string
  active?: boolean
}

function SidebarItem({ icon: Icon, text, href, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
        active ? "bg-gray-100 text-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
      )}
    >
      <Icon
        className={cn(
          "mr-3 flex-shrink-0 h-5 w-5",
          active ? "text-primary" : "text-gray-400 group-hover:text-gray-500",
        )}
      />
      {text}
    </Link>
  )
}
