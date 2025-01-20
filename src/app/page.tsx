import Layout from '@/components/Layout'
import FeaturedProducts from '@/components/featured-products'
import TopCategories from '@/components/Top-Categories'
import CategoryPanel from '@/components/Category-panel'
import BrandSection from '@/components/BrandSection'
import HeroSection from '@/components/HeroSection'
import HomeProducts from '@/components/HomeProducts'

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection/>

      {/* Brands / Company Section */}
      <BrandSection/>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Top Categories */}
      <TopCategories />

      {/* CategoryPanel */}
      <CategoryPanel />

      {/* Our Products */}
      <HomeProducts/>

    </Layout>
  )
}

