"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { sanityClient } from "@/lib/sanity"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Loader from "../Loader"

interface Category {
  _id: string
  title: string
  image: string
  products: number
}

interface CategoryDetails extends Category {
  productList?: { title: string; price: number }[]
}

export default function CategoriesPage() {
  useAdminAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<CategoryDetails | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await sanityClient.fetch<Category[]>(`
        *[_type == "categories"] {
          _id,
          title,
          "image": image.asset->url,
          "products": count(*[_type == "products" && references(^._id)])
        }
      `)
      setCategories(fetchedCategories)
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast({
        title: "Error",
        description: "Failed to fetch categories. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategoryDetails = async (id: string) => {
    try {
      const category = await sanityClient.fetch<CategoryDetails>(
        `
        *[_type == "categories" && _id == $id][0] {
          _id,
          title,
          "image": image.asset->url,
          "products": count(*[_type == "products" && references(^._id)]),
          "productList": *[_type == "products" && references(^._id)] {
            title,
            price
          }
        }
      `,
        { id },
      )
      setSelectedCategory(category)
    } catch (error) {
      console.error("Error fetching category details:", error)
      toast({
        title: "Error",
        description: "Failed to fetch category details. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await sanityClient.delete(id)
        toast({
          title: "Success",
          description: "Category deleted successfully.",
        })
        fetchCategories()
      } catch (error) {
        console.error("Error deleting category:", error)
        toast({
          title: "Error",
          description: "Failed to delete category. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button asChild>
          <a href="/studio/structure/categories" target="_blank" rel="noopener noreferrer">
            Add New Category
          </a>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Number of Products</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>
                <Image src={category.image || "/placeholder.svg"} alt={category.title} width={50} height={50} />
              </TableCell>
              <TableCell>{category.title}</TableCell>
              <TableCell>{category.products}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2" onClick={() => fetchCategoryDetails(category._id)}>
                      Show Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedCategory?.title}</DialogTitle>
                      <DialogDescription>
                        <div className="mt-2">
                          <p>
                            <strong>Number of Products:</strong> {selectedCategory?.products}
                          </p>
                          <p>
                            <strong>Products:</strong>
                          </p>
                          <ul>
                            {selectedCategory?.productList?.map((product, index) => (
                              <li key={index}>
                                {product.title} - ${product.price.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Button onClick={() => handleDelete(category._id)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

