import Image from 'next/image'

export default function CategoryPanel() {
    return (
    <section className="container mx-auto px-4 py-14">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-50 overflow-hidden group">
    <div className="absolute left-0 top-0 bottom-0 w-8 bg-white z-10 flex items-center justify-center">
      <h2 className="text-lg font-semibold uppercase tracking-widest text-gray-600 whitespace-nowrap transform -rotate-90">
        Explore New and Popular Styles
      </h2>
    </div>
    <Image
      src="/images/item-category 1.png"
      alt="Orange modern armchair"
      className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 object-left"
      width={600}
      height={500}
      priority
    />
  </div>
  <div className="grid grid-cols-2 gap-4">
    <div className="relative h-[140px] sm:h-[190px] lg:h-[240px] bg-gray-50 overflow-hidden group">
      <Image
        src="/images/card.png"
        alt="White upholstered chair"
        className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 object-right"
        width={280}
        height={240}
      />
    </div>
    <div className="relative h-[140px] sm:h-[190px] lg:h-[240px] bg-gray-50 overflow-hidden group">
      <Image
        src="/images/card 1.png"
        alt="White wooden chair view 1"
        className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 object-right"
        width={280}
        height={240}
      />
    </div>
    <div className="relative h-[140px] sm:h-[190px] lg:h-[240px] bg-gray-50 overflow-hidden group">
      <Image
        src="/images/card 2.png"
        alt="Gray upholstered dining chair"
        className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 object-right"
        width={280}
        height={240}
      />
    </div>
    <div className="relative h-[140px] sm:h-[190px] lg:h-[240px] bg-gray-50 overflow-hidden group">
      <Image
        src="/images/card 3.png"
        alt="White wooden chair view 2"
        className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 object-right"
        width={280}
        height={240}
      />
    </div>
  </div>
</div>
</section>
  )
}
