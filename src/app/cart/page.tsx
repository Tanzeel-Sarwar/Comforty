'use client'

import {useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { Heart, Trash2 } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import CheckoutProcess from '@/components/CheckoutProcess'


declare global {
  interface Window {
    Snipcart: any;
  }
}

export default function Cart() {
  const router = useRouter()
  const { items, clearCart, updateQuantity, removeItem } = useCart()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10
  const total = subtotal + shipping

  // const handleCheckout = () => {
  //   Add items to Snipcart
  //   items.forEach(item => {
  //     window.Snipcart.api.cart.items.add({
  //       id: item.id,
  //       name: item.title,
  //       price: item.price,
  //       url: `/product/${item.id}`,
  //       description: item.title,
  //       image: item.image,
  //       quantity: item.quantity
  //     });
  //   });

  //   clearCart()
  //   router.push('/order-completed')
  // }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Listen for Snipcart's order completion event
      document.addEventListener('snipcart.orderconfirmed', () => {
        clearCart();
        router.push('/order-completed');
      });
    }

    // Cleanup listener on component unmount
    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('snipcart.orderconfirmed', () => {});
      }
    };
  }, [clearCart, router]);

  return (
    <Layout>
      <div className="container mx-auto py-16 lg:px-5 md:px-4 ">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 lg:p-4 md:p-4 p-2 border rounded-lg">
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600 text-sm">Price: ${item.price.toFixed(2)}</p>
                    <div className="mt-4 flex items-center lg:gap-4 md:gap-4">
                      <div className=" flex items-center border rounded">
                        <button
                          className="lg:px-3 md:px-3 px-2 py-1 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                        <button
                          className="lg:px-3 md:px-3 px-2 py-1 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <CheckoutProcess/>
                {/* <Button
                  onClick={handleCheckout}
                  className="  w-full bg-[#007580] text-white lg:py-4 py:3 rounded-full hover:bg-[#25595e] transition-colors"
                >
                  Proceed to Checkout
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
