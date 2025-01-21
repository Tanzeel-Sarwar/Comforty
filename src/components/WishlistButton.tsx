"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { useSavedItems } from "@/contexts/saved-items-context"
import toast from "react-hot-toast"

interface Product {
  _id: string
  title: string
  price: number
  imageUrl: string
}

export default function WishlistButton({ product }: { product: Product }) {
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems()
  const [isFavorite, setIsFavorite] = useState(isSaved(product._id))

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeSavedItem(product._id)
      toast.success("Removed from wishlist")
    } else {
      addSavedItem({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.imageUrl,
      })
      toast.success("Added to wishlist")
    }
    setIsFavorite(!isFavorite)
  }

  return (
    <button
      onClick={handleToggleFavorite}
      className="flex items-center justify-center bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-[#007580] transition-colors"
    >
      <Heart className={`w-5 h-5  ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"}`} />
      {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  )
}

