"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sanityClient } from "@/lib/sanity"
import Loader from "../Loader"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AnalyticsData {
  totalProducts: number
  totalCategories: number
  totalRevenue: number
  monthlySales: {
    month: string
    sales: number
  }[]
}

export default function AnalyticsPage() {
  useAdminAuth()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [totalProducts, totalCategories, totalRevenue, monthlySales] = await Promise.all([
          sanityClient.fetch<number>('count(*[_type == "products"])'),
          sanityClient.fetch<number>('count(*[_type == "categories"])'),
          sanityClient.fetch<number>('*[_type == "products"] { "revenue": price * inventory } | sum(revenue)'),
          sanityClient.fetch<AnalyticsData["monthlySales"]>(`
            *[_type == "products"] {
              "month": dateTime(_createdAt),
              "sales": price * inventory
            } | group by dateTime(month, "month") {
              "month": dateTime(month, "yyyy-MM"),
              "sales": sum(sales)
            } | order(month asc)
          `),
        ])

        setAnalyticsData({
          totalProducts,
          totalCategories,
          totalRevenue,
          monthlySales,
        })
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (!analyticsData) {
    return <div>Error loading analytics data</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalCategories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={analyticsData.monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

