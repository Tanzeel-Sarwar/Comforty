"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/client"
import ProductCard from "@/components/Product-Card"

interface Product {
  _id: string
  title: string
  slug: string
  price: number
  imageUrl: string
  description: string
  tags: string[]
  isNew?: boolean
  isSale?: boolean
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const query = `*[_type == "products" && "featured" in tags] {
                _id,
                title,
                price,
                priceWithoutDiscount,
                isNew,
                isSale,
                "imageUrl": image.asset->url,
                slug
            }`
      const data = await client.fetch(query)
      setProducts(data.slice(0, 4))
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse p-4 border rounded">
                  <div className="bg-gray-300 h-48 mb-4"></div>
                  <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
                  <div className="bg-gray-300 h-4 w-1/2"></div>
                </div>
              ))
            : products.map((product) => (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  title={product.title}
                  price={product.price}
                  image={product.imageUrl}
                  isNew={product.isNew}
                  isSale={product.isSale}
                />
              ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts

