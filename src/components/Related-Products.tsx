'use client'

import { useEffect, useState } from 'react';
import { client } from '@/sanity/client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';
import { ShoppingCart } from 'lucide-react';

interface Product {
    _id: string;
    title: string;
    slug: string;
    price: number;
    imageUrl: string;
    description: string;
    tags: string[];
    isNew?: boolean;
    isSale?: boolean;
  }

const RelatedProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const query = `*[_type == "products" && "featured" in tags] {
                _id,
                title,
                price,
                priceWithoutDiscount,
                isNew,
                isSale,
                "imageUrl": image.asset->url,
                slug
            }`;
            const data = await client.fetch(query);
            setProducts(data.slice(0, 4));
            setLoading(false);
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: any) => {
        addItem({
            id: product._id,
            title: product.title,
            price: product.price,
            image: product.imageUrl,
            quantity: 1,
        });
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8">Related Products</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading
                        ? Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="animate-pulse p-4 border rounded">
                                <div className="bg-gray-300 h-48 mb-4"></div>
                                <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
                                <div className="bg-gray-300 h-4 w-1/2"></div>
                            </div>
                        ))
                        : products.map((product) => (
                            <div key={product._id} className="group relative block overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg">
                                <Link href={`/product/${product._id}`} className="block">
                                    <div className="aspect-square w-full overflow-hidden">
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.title}
                                            width={500}
                                            height={500}
                                            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {product.isNew && (
                                            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                                New
                                            </div>
                                        )}
                                        {product.isSale && (
                                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                Sale
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 bg-white">
                                        <h3 className="text-sm font-medium text-gray-900 truncate">{product.title}</h3>
                                        <p className="mt-1 text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                                    </div>
                                </Link>

                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-100"
                                    aria-label="Add to cart"
                                >
                                    <ShoppingCart className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
