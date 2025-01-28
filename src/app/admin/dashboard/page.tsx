"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sanityClient } from "@/lib/sanity"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import Loader from "../Loader"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useAuth, useUser, useClerk } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

interface DashboardData {
  totalProducts: number
  totalCategories: number
  totalRevenue: number
  productPerformance: {
    name: string
    sales: number
  }[]
}

export default function DashboardPage() {
  useAdminAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isLoaded, userId } = useAuth()
  const { user } = useUser()
  // const { getUsers } = useClerk()
  const [users, setUsers] = useState<any[]>([])

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await getUsers()
  //     setUsers(fetchedUsers)
  //   }
  //   fetchUsers()
  // }, [getUsers])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [totalProducts, totalCategories, totalRevenue, productPerformance] = await Promise.all([
          sanityClient.fetch<number>('count(*[_type == "products"])'),
          sanityClient.fetch<number>('count(*[_type == "categories"])'),
          sanityClient.fetch<number>('*[_type == "products"] { "revenue": price * inventory } | sum(revenue)'),
          sanityClient.fetch<DashboardData["productPerformance"]>(`
            *[_type == "products"] {
              "name": title,
              "sales": price * inventory
            } | order(sales desc)[0...5]
          `),
        ])

        setDashboardData({
          totalProducts,
          totalCategories,
          totalRevenue,
          productPerformance,
        })
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const openStripeDashboard = () => {
    window.open("https://dashboard.stripe.com/test/payments", "_blank")
  }

  if (isLoading || !isLoaded) {
    return <Loader />
  }

  if (!dashboardData) {
    return <div>Error loading dashboard data</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalCategories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.productPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {users.slice(0, 5).map((user) => (
                <li key={user.id} className="mb-2">
                  {user.firstName} {user.lastName} - {user.emailAddresses[0].emailAddress}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={openStripeDashboard}>Open Stripe Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  )
}

