import { Suspense } from "react"
import Image from "next/image"
import Layout from "@/components/Layout"
import AddToCartButton from "@/components/AddToCartButton"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import RelatedProducts from "@/components/Related-Products"
import ProductReviews from "@/components/Products-Review"

type PageProps = {
  params: Promise<{ id: string }>
}

async function getProduct(id: string) {
  return client.fetch(
    `*[_type == "products" && _id == $id][0]{
    _id,
    title,
    price,
    description,
    "imageUrl": image.asset->url,
    isNew,
    isSale
  }`,
    { id },
  )
}

async function getReviews(id: string) {
  // This is a placeholder. In a real application, you would fetch reviews from your database
  return [
    { id: "1", rating: 4, comment: "Great product!", userName: "John Doe" },
    { id: "2", rating: 5, comment: "Excellent quality and fast shipping.", userName: "Jane Smith" },
  ]
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative aspect-square bg-gray-200 rounded-lg animate-pulse" />
        <div className="flex flex-col justify-center space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

async function ProductDetail({ id }: { id: string }) {
  const product = await getProduct(id)
  const reviews = await getReviews(id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={urlFor(product.imageUrl).url() || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">New</div>
          )}
          {product.isSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Sale</div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#272343]">{product.title}</h1>
          <div className="inline-block bg-[#007580] text-white px-4 py-2 rounded-full text-sm mb-6">
            ${product.price.toFixed(2)} USD
          </div>
          <p className="text-gray-600 mb-8">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  )
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  return (
    <Layout>

      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail id={id} />
        <RelatedProducts />
        <ProductReviews productId={id} />
      </Suspense>
    </Layout>
  )
}

