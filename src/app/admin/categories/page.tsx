"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { sanityClient } from "@/lib/sanity"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import Loader from "@/app/admin/Loader"

interface Category {
  _id: string
  title: string
  image: string
  products: number
}

export default function CategoriesPage() {
  useAdminAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

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
          products
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

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSave = async (category: Category) => {
    try {
      await sanityClient
        .patch(category._id)
        .set({
          title: category.title,
          products: category.products,
        })
        .commit()
      setEditingId(null)
      toast({
        title: "Success",
        description: "Category updated successfully.",
      })
      fetchCategories()
    } catch (error) {
      console.error("Error updating category:", error)
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
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
          <Link href="/admin/categories/new">Add New Category</Link>
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
              <TableCell>
                {editingId === category._id ? (
                  <Input
                    value={category.title}
                    onChange={(e) =>
                      setCategories(
                        categories.map((c) => (c._id === category._id ? { ...c, title: e.target.value } : c)),
                      )
                    }
                  />
                ) : (
                  category.title
                )}
              </TableCell>
              <TableCell>
                {editingId === category._id ? (
                  <Input
                    type="number"
                    value={category.products}
                    onChange={(e) =>
                      setCategories(
                        categories.map((c) =>
                          c._id === category._id ? { ...c, products: Number(e.target.value) } : c,
                        ),
                      )
                    }
                  />
                ) : (
                  category.products
                )}
              </TableCell>
              <TableCell>
                {editingId === category._id ? (
                  <Button onClick={() => handleSave(category)} className="mr-2">
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => handleEdit(category._id)} variant="outline" className="mr-2">
                    Edit
                  </Button>
                )}
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

