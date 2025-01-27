import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
})

export async function POST(request: Request) {
  const { amount, items } = await request.json()

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        items: JSON.stringify(
          items.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        ),
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    return NextResponse.json({ error: "Error creating payment intent" }, { status: 500 })
  }
}

