"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useSavedItems } from "@/contexts/saved-items-context"
import { urlFor } from "@/sanity/lib/image"
import toast from "react-hot-toast"

interface ProductCardProps {
  _id: string
  title: string
  price: number
  image: string
  isNew?: boolean
  isSale?: boolean
}

export default function ProductCard({ _id, title, price, image, isNew, isSale }: ProductCardProps) {
  const { addItem } = useCart()
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems()
  const [isFavorite, setIsFavorite] = useState(isSaved(_id))

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({ id: _id, title, price, image, quantity: 1 })
    toast.success("Added to cart")
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isFavorite) {
      removeSavedItem(_id)
      toast.success("Removed from wishlist")
    } else {
      addSavedItem({ id: _id, title, price, image })
      toast.success("Added to wishlist")
    }
    setIsFavorite(!isFavorite)
  }

  return (
    <Link
      href={`/product/${_id}`}
      className="group relative block overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg"
    >
      <div className="aspect-square w-full overflow-hidden">
        <Image
          src={urlFor(image).url() || "/placeholder.svg"}
          alt={title}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {isNew && <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">New</div>}
        {isSale && <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Sale</div>}
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        <p className="mt-1 text-lg font-semibold text-gray-900">${price.toFixed(2)}</p>
      </div>
      <button
        onClick={handleAddToCart}
        className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-100"
        aria-label="Add to cart"
      >
        <ShoppingCart className="w-5 h-5 text-gray-600" />
      </button>
      <button
        onClick={handleToggleFavorite}
        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-100"
        aria-label="Add to wishlist"
      >
        <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"}`} />
      </button>
    </Link>
  )
}

