"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import type { Review, ReviewFormData } from "../../types/reviews";

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState<ReviewFormData>({
    rating: 0,
    comment: "",
    userName: "",
  });

  useEffect(() => {
    const loadReviews = () => {
      setLoading(true);
      try {
        const savedReviews = localStorage.getItem(`reviews-${productId}`);
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews));
        } else {
          // Use mock reviews if no reviews are stored locally
          const mockReviews: Review[] = [
            {
              id: "1",
              rating: 5,
              comment: "Excellent product! The quality exceeded my expectations.",
              userName: "John Doe",
              createdAt: new Date(Date.now() - 86400000).toISOString(),
            },
            {
              id: "2",
              rating: 4,
              comment: "Great value for money, would recommend!",
              userName: "Jane Smith",
              createdAt: new Date(Date.now() - 172800000).toISOString(),
            },
          ];
          setReviews(mockReviews);
          localStorage.setItem(`reviews-${productId}`, JSON.stringify(mockReviews));
        }
      } catch (error) {
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [productId]);

  useEffect(() => {
    // Save reviews to localStorage whenever they change
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(reviews));
  }, [reviews, productId]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      const review: Review = {
        id: Date.now().toString(),
        ...newReview,
        createdAt: new Date().toISOString(),
      };

      setReviews((prev) => [review, ...prev]);
      setNewReview({ rating: 0, comment: "", userName: "" });
      toast.success("Review submitted successfully");
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  if (loading) {
    return <ReviewsSkeleton />;
  }

  return (
    <div className="mt-3">
      <hr />
      <div className="flex items-center justify-between mt-4 mb-8">
        <h2 className="lg:text-2xl md:text-2xl text-xl font-bold">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(averageRating)
                    ? "text-blue-500 fill-blue-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="lg:text-sm md:text-sm text-xs text-gray-600">
            {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
          </span>
        </div>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= newReview.rating
                        ? "text-blue-500 fill-blue-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="userName" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="userName"
              value={newReview.userName}
              onChange={(e) =>
                setNewReview({ ...newReview, userName: e.target.value })
              }
              className="w-full px-3 lg:py-2 md:py-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="comment" className="block mb-2 text-sm font-medium">
              Review
            </label>
            <textarea
              id="comment"
              rows={4}
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit Review
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="lg:grid md:grid grid-cols-2 gap-12">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.userName}</span>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? "text-blue-500 fill-blue-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="mt-8 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-4">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b pb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="w-4 h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
