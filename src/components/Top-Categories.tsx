"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { createClient } from "@sanity/client"
import { useRouter } from "next/navigation"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-18",
  useCdn: true,
})

interface Category {
  _id: string
  title: string
  imageUrl: string
  products: number
}

export default function TopCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const query = `*[_type == "categories"]{_id, title, "imageUrl": image.asset->url, products}`
        const data: Category[] = await client.fetch(query)
        setCategories(data)
      } catch (err: any) {
        console.error("Error Fetching Categories:", err)
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return <p>Loading categories...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <section className="pt-9 pb-[75px]">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Top Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => router.push(`/products?category=${encodeURIComponent(category.title)}`)}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <div className="aspect-[3/3]">
                <Image
                  src={category.imageUrl || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-xl font-semibold mb-1">{category.title}</h3>
                  <p className="text-white/80 text-sm">
                    {category.products} Product{category.products !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

