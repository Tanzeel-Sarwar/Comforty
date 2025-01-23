"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
// import Loader from "../Loader" //Removed Loader import

interface Product {
  _id: string
  title: string
  price: number
  category: string
  priceWithoutDiscount: number
  badge: string
  image: string
  description: string
  inventory: number
  tags: string[]
}

const products: Product[] = [
  {
    _id: "1",
    title: "Product 1",
    price: 19.99,
    category: "Category A",
    priceWithoutDiscount: 19.99,
    badge: "",
    image: "",
    description: "",
    inventory: 100,
    tags: [],
  },
  {
    _id: "2",
    title: "Product 2",
    price: 29.99,
    category: "Category B",
    priceWithoutDiscount: 29.99,
    badge: "",
    image: "",
    description: "",
    inventory: 75,
    tags: [],
  },
  {
    _id: "3",
    title: "Product 3",
    price: 39.99,
    category: "Category A",
    priceWithoutDiscount: 39.99,
    badge: "",
    image: "",
    description: "",
    inventory: 50,
    tags: [],
  },
  {
    _id: "4",
    title: "Product 4",
    price: 49.99,
    category: "Category C",
    priceWithoutDiscount: 49.99,
    badge: "",
    image: "",
    description: "",
    inventory: 25,
    tags: [],
  },
]

export default function ProductsPage() {
  // const [products, setProducts] = useState<Product[]>([]) //Removed products state
  // const [isLoading, setIsLoading] = useState(true) //Removed isLoading state
  const { user } = useAuth()

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("/api/admin/products", {
  //         headers: {
  //           Authorization: `Basic ${btoa("admin:admin123")}`,
  //         },
  //       })
  //       if (response.ok) {
  //         const data = await response.json()
  //         setProducts(data)
  //       } else {
  //         console.error("Failed to fetch products")
  //       }
  //     } catch (error) {
  //       console.error("Error fetching products:", error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   if (user) {
  //     fetchProducts()
  //   }
  // }, [user]) //Removed useEffect hook

  if (!user) {
    return null
  }

  // if (isLoading) {
  //   return <Loader />
  // } //Removed isLoading check and Loader

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button asChild>
          <Link href="/admin/products/new">Add New Product</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Inventory</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.inventory}</TableCell>
              <TableCell>
                <Button asChild variant="outline" className="mr-2">
                  <Link href={`/admin/products/${product._id}`}>Edit</Link>
                </Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

