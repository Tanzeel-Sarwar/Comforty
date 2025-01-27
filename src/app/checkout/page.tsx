"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "@/components/PaymentForm"
import Layout from "@/components/Layout"
import { useAuth, RedirectToSignIn } from "@clerk/nextjs"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const { items, getCartTotal } = useCart()
  const shipping = 10 // You can adjust this or make it dynamic
  const subtotal = getCartTotal()
  const total = subtotal + shipping

  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="order-1 md:order-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="order-2 md:order-2">
          <Elements stripe={stripePromise}>
            <PaymentForm subtotal={subtotal} shipping={shipping} total={total} />
          </Elements>
        </div>
      </div>
    </Layout>
  )
}

