'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import WishlistButton from "@/components/WishlistButton"
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
      <div className="flex items-center gap-4 lg:mb-6 md:mb-5 mb-4">
        <span className="font-medium lg:text-base md:text-[15px] text-sm">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <button onClick={decrementQuantity} className="lg:p-2 md:p-1.5 p-1 hover:bg-gray-100">
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 lg:py-2 md:py-1 py-1 border-x">{quantity}</span>
          <button onClick={incrementQuantity} className="lg:p-2 md:p-1.5 p-1 hover:bg-gray-100">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className='lg:flex'>
        <button
          onClick={handleAddToCart}
          className="w-full md:w-auto lg:py-3 md:py-3 py-2 lg:px-8 md:px-7 px:5  transition-all duration-300 hover:scale-105 bg-[#007580] text-white rounded-md flex items-center justify-center"
        >
          <ShoppingCart className="mr-2" />
          Add To Cart
        </button>
        <div className='lg:ml-2 lg:mt-0 md:mt-2 mt-2 lg:justify-self-start md:justify-self-start justify-self-center'>
        <WishlistButton product={product} />

        </div>
      </div>
    </div>
  )
}

