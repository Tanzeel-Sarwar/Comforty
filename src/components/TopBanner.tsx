import React from 'react'
import Link from 'next/link'
import { Check, ChevronDown, HelpCircle } from 'lucide-react'

const TopBanner = () => {
  return (
    <div className="bg-[#2D2B3A] text-white text-sm py-2.5">
      <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">
        <p className="flex items-center gap-2">
          <Check className="w-4 h-4" />
          Free Shipping On All Orders Over $50
        </p>
        <div className="flex items-center gap-4 text-white/80">
          <button className="flex items-center gap-1 hover:text-white">
            Eng
            <ChevronDown className="w-4 h-4" />
          </button>
          <Link href="/faqs" className="hover:text-white">Faqs</Link>
          <Link href="/help" className="flex items-center gap-1 hover:text-white">
            <HelpCircle className="w-4 h-4" />
            Need Help
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopBanner

