import Image from 'next/image'
import Layout from '@/components/Layout'

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div className="bg-[#007580] p-8 py-16 rounded-lg text-white">
            <h1 className="text-3xl font-bold mb-4">About Us - Comforty</h1>
            <p className="mb-6">
              At Comforty, we believe that the right seat can transform any space. Our commitment to excellence is reflected in
              ergonomic design, premium materials, and modern aesthetics. Every chair we create seamlessly blends style
              with functionality.
            </p>
            <button className="bg-teal-800/100 text-white px-6 py-2 mt-16  hover:bg-teal-900 transition-colors">
              View Collection
            </button>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/images/Image Block.png"
              alt="Featured Chair"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-12">What Makes Our Brand Different</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-[#007580]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Next day as standard</h3>
              <p className="text-gray-600">Order before 3pm and get your order the next day as standard</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-[#007580]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Made by true artisans</h3>
              <p className="text-gray-600">Handmade crafted goods made with real passion and craftmanship</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-[#007580]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Unbeatable prices</h3>
              <p className="text-gray-600">For our materials and quality you won&apos;t find better prices anywhere</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-[#007580]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Recycled packaging</h3>
              <p className="text-gray-600">We use 100% recycled packaging to ensure our footprint is manageable</p>
            </div>
          </div>
        </div>

        {/* Popular Products Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Our Popular Products</h2>
          <div className="grid md:grid-cols-2  gap-2">
            <div>
              <div className="relative h-[350px] mb-4">
                <Image
                  src="/images/Large.png"
                  alt="The Popular suede sofa"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="font-medium">The Popular suede sofa</h3>
              <p className="text-gray-600">$199.00</p>
            </div>

            <div className='grid md:grid-cols-2 gap-2'>
              <div >
                <div className="relative h-[350px] mb-4">
                  <Image
                    src="/images/Productcard.png"
                    alt="The Dandy chair"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium">The Dandy chair</h3>
                <p className="text-gray-600">$99.00</p>
              </div>
              <div >
                <div className="relative h-[350px] mb-4">
                  <Image
                    src="/images/Productcard1.png"
                    alt="The Dandy chair"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium">The Dandy chair</h3>
                <p className="text-gray-600">$99.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

