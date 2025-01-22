'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, ShoppingCart, X, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/contexts/cart-context'
import Image from 'next/image'
import { useSavedItems } from '@/contexts/saved-items-context'
import TopBanner from './TopBanner'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const { savedItems } = useSavedItems()
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-full">
      {/* Top banner */}
      <TopBanner />

      {/* Header */}
      <header className="bg-white sticky top-0 z-40 border-b">
        <div className="container relative mx-auto px-6 lg:px-16">
          <div className="bg-[#F0F2F3] flex md:flex-row items-start md:items-center justify-between py-4">
            <div className="flex flex-col items-start">
              <Link href="/" className="flex items-center">
                <div>
                  <Image src="/images/Logo Icon.png" alt="Comforty Logo" width={32} height={32} />
                </div>
                <span className="ml-2 text-xl font-bold">Comforty</span>
              </Link>
            </div>

            <div className=" flex items-center md:mt-0">
              <Link
                href="/saved-items"
                className="flex items-center mr-2 bg-gray-100 text-gray-700 lg:px-3 px-2 lg:py-2 py-2 rounded-md hover:bg-[#ff2e2e] transition-colors"
              >
                <Heart className="w-5 h-5 " />
                {savedItems.length > 0 && (
                  <span className="bg-[#1d5e64] text-white text-xs ml-2 font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {savedItems.length}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="flex items-center bg-[#007580] text-white md:px-4 px-1.5 py-2 rounded-md hover:bg-[#1d5e64] transition-colors">
                <ShoppingCart className="w-5 h-5 lg:mr-2 md:mr-2 mr-1" />
                <span className="mr-2 hidden sm:inline">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="bg-white text-[#007580] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <button
                className="ml-4 md:hidden text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 py-4">
            <Link href="/" className="text-[#007580] font-semibold hover:text-gray-900 transition-colors text-sm">Home</Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Shop</Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Product</Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Pages</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Contact</Link>

            <div className="text-sm">
              <Link href="/contact" className=' hover:text-teal-700'>
                Contact: <span className=" text-right font-medium ">(+92) 123-456-789</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Bar*/}
        <div
          className={cn(
            "fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col h-full">
            <div className="px-4 py-4 border-b">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center">
                  <Image src="/images/Logo Icon.png" alt="Comforty Logo" width={32} height={32} />
                  <span className="ml-2 text-xl font-bold">Comforty</span>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 px-4 py-6 overflow-y-auto">
              <nav className="flex flex-col space-y-6">
                <Link href="/" className="text-lg text-gray-600 hover:text-gray-900">
                  Home
                </Link>
                <Link href="/products" className="text-lg text-gray-600 hover:text-gray-900">
                  Shop
                </Link>
                <Link href="/products" className="text-lg text-gray-600 hover:text-gray-900">
                  Products
                </Link>
                <Link href="/about" className="text-lg text-gray-600 hover:text-gray-900">
                  About
                </Link>
                <Link href="/contact" className="text-lg text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </nav>
            </div>

            <div className="px-4 py-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/saved-items"
                  className="flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Wishlist
                  {savedItems.length > 0 && (
                    <span className="ml-1 bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {savedItems.length}
                    </span>
                  )}
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center justify-center bg-[#007580] text-white px-4 py-2 rounded-md hover:bg-[#006570] transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 bg-white text-[#007580] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header >

      <main className="flex-grow">
        <div className="container mx-auto px-6 lg:px-16 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div >
  )
}

