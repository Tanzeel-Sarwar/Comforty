"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/client"
import ProductCard from "@/components/Product-Card"

interface Product {
  _id: string
  title: string
  price: number
  imageUrl: string
  isNew?: boolean
  isSale?: boolean
}

export default function HomeProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const query = `*[_type == "products"]{
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
      setProducts(data.slice(0, 8))
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="lg:text-3xl md:text-3xl text-2xl text-center font-bold mb-8">Our Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse space-y-4 rounded-lg bg-gray-100 p-4">
                  <div className="aspect-square bg-gray-200 rounded-md" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
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
                isSale={product.isSale} priceWithoutDiscount={0}                />
              ))}
        </div>
      </div>
    </section>
  )
}

