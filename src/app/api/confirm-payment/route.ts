import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, // We're in a server environment, so we don't need the CDN
  apiVersion: "2023-05-03", // Use the latest API version
})

// Define a more flexible Product interface
interface Product {
  _id?: string
  name: string
  expirationDate?: string // Make this optional as not all products might have an expiration date
  // Add other fields as needed
}

const product1: Product = {
  _id: "123",
  name: "Acme Widget",
  expirationDate: "2024-12-18",
}

const product2: Product = {
  _id: "456",
  name: "Another Widget",
  expirationDate: "2025-01-15",
}

function checkExpiration(expirationDate: string): boolean {
  const date = new Date(expirationDate)
  return date < new Date()
}

//console.log(checkExpiration(product1)) //false
//console.log(checkExpiration(product2)) //false

const products: Product[] = [product1, product2]

products.forEach((product) => {
  console.log(`${product.name} expires on ${product.expirationDate}`)
})

export async function POST(request: Request) {
  try {
    const { productIds } = await request.json()

    // Fetch products from Sanity
    const products: Product[] = await client.fetch(
      `
      *[_type == "product" && _id in $productIds] {
        _id,
        name,
        expirationDate,
        // Add other fields you need
      }
    `,
      { productIds },
    )

    // Process the products
    const processedProducts = products.map((product) => ({
      id: product._id,
      name: product.name,
      isExpired: product.expirationDate ? checkExpiration(product.expirationDate) : false,
      // Add other processed fields as needed
    }))

    return NextResponse.json({ products: processedProducts })
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

