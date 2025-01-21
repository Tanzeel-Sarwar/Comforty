'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { createClient } from '@sanity/client';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import ProductCard from '@/components/Product-Card';
import { useCart } from '@/contexts/cart-context';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import NewsLetter from '@/components/NewsLetter';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-18',
  useCdn: true,
});

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

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 8;
  // const { addItem } = useCart();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const start = (currentPage - 1) * productsPerPage;

        const queryCount = category
          ? `count(*[_type == "products" && references(*[_type=="categories" && title=="${category}"]._id)])`
          : `count(*[_type == "products"])`;

        const query = category
          ? `*[_type == "products" && references(*[_type=="categories" && title=="${category}"]._id)] | order(_createdAt desc) [${start}...${start + productsPerPage}]{
              _id, 
              title, 
              "slug": slug.current, 
              price, 
              "imageUrl": image.asset->url, 
              description, 
              tags, 
              isNew, 
              isSale
            }`
          : `*[_type == "products"] | order(_createdAt desc) [${start}...${start + productsPerPage}]{
              _id, 
              title, 
              "slug": slug.current, 
              price, 
              "imageUrl": image.asset->url, 
              description, 
              tags, 
              isNew, 
              isSale
            }`;

        const [data, total] = await Promise.all([
          client.fetch(query),
          client.fetch(queryCount),
        ]);

        setProducts(data);
        setTotalPages(Math.ceil(total / productsPerPage));
      } catch (err: any) {
        console.error('Error Fetching Products:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="container mx-auto px-5 py-[50px]">
      <h1 className="text-2xl font-semibold mb-8">{category ? `Products in "${category}"` : 'All Products'}</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: productsPerPage }).map((_, index) => (
                <div key={index} className="animate-pulse space-y-4 rounded-lg bg-gray-100 p-4">
                  <div className="aspect-square bg-gray-300 rounded-md" />
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-6 bg-gray-300 rounded w-1/2" />
                </div>
              ))
            : products.map((product) => (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  title={product.title}
                  price={product.price}
                  image={product.imageUrl}
                  isNew={product.isNew}
                  isSale={product.isSale}
                />
              ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
          }`}
        >
          <ArrowLeft />
        </button>

        {/* Numbered Pagination */}
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
          }`}
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
};

export default function ProductCards() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
        <NewsLetter />
      </div>
    </Layout>
  );
}
