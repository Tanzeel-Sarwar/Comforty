'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, ShoppingCart, X, HelpCircle, ChevronDown } from 'lucide-react'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/contexts/cart-context'
import Image from 'next/image'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col mx-auto max-w-[1920px]">
      {/* Top banner */}
      <div className="bg-[#2D2B3A] text-white text-sm py-2.5">
        <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">
          <p className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Free Shipping On All Orders Over $50
          </p>
          <div className="flex items-center gap-4 text-white/80">
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-white">
                Eng
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded-md shadow-lg hidden group-hover:block">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">English</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Español</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Français</a>
              </div>
            </div>
            <Link href="/faqs" className="hover:text-white">Faqs</Link>
            <Link href="/contact" className="flex items-center gap-1 hover:text-white">
              <HelpCircle className="w-4 h-4" />
              Need Help
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white  top-0 z-40 border-b">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex md:flex-row items-start md:items-center justify-between py-4">
            <div className="flex flex-col items-start">
              <Link href="/" className="flex items-center">
                <div>
                  <Image src="/images/Logo Icon.png" alt="Comforty Logo" width={32} height={32} />
                </div>
                <span className="ml-2 text-xl font-bold">Comforty</span>
              </Link>
            </div>

            <div className=" flex items-center md:mt-0">
              <Link href="/cart" className="flex items-center bg-[#007580] text-white md:px-4 px-1.5 py-2 rounded-md hover:bg-[#1d5e64] transition-colors">
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span className="mr-2">Cart</span>
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
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}>
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center">
                <div className="text-teal-500">
                  <Image src="/images/Logo Icon.png" alt="Comforty Logo" width={32} height={32} />
                </div>
                <span className="ml-2 text-xl font-bold">Comforty</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className=" text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="text-xl text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/products" className="text-xl text-gray-600 hover:text-gray-900">Shop</Link>
              <Link href="/products" className="text-xl text-gray-600 hover:text-gray-900">Product</Link>
              <Link href="/" className="text-xl text-gray-600 hover:text-gray-900">Pages</Link>
              <Link href="/about" className="text-xl text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-xl text-gray-600 hover:text-gray-900">Contact</Link>
            </nav>
            <div className="mt-8">
              <Link href="/cart" className="flex items-center justify-center bg-[#007580] text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors">
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span className="mr-2">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="bg-white text-[#007580] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
            <Link href="/contact" className='lg:ml-[35rem] hover:text-teal-700'>
              Contact: <span className="font-medium">(808) 555-0111</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container  mx-auto px-6 lg:px-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] py-10">
          {children}
        </div>
      </main>
    </div>
  )
}

