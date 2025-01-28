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
import Loader from "../Loader"

interface Product {
  _id: string
  title: string
  price: number
  priceWithoutDiscount: number
  badge: string
  image: string
  category: string
  description: string
  inventory: number
  tags: string[]
}

export default function ProductsPage() {
  useAdminAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await sanityClient.fetch<Product[]>(`
        *[_type == "products"] {
          _id,
          title,
          price,
          priceWithoutDiscount,
          badge,
          "image": image.asset->url,
          "category": category->title,
          description,
          inventory,
          tags
        }
      `)
      setProducts(fetchedProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: "Failed to fetch products. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSave = async (product: Product) => {
    try {
      await sanityClient
        .patch(product._id)
        .set({
          title: product.title,
          price: product.price,
          priceWithoutDiscount: product.priceWithoutDiscount,
          badge: product.badge,
          description: product.description,
          inventory: product.inventory,
        })
        .commit()
      setEditingId(null)
      toast({
        title: "Success",
        description: "Product updated successfully.",
      })
      fetchProducts()
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await sanityClient.delete(id)
        toast({
          title: "Success",
          description: "Product deleted successfully.",
        })
        fetchProducts()
      } catch (error) {
        console.error("Error deleting product:", error)
        toast({
          title: "Error",
          description: "Failed to delete product. Please try again.",
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
        <h2 className="text-2xl font-bold">Products</h2>
        <Button asChild>
          <Link href="/admin/products/new">Add New Product</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Price without Discount</TableHead>
            <TableHead>Badge</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Inventory</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <Image src={product.image || "/placeholder.svg"} alt={product.title} width={50} height={50} />
              </TableCell>
              <TableCell>
                {editingId === product._id ? (
                  <Input
                    value={product.title}
                    onChange={(e) =>
                      setProducts(products.map((p) => (p._id === product._id ? { ...p, title: e.target.value } : p)))
                    }
                  />
                ) : (
                  product.title
                )}
              </TableCell>
              <TableCell>
                {editingId === product._id ? (
                  <Input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      setProducts(
                        products.map((p) => (p._id === product._id ? { ...p, price: Number(e.target.value) } : p)),
                      )
                    }
                  />
                ) : (
                  `$${product.price.toFixed(2)}`
                )}
              </TableCell>
              <TableCell>
                {editingId === product._id ? (
                  <Input
                    type="number"
                    value={product.priceWithoutDiscount}
                    onChange={(e) =>
                      setProducts(
                        products.map((p) =>
                          p._id === product._id ? { ...p, priceWithoutDiscount: Number(e.target.value) } : p,
                        ),
                      )
                    }
                  />
                ) : (
                  `$${product.priceWithoutDiscount}`
                )}
              </TableCell>
              <TableCell>
                {editingId === product._id ? (
                  <Input
                    value={product.badge}
                    onChange={(e) =>
                      setProducts(products.map((p) => (p._id === product._id ? { ...p, badge: e.target.value } : p)))
                    }
                  />
                ) : (
                  product.badge
                )}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {editingId === product._id ? (
                  <Input
                    type="number"
                    value={product.inventory}
                    onChange={(e) =>
                      setProducts(
                        products.map((p) => (p._id === product._id ? { ...p, inventory: Number(e.target.value) } : p)),
                      )
                    }
                  />
                ) : (
                  product.inventory
                )}
              </TableCell>
              <TableCell>
                {editingId === product._id ? (
                  <Button onClick={() => handleSave(product)} className="mr-2">
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => handleEdit(product._id)} variant="outline" className="mr-2">
                    Edit
                  </Button>
                )}
                <Button onClick={() => handleDelete(product._id)} variant="destructive">
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

