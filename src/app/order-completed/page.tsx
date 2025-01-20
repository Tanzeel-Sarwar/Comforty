'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { CheckCircle } from 'lucide-react'

export default function OrderCompleted() {
  const router = useRouter()
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear the cart when the order is completed
    clearCart()
  }, [clearCart])

  return (
    <Layout>
      <div className="container mx-auto py-16 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Order Completed!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <p className="text-gray-600 mb-8">
          You will receive an email confirmation shortly with your order details.
        </p>
        <Button
          onClick={() => router.push('/')}
          className="bg-[#007580] text-white py-3 px-6 rounded-md hover:bg-[#25595e] transition-colors"
        >
          Continue Shopping
        </Button>
      </div>
    </Layout>
  )
}

