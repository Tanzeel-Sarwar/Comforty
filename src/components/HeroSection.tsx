import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
    return (
        <section className="bg-[#F3F3F3]">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[750px]">
                    <div className="md:ml-16 lg:ml-16 max-w-xl mt-10 lg:-mt-10">
                        <span className="font-inter text-sm tracking-wider text-gray-600 mb-4 block">
                            WELCOME TO CHAIRY
                        </span>
                        <h1 className="leading-normal text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2B3A] mb-8">
                            Best Furniture Collection For Your Interior.
                        </h1>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-[#007580] text-white px-6 py-3 rounded-md hover:bg-[#1d5e64] transition-colors group"
                        >
                            Shop Now
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="relative h-[400px] lg:h-[500px]">
                        <Image
                            src="/images/Hero-Product.png"
                            alt="Featured Chair"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
