"use client"

import { useState, useEffect } from "react"
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}


interface PaymentFormProps {
  subtotal: number
  shipping: number
  total: number
}

export default function PaymentForm({ subtotal, shipping, total }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [cardholderName, setCardholderName] = useState("")
  const [country, setCountry] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const router = useRouter()
  const { clearCart, items } = useCart()

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total * 100, items }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [total, items])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setProcessing(true)
    setError(null)

    const cardNumber = elements.getElement(CardNumberElement)

    if (!cardNumber) {
      setProcessing(false)
      setError("Card element not found")
      return
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
        billing_details: {
          name: cardholderName,
          address: {
            country: country,
          },
        },
      },
    })

    if (error) {
      setError(error.message || "An error occurred")
      setProcessing(false)
      toast.error("Payment failed. Please try again.")
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("PaymentIntent:", paymentIntent)
      setProcessing(false)
      clearCart()
      toast.success("Payment successful!")
      router.push("/order-completed")
    }
  }


return (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>Payment Details</CardTitle>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardholderName">Cardholder Name</Label>
          <Input
            id="cardholderName"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Card Number</Label>
          <div className="border rounded-md p-3">
            <CardNumberElement options={cardStyle} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Expiry Date</Label>
            <div className="border rounded-md p-3">
              <CardExpiryElement options={cardStyle} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>CVC</Label>
            <div className="border rounded-md p-3">
              <CardCvcElement options={cardStyle} />
            </div>
          </div>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <Button type="submit" disabled={!stripe || processing} className="w-full">
          {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
        </Button>
      </form>
    </CardContent>
  </Card>
)
}

