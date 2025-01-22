'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/sanity/client";

// Define the types for the InstagramPost
interface InstagramPost {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  badge: string;
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  category: {
    title: string;
  };
  description: string;
  inventory: number;
  tags: string[];
}

// Fetch Instagram posts from Sanity
const fetchInstagramPosts = async (): Promise<InstagramPost[]> => {
  const query = `*[_type == "products" && "instagram" in tags]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    image {
      asset -> {
        _id,
        url
      }
    },
    category -> {
      title
    },
    description,
    inventory,
    tags
  }`;

  const posts = await client.fetch(query);
  return posts;
};

// Skeleton Loader for the Instagram Feed
const SkeletonLoader = () => (
  <div className="relative aspect-square overflow-hidden bg-gray-200 animate-pulse">
    <div className="w-full h-full bg-gray-300"></div>
    <div className="absolute inset-0 bg-black/20"></div>
  </div>
);

const InstagramFeed = () => {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const getInstagramPosts = async () => {
      const posts = await fetchInstagramPosts();
      setInstagramPosts(posts.slice(0, 6)); // Limit to 6 products
      setLoading(false); // Set loading to false when data is fetched
    };
    getInstagramPosts();
  }, []);

  return (
    <div className="container mx-auto px-5 lg:h-[250px] md:h-auto h-auto bg-[rgb(30,40,50,0.105)]">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-4 sm:mb-6 md:mb-8">
        Follow Products And Discounts On Instagram
      </h2>
      <div className="self-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {loading
            ? // Show skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
            : // Show real content after data is loaded
            instagramPosts.map((post, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden group cursor-pointer"
              >
                <Image
                  src={post.image.asset.url}
                  alt={post.title} // Using title as alt text
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramFeed;
