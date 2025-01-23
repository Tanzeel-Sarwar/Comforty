"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Loader from "../Loader"

interface AnalyticsData {
  salesByCategory: { name: string; value: number }[]
  ordersByMonth: { name: string; orders: number }[]
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  // Protect the analytics route
  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
    }
  }, [user, router])

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch("/api/admin/analytics")
        if (response.ok) {
          const data = await response.json()
          setAnalyticsData(data)
        } else {
          console.error("Failed to fetch analytics data")
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      }
    }

    if (user) {
      fetchAnalyticsData()
    }
  }, [user])

  if (!analyticsData) {
    return <Loader />
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics and Insights</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.salesByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#007580" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.ordersByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#007580" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
