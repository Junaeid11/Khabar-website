import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { addReviews } from "@/services/Review";

const ReviewPostCard = ({ mealId }: { mealId: string }) => {
  const [review, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!review.trim() || rating === 0) {
      toast.error("Please provide a review and rating.");
      return;
    }
  
    try {
      setLoading(true);
      const reviewData = {
        rating,
        review,
        meal: mealId

      }
      console.log(reviewData)
      const res = await addReviews(reviewData);
      console.log(res)
  
      if (res.success) {
        toast.success(res.message);
        setReviewText("");
        setRating(0);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="border p-6 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-bold text-gray-800">Write a Review</h3>

      <div className="flex gap-1 my-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-6 h-6 cursor-pointer transition ${
              i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
            }`}
            onClick={() => setRating(i + 1)}
          />
        ))}
      </div>

      <textarea
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
        rows={3}
        placeholder="Share your thoughts..."
        value={review}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <Button
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
};

export default ReviewPostCard;
