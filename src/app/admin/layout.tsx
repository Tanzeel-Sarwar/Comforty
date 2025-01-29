"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  FolderTree,
  BarChart,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Loader from "./Loader"
import { UserButton } from "@clerk/nextjs"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Users", href: "https://dashboard.clerk.com/apps/app_2sCuyaJXbdHeOsdYZNwEwPdVMvK/instances/ins_2sCuyWPnP7RKzxAflB9eSzQ1Zi9/users", icon: ShoppingCart },
  { name: "Payments", href: "https://dashboard.stripe.com/test/payments", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"
      const loginTime = Number.parseInt(localStorage.getItem("adminLoginTime") || "0", 10)
      const currentTime = Date.now()
      const oneDay = 24 * 60 * 60 * 1000

      if (isAdminLoggedIn && currentTime - loginTime < oneDay) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        if (pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn")
    localStorage.removeItem("adminLoginTime")
    setIsLoggedIn(false)
    router.push("/admin/login")
  }

  if (isLoading) {
    return <Loader />
  }

  if (!isLoggedIn && pathname !== "/admin/login") {
    return null
  }

  if (pathname === "/admin/login") {
    return isLoggedIn ? <>{children}</> : children
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r transition-all duration-300 ease-in-out z-10",
          sidebarExpanded ? "w-56" : "w-[70px]",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-[#13676e]">
            <Image src="/images/Logo Icon.png" alt="Comforty Logo" width={32} height={32} />
            {sidebarExpanded && <span className="ml-2 text-xl font-bold text-white">Comforty</span>}
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto ">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    pathname === item.href
                      ? "bg-[rgb(0,117,128)] text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {sidebarExpanded && <span>{item.name}</span>}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col border-t border-gray-200 p-4">
            <Button
              variant="outline"
              size="icon"
              className="mx-auto my-2"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              {sidebarExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <UserButton afterSignOutUrl="/admin/login" />
            <Button
              onClick={handleLogout}
              className="mt-4 flex items-center w-full justify-center bg-red-500 text-white hover:bg-red-600"
            >
              <LogOut className="h-6 w-6" />
              {sidebarExpanded && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
          sidebarExpanded ? "ml-64" : "ml-20",
        )}
      >
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
