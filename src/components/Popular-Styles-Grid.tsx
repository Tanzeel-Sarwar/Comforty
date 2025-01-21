import Image from 'next/image'

interface StyleImage {
  src: string
  alt: string
  className?: string
}

export default function PopularStylesGrid() {
  const images: StyleImage[] = [
    {
      src: "/placeholder.svg",
      alt: "Orange modern chair",
      className: "col-span-2 row-span-2"
    },
    {
      src: "/placeholder.svg",
      alt: "White classic chair",
    },
    {
      src: "/placeholder.svg",
      alt: "Modern chair design",
    },
    {
      src: "/placeholder.svg",
      alt: "Gray comfortable chair",
    },
    {
      src: "/placeholder.svg",
      alt: "Minimalist chair",
    }
  ]

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-medium tracking-wider text-gray-500">
        EXPLORE NEW AND POPULAR STYLES
      </div>
      <div className="grid grid-cols-4 gap-4 pl-12">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg ${image.className || ''}`}
          >
            <div className="group aspect-square w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

