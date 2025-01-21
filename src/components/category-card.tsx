import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
  title: string
  productCount: string
  image: string
  href: string
}

export default function CategoryCard({ title, productCount, image, href }: CategoryCardProps) {
  return (
    <Link 
      href={href}
      className="group block relative overflow-hidden rounded-lg"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-white text-xl font-semibold mb-1">{title}</h3>
        <p className="text-white/80 text-sm">{productCount}</p>
      </div>
    </Link>
  )
}

