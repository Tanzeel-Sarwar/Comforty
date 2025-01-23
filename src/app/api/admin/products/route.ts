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
    const products = await client.fetch(`
      *[_type == "products"] {
        _id,
        title,
        price,
        "category": category->title,
        priceWithoutDiscount,
        badge,
        "image": image.asset->url,
        description,
        inventory,
        tags
      }
    `)

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

