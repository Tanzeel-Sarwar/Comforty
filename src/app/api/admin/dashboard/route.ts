import { NextResponse } from "next/server"
import { verifyCredentials } from "@/lib/auth"
import { client } from "@/sanity/lib/client"

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization")

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const base64Credentials = authHeader.split(" ")[1]
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8")
  const [username, password] = credentials.split(":")

  if (!verifyCredentials(username, password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const [products, orders, users] = await Promise.all([
      client.fetch('count(*[_type == "products"])'),
      client.fetch('count(*[_type == "orders"])'),
      client.fetch('count(*[_type == "users"])'),
    ])

    const totalRevenue = await client.fetch('sum(*[_type == "orders"].totalAmount)')

    return NextResponse.json({
      totalProducts: products,
      totalOrders: orders,
      totalUsers: users,
      totalRevenue,
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

