"use client"

import { useEffect } from "react"
import Layout from "@/components/Layout"
import { useSavedItems } from "@/contexts/saved-items-context"
import ProductCard from "@/components/Product-Card"

export default function SavedItemsPage() {
  const { savedItems } = useSavedItems()

  useEffect(() => {
    // You could add any side effects here, like analytics
  }, [])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Saved Items</h1>
        {savedItems.length === 0 ? (
          <p>You haven't saved any items yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedItems.map((item) => (
              <ProductCard key={item.id} _id={item.id} title={item.title} price={item.price} image={item.image} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

