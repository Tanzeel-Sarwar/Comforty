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
    clearCart()
  }, [clearCart])

  return (
    <Layout>
      <div className="container mx-auto py-16 text-center">
        <CheckCircle className="lg:w-16 md:w-16 w-14 lg:h-16 md:h-16 h-14 text-green-500 mx-auto mb-6" />
        <h1 className="lg:text-3xl md:text-3xl text-2xl font-bold mb-4">Order Completed!</h1>
        <p className="lg:text-xl md:text-xl sm:text-lg text-base text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully placed.
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

