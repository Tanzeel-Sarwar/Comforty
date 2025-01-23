"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
// import Loader from "../Loader" //Removed Loader import

interface Category {
  _id: string
  title: string
  products: number
  image: string
}

const categories: Category[] = [
  { _id: "1", title: "Category A", products: 50, image: "/placeholder.jpg" },
  { _id: "2", title: "Category B", products: 30, image: "/placeholder.jpg" },
  { _id: "3", title: "Category C", products: 20, image: "/placeholder.jpg" },
]

export default function CategoriesPage() {
  //const [categories, setCategories] = useState<Category[]>([]) //Removed categories state
  //const [isLoading, setIsLoading] = useState(true) //Removed isLoading state
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
    }
  }, [user, router])

  // useEffect(() => { //Removed useEffect hook for fetching categories
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch("/api/admin/categories", {
  //         headers: {
  //           Authorization: `Basic ${btoa("admin:admin123")}`,
  //         },
  //       })
  //       if (response.ok) {
  //         const data = await response.json()
  //         setCategories(data)
  //       } else {
  //         console.error("Failed to fetch categories")
  //       }
  //     } catch (error) {
  //       console.error("Error fetching categories:", error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   if (user) {
  //     fetchCategories()
  //   }
  // }, [user])

  if (!user) {
    return null
  }

  // if (isLoading) { //Removed isLoading check
  //   return <Loader />
  // }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button asChild>
          <Link href="/admin/categories/new">Add New Category</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Number of Products</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category.title}</TableCell>
              <TableCell>{category.products}</TableCell>
              <TableCell>
                <Button asChild variant="outline" className="mr-2">
                  <Link href={`/admin/categories/${category._id}`}>Edit</Link>
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

