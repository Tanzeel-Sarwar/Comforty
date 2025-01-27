"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import ShippingForm from "@/components/ShippingForm"
import PaymentForm from "@/components/PaymentSection"
import { useCart } from "@/contexts/cart-context"
import Layout from "@/components/Layout"

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

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment">("shipping")
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null)
  const router = useRouter()
  const { clearCart } = useCart()

  const handleShippingSubmit = (data: ShippingInfo) => {
    setShippingInfo(data)
    setStep("payment")
  }

  const handlePaymentSuccess = () => {
    clearCart() // Clear the cart
    // Clear the shipping info from localStorage
    localStorage.removeItem("shippingInfo")
    // Redirect to order confirmation
    router.push("/order-completed")
  }

  return (
    <Layout>
    <div className="max-w-2xl mx-auto">
      {step === "shipping" && <ShippingForm onSubmit={handleShippingSubmit} />}
      {step === "payment" && shippingInfo && (
        <Elements stripe={stripePromise}>
          <PaymentForm shippingInfo={shippingInfo} onPaymentSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </div>
    </Layout>
  )
}

