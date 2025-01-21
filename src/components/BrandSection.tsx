import Image from 'next/image'

const brands = [
    { name: "Zapier", logo: "/images/Logo.png" },
    { name: "Pipedrive", logo: "/images/Logo-1.png" },
    { name: "CIB Bank", logo: "/images/Logo-2.png" },
    { name: "Company", logo: "/images/Logo-3.png" },
    { name: "Burnt Toast", logo: "/images/Logo-4.png" },
    { name: "PandaDoc", logo: "/images/Logo-5.png" },
    { name: "Moz", logo: "/images/Logo-6.png" }
]

export default function BrandSection() {
    return (

        <section className="py-12 border-b">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center items-center gap-16 md:gap-16">
                    {brands.map((brand, index) => (
                        <div key={index} className="grayscale hover:grayscale-0 transition-all">
                            <Image
                                src={brand.logo}
                                alt={brand.name}
                                width={120}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}