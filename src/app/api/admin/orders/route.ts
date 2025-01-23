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
    const orders = await client.fetch(`
      *[_type == "orders"] {
        _id,
        orderNumber,
        customer,
        items,
        status,
        totalAmount,
        paymentStatus,
        createdAt,
        updatedAt
      }
    `)

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

