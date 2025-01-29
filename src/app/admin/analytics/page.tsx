"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Loader from "../Loader"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { products, categories } from "@/lib/data"

interface AnalyticsData {
  totalRevenue: number
  averageOrderValue: number
  topSellingProducts: {
    name: string
    sales: number
  }[]
  salesByCategory: {
    name: string
    value: number
  }[]
  monthlySales: {
    month: string
    sales: number
  }[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AnalyticsPage() {
  useAdminAuth()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   const calculateAnalyticsData = () => {
  //     // Calculate total revenue
  //     const totalRevenue = products.reduce((sum, product) => sum + product.price * product.inventory, 0)

  //     // Calculate average order value (assuming each product is an order for simplicity)
  //     const averageOrderValue = totalRevenue / products.length

  //     // Get top selling products
  //     const topSellingProducts = [...products]
  //       .sort((a, b) => b.inventory - a.inventory)
  //       .slice(0, 5)
  //       .map((product) => ({
  //         name: product.title,
  //         sales: product.inventory,
  //       }))

  //     // Calculate sales by category
  //     const salesByCategory = categories.map((category) => ({
  //       name: category.title,
  //       value: products
  //         .filter((product) => product.category === category._id)
  //         .reduce((sum, product) => sum + product.inventory, 0),
  //     }))

  //     // Generate mock monthly sales data (as we don't have real date information)
  //     const monthlySales = Array.from({ length: 12 }, (_, i) => {
  //       const month = new Date(2023, i).toLocaleString("default", { month: "short" })
  //       return {
  //         month,
  //         sales: Math.floor(Math.random() * 10000) + 5000, // Random sales between 5000 and 15000
  //       }
  //     })

  //     setAnalyticsData({
  //       totalRevenue,
  //       averageOrderValue,
  //       topSellingProducts,
  //       salesByCategory,
  //       monthlySales,
  //     })

  //     setIsLoading(false)
  //   }

  //   calculateAnalyticsData()
  // }, [])

  if (isLoading) {
    return <Loader />
  }

  if (!analyticsData) {
    return <div>Error loading analytics data</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.averageOrderValue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analyticsData.topSellingProducts.map((product, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{product.name}</span>
                  <span className="font-medium">{product.sales} sold</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.salesByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {analyticsData.salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

