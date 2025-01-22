"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useSavedItems } from "@/contexts/saved-items-context";
import { urlFor } from "@/sanity/lib/image";
import toast from "react-hot-toast";

export interface ProductCardProps {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

export default function ProductCard({ _id, title, price, priceWithoutDiscount, image, isNew, isSale }: ProductCardProps) {
  const { addItem } = useCart();
  const { addSavedItem, removeSavedItem, isSaved } = useSavedItems();
  const [isFavorite, setIsFavorite] = useState(isSaved(_id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id: _id, title, price, image, quantity: 1 });
    toast.success("Added to cart");
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      removeSavedItem(_id);
      toast.success("Removed from wishlist");
    } else {
      addSavedItem({ id: _id, title, price, image });
      toast.success("Added to wishlist");
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      href={`/product/${_id}`}
      className="relative block overflow-hidden rounded-lg border bg-white transition-all duration-300 hover:shadow-lg"
    >
      <div className="aspect-square w-full overflow-hidden">
        <Image
          src={urlFor(image).url() || "/placeholder.svg"}
          alt={title}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />
        {isNew && <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">New</div>}
        {isSale && <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Sale</div>}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        <p className="mt-1 text-lg font-semibold text-gray-900">${price.toFixed(2)}</p>
        {priceWithoutDiscount && (
          <span className="text-sm text-gray-500 line-through">
            ${priceWithoutDiscount.toFixed(2)}
          </span>
        )}
      </div>
      <div className="absolute bottom-5 right-4 hidden sm:flex gap-2">

        {/* Wishlist Button */}
        <button
          onClick={handleToggleFavorite}
          className={`bg-gray-100 p-2 rounded-lg shadow transition-colors duration-200 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          aria-label="Add to wishlist"
        >
          <Heart
            className={`lg:w-5 lg:h-5 md:w-4 md:h-4 ${isFavorite ? "fill-red-500 text-red-500" : "hover:text-[#007580]"}`}
          />
        </button>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-gray-100 p-2 rounded-lg shadow hover:bg-[#007580] transition-colors duration-200"
          aria-label="Add to cart"
        >
          <ShoppingCart className="lg:w-5 lg:h-5 md:w-4 md:h-4 text-gray-600 hover:text-white" />
        </button>


      </div>
    </Link>
  );
}
