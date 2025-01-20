'use client'

// import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'

declare global {
  interface Window {
    Snipcart: any;
  }}

export default function Checkout() {
  const router = useRouter()
  const { items, clearCart } = useCart()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10 // Fixed shipping cost
  const total = subtotal + shipping

  const handlePlaceOrder = () => {
    // Add items to Snipcart
    items.forEach(item => {
      window.Snipcart.api.cart.items.add({
        id: item.id,
        name: item.title,
        price: item.price,
        url: `/products/productDetail?heading=${item.title}&price=${item.price}&src=${item.image}`,
        description: item.title,
        image: item.image,
        quantity: item.quantity
      });
    });

    // Clear the local cart and redirect
    clearCart()
    router.push('/order-completed')
  }

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4 max-w-md">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-4 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-[#007580] hover:bg-[#006570] text-white py-3"
          >
            Place Order
          </Button>
        </div>
      </div>
    </Layout>
  )
}

