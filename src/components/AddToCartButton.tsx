'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'

interface Product {
  _id: string
  title: string
  price: number
  imageUrl: string
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.imageUrl,
      quantity: quantity
    })
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <span className="font-medium">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <button onClick={decrementQuantity} className="p-2 hover:bg-gray-100">
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 border-x">{quantity}</span>
          <button onClick={incrementQuantity} className="p-2 hover:bg-gray-100">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full md:w-auto py-3 px-8 transition-all duration-300 hover:scale-105 bg-[#007580] text-white rounded-md flex items-center justify-center"
      >
        <ShoppingCart className="mr-2" />
        Add To Cart
      </button>
    </div>
  )
}

