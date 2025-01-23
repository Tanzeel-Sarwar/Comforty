import Layout from '@/components/Layout'
import ProductCard from '@/components/Product-Card'

interface Product {
  id: string
  title: string
  price: number
  image: string
  isNew?: boolean
  isSale?: boolean
}

type PageProps = {
  params: Promise<{ slug: string }>
}

async function getProductsByCategory(category: string): Promise<Product[]> {
  const dummyProducts: Product[] = [
    {
      id: "1",
      title: "Library Stool Chair",
      price: 20,
      image: "/images/Library-Stool-Chair.png",
      isNew: true
    },
    {
      id: "2",
      title: "Modern Desk Chair",
      price: 25,
      image: "/images/Library-Stool-Chair 1.png",
      isSale: true
    },
    {
      id: "3",
      title: "Comfortable Armchair",
      price: 30,
      image: "/images/Library-Stool-Chair 3.png"
    },
    {
      id: "4",
      title: "Ergonomic Office Chair",
      price: 35,
      image: "/images/Library-Stool-Chair 4.png"
    },
    // Add more categories for demonstration
    {
      id: "5",
      title: "Modern Desk",
      price: 40,
      image: "/images/Modern-Desk.png",
      isSale: true
    },
    {
      id: "6",
      title: "Sleek Office Desk",
      price: 45,
      image: "/images/Sleek-Office-Desk.png",
    }
  ]
  
  // Simulate filtering products by category
  if (category === 'chairs') {
    return dummyProducts.filter(p => p.title.toLowerCase().includes('chair'))
  } else if (category === 'desks') {
    return dummyProducts.filter(p => p.title.toLowerCase().includes('desk'))
  }

  // If no category matches, return all products
  return dummyProducts
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const products = await getProductsByCategory(slug)

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 capitalize">{slug.replace('-', ' ')} Category</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard _id={''} priceWithoutDiscount={0} key={product.id} {...product} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
