import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
})

export async function POST(req: Request) {
  const { amount } = await req.json()

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Payment",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/payments/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/payments/cancel`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error("Error creating checkout session:", err)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}

