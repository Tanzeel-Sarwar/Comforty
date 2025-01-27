"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "@/components/PaymentSection"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type ShippingInfo = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}

export default function PaymentPage() {
  const router = useRouter()
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)

  useEffect(() => {
    const info = localStorage.getItem("shippingInfo")
    if (!info) {
      router.push("/checkout/shipping")
    } else {
      setShippingInfo(JSON.parse(info))
    }
  }, [router])

  const handlePaymentSuccess = () => {
    // Clear the shipping info from localStorage
    localStorage.removeItem("shippingInfo")
    // Redirect to order confirmation
    router.push("/checkout/confirmation")
  }

  if (!shippingInfo) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Elements stripe={stripePromise}>
            <PaymentForm onPaymentSuccess={handlePaymentSuccess} shippingInfo={shippingInfo} />
          </Elements>
        </div>
      </div>
    </div>
  )
}

