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

const OurProducts = () => {
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
    <section className="pb-32">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse space-y-4 rounded-lg bg-gray-100 p-4">
                  <div className="aspect-square bg-gray-300 rounded-md" />
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-6 bg-gray-300 rounded w-1/2" />
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

export default OurProducts

