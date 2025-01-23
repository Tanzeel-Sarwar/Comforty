"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
// import Loader from "../Loader" //Removed Loader import

interface Order {
  _id: string
  orderNumber: string
  customer: {
    name: string
  }
  status: string
  totalAmount: number
}

export default function OrdersPage() {
  // const [orders, setOrders] = useState<Order[]>([]) //Removed useState for orders
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
    }
  }, [user, router])

  //Removed useEffect hook that fetches orders data

  const orders: Order[] = [
    { _id: "1", orderNumber: "ORD001", customer: { name: "John Doe" }, status: "Processing", totalAmount: 99.99 },
    { _id: "2", orderNumber: "ORD002", customer: { name: "Jane Smith" }, status: "Shipped", totalAmount: 149.99 },
    { _id: "3", orderNumber: "ORD003", customer: { name: "Bob Johnson" }, status: "Delivered", totalAmount: 79.99 },
  ]

  if (!user) {
    return null
  }

  //Removed the isLoading check and Loader component

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                <Button asChild variant="outline" className="mr-2">
                  <Link href={`/admin/orders/${order._id}`}>View Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

