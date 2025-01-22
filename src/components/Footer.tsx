'use client'
import Link from 'next/link'
import Image from 'next/image'
import toast from "react-hot-toast";
import { useCart } from '@/contexts/cart-context'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {

    const { items } = useCart()


    return (
        <div className="w-full flex flex-col mx-auto max-w-full">
            <footer className="bg-white border-t">
                <div className="container mx-auto px-6 lg:px-16 py-7 pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:gap-24 md:gap-16">
                        <div>
                            <Link href="/" className="flex items-center">
                                <div className="text-teal-500">
                                    <Image src="/images/Logo Icon.png" alt="Comforty Logo" width={32} height={32} />
                                </div>
                                <span className="ml-2 text-xl font-bold">Comforty</span>
                            </Link>
                            <p className="mt-4 lg:text-base text-sm text-gray-600">
                                Vivamus tristique odio sit amet velit semper, eu posuere turpis interdum.
                            </p>

                            {/* Social Media Icons */}
                            <div className="flex items-center justify-center lg:gap-4 gap-1 mt-8">
                                <Link
                                    href="#"
                                    className="p-2 rounded-full border-2 border-[#007580] text-[#007580] hover:bg-[#007580] hover:text-white transition-colors"
                                >
                                    <Facebook className="h-5 w-5" />
                                    <span className="sr-only">Facebook</span>
                                </Link>
                                <Link
                                    href="https://www.facebook.com/"
                                    className="p-2 rounded-full hover:border-2 border-gray-400 hover:border-white hover:text-white hover:bg-[#007580] text-gray-500 transition-colors"
                                >
                                    <Twitter className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </Link>
                                <Link
                                    href="https://www.instagram.com/"
                                    className="p-2 rounded-full hover:border-2 border-gray-400 hover:border-white hover:text-white hover:bg-[#007580] text-gray-500 transition-colors"
                                >
                                    <Instagram className="h-5 w-5" />
                                    <span className="sr-only">Instagram</span>
                                </Link>
                                <Link
                                    href="https://www.youtube.com/"
                                    className="p-2 rounded-full hover:border-2 border-gray-400 hover:border-white hover:text-white hover:bg-[#007580] text-gray-500 transition-colors"
                                >
                                    <Youtube className="h-5 w-5" />
                                    <span className="sr-only">YouTube</span>
                                </Link>
                            </div>
                        </div>

                        <div className="lg:mt-0 md:mt-0 mt-8">
                            <h3 className="tracking-wider uppercase font-medium mb-4">Category</h3>
                            <ul className="space-y-2 lg:text-base text-sm">
                                <li>
                                    <Link href="/products" className="text-gray-600 hover:text-[#007580] transition-colors relative inline-block hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#007580] after:transition-all">
                                        Sofa
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="text-gray-600 hover:text-[#007580] transition-colors relative inline-block hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#007580] after:transition-all">
                                        Armchair
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="text-gray-600 hover:text-[#007580] transition-colors relative inline-block hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#007580] after:transition-all">
                                        Wing Chair
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="text-gray-600 hover:text-[#007580] transition-colors relative inline-block hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#007580] after:transition-all">
                                        Desk Chair
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="text-gray-600 hover:text-[#007580] transition-colors relative inline-block hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#007580] after:transition-all">
                                        wooden Chair
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="text-gray-600 hover:text-[#007580] transition-colors relative inline-block hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#007580] after:transition-all">
                                        Park Bench
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className='lg:mt-0 md:mt-0 mt-7'>
                            <h3 className="tracking-wider uppercase font-medium mb-4">Support</h3>
                            <ul className="space-y-2 lg:text-base text-sm">
                                <li>
                                    <Link href="/contact" className="text-gray-600 hover:text-[#007580] transition-colors relative inline-block hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#007580] after:transition-all">
                                        Help & Support
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-600 hover:text-[#007580] transition-colors relative inline-block hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#007580] after:transition-all">
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-600 hover:text-[#007580] transition-colors relative inline-block hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#007580] after:transition-all">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-600 hover:text-[#007580] transition-colors relative inline-block hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#007580] after:transition-all">
                                        Help
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className='lg:mt-0 md:mt-0 mt-7'>
                            <h3 className="tracking-wider uppercase font-medium mb-4">Newsletter</h3>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    const email = (e.target as HTMLFormElement).email.value
                                    if (email) {
                                        toast.success("Thank You for Subscribing to our Newsletter!")
                                            ; (e.target as HTMLFormElement).reset()
                                    }
                                }}
                                className="mt-4">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="mt-2 w-full bg-[#007580] text-white px-4 py-2 rounded-md hover:bg-[#18464b] transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 mt-6 pt-8 border-t text-gray-600">
                        <div className="lg:text-base md:text-[15px] text-sm">
                            <p>&copy; {new Date().getFullYear()} - Designed & Developed by Tanzeel Sarwar</p>
                        </div>

                        <div>
                            <Image
                                src="/images/Footer_Logo.png"
                                alt="Footer_Logo"
                                width={200}
                                height={200}
                                className="float-right lg:mb-0 md:mb-0 -mb-2" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

