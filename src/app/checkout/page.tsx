'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
 
export default function Checkout() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  })

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 50 
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    clearCart()
    router.push('/order-completed')
  }

  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                {/* <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label> */}
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
                />
              </div>
              <div>
                {/* <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label> */}
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
                />
              </div>
            </div>
            <div>
              {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label> */}
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
              />
            </div>
            <div>
              {/* <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label> */}
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                {/* <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label> */}
                <input
                  type="text"
                  id="city"
                  name="city"
                placeholder="Enter your City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
                />
              </div>
              <div>
                {/* <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label> */}
                <input
                  type="text"
                  id="country"
                  name="country"
                placeholder="Enter your Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
                />
              </div>
            </div>
            <div>
              {/* <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label> */}
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="Enter your Zip / Postal Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
              />
            </div>
            <Button type="submit" className="w-full bg-[#007580] text-white py-3 rounded-md hover:bg-[#25595e] transition-colors">
              Place Order
            </Button>
          </form>

          <div>
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.title} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold mt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
