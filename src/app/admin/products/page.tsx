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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setIsLoading(true) // Ensure loading state is set
    try {
      console.log("Fetching products...")
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
      console.log("Products fetched:", fetchedProducts)
      setProducts(fetchedProducts)
    } catch (error: any) {
      console.error("Error fetching products:", error)
      toast({
        title: "Error",
        description: `Failed to fetch products: ${error.message || "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // const handleDelete = async (id: string) => {
  //   if (!window.confirm("Are you sure you want to delete this product?")) return

  //   try {
  //     console.log(`Deleting product with ID: ${id}`)
  //     await sanityClient.delete(id)
  //     console.log("Product deleted successfully")
  //     toast({
  //       title: "Success",
  //       description: "Product deleted successfully.",
  //     })

  //     // Update product list after deletion
  //     setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id))
  //   } catch (error: any) {
  //     console.error("Error deleting product:", error)
  //     toast({
  //       title: "Error",
  //       description: `Failed to delete product: ${error.message || "Unknown error"}`,
  //       variant: "destructive",
  //     })
  //   }
  // }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button asChild>
          <a href="/studio/structure/products" target="_blank" rel="noopener noreferrer">
            Add New Product
          </a>
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
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Image src={product.image || "/placeholder.svg"} alt={product.title} width={50} height={50} />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>${product.priceWithoutDiscount}</TableCell>
                <TableCell>{product.badge}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.inventory}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="mr-2"
                        onClick={() => setSelectedProduct(product)}
                      >
                        Show Details
                      </Button>
                    </DialogTrigger>
                    {selectedProduct && selectedProduct._id === product._id && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{selectedProduct.title}</DialogTitle>
                          <DialogDescription>
                            <div className="mt-2 space-y-2">
                              <>
                              <p>
                                <strong>Price:</strong> ${selectedProduct.price.toFixed(2)}
                              </p>
                              <p>
                                <strong>Price without Discount:</strong> ${selectedProduct.priceWithoutDiscount}
                              </p>
                              <p>
                                <strong>Badge:</strong> {selectedProduct.badge}
                              </p>
                              <p>
                                <strong>Category:</strong> {selectedProduct.category}
                              </p>
                              <p>
                                <strong>Inventory:</strong> {selectedProduct.inventory}
                              </p>
                              <p>
                                <strong>Description:</strong> {selectedProduct.description}
                              </p>
                              <p>
                                <strong>Tags:</strong> {selectedProduct.tags.join(", ")}
                              </p>
                              </>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    )}
                  </Dialog>
                  {/* <Button onClick={() => handleDelete(product._id)} variant="destructive">
                    Delete
                  </Button> */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
