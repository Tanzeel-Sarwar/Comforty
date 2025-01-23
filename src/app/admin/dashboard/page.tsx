"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, ShoppingCart, DollarSign, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
// import Loader from "../Loader" //Removed Loader import

const dashboardData = {
  totalProducts: 150,
  totalOrders: 1250,
  totalUsers: 500,
  totalRevenue: 75000,
}

export default function AdminDashboard() {
  // const [dashboardData, setDashboardData] = useState<DashboardData | null>(null) //Removed state
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
    }
  }, [user, router])

  // useEffect(() => { //Removed useEffect hook
  //   const fetchDashboardData = async () => {
  //     try {
  //       const response = await fetch("/api/admin/dashboard", {
  //         headers: {
  //           Authorization: `Basic ${btoa("admin:admin123")}`,
  //         },
  //       })
  //       if (response.ok) {
  //         const data = await response.json()
  //         setDashboardData(data)
  //       } else {
  //         console.error("Failed to fetch dashboard data")
  //       }
  //     } catch (error) {
  //       console.error("Error fetching dashboard data:", error)
  //     }
  //   }

  //   if (user) {
  //     fetchDashboardData()
  //   }
  // }, [user])

  if (!user) {
    return null
  }

  // if (!dashboardData) { //Removed Loading check
  //   return <Loader />
  // }

  const stats = [
    {
      name: "Total Revenue",
      value: `$${dashboardData.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: 20.1,
      trend: "up",
    },
    {
      name: "Total Orders",
      value: dashboardData.totalOrders.toString(),
      icon: ShoppingCart,
      change: 8.2,
      trend: "up",
    },
    {
      name: "Total Products",
      value: dashboardData.totalProducts.toString(),
      icon: Package,
      change: 4.1,
      trend: "up",
    },
    {
      name: "Active Users",
      value: dashboardData.totalUsers.toString(),
      icon: Users,
      change: 4.5,
      trend: "up",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={stat.trend === "up" ? "text-green-500" : "text-red-500"}
                >{`${Math.abs(stat.change)}%`}</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <Activity className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New order placed</p>
                    <p className="text-xs text-muted-foreground">Order #{1000 + i}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

