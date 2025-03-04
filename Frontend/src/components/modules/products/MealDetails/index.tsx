"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReviewCard from "../Review";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import { IMeal } from "@/types/meal";

const MealDetails = ({ meal }: { meal: IMeal }) => {
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState(meal?.imageUrls[0]);
  const [portionSize, setPortionSize] = useState(1);

  const handleAddProduct = (meal: IMeal) => {
    dispatch(addProduct(meal));
  };

  const calculateNutritionalValue = (nutrient: number) => nutrient * portionSize;

  return (
    <div className="bg-[#FAF8F4] p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div>
          <div className="relative">
            <Image
              src={selectedImage}
              alt="product image"
              width={500}
              height={500}
              className="rounded-lg w-full h-96 object-cover shadow-md"
            />
          </div>
          <div className="flex gap-3 mt-4">
            {meal?.imageUrls.slice(0, 3).map((image, idx) => (
              <Image
                key={idx}
                src={image}
                alt="product thumbnail"
                width={100}
                height={100}
                className={`rounded-md w-24 h-24 object-cover cursor-pointer border-2 transition duration-300 ${selectedImage === image ? "border-orange-500" : "border-gray-300"}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-3xl text-gray-900 mt-3">{meal?.name}</h2>
          <p className="text-gray-600 text-lg mt-2">{meal?.description}</p>
          <div className="mt-4">
            {meal?.stock <= 0 ? (
              <p className="text-red-600 font-semibold">Out of Stock</p>
            ) : (
              <p className="text-green-600 font-semibold">{meal?.stock} items available</p>
            )}
          </div>

          <div className="my-4">
            <p className="text-sm text-gray-500">Choose Portion Size:</p>
            <input
              type="number"
              min={0}
              value={portionSize}
              onChange={(e) => setPortionSize(parseInt(e.target.value))}
              className="w-20 p-2 border rounded-md"
            />
          </div>

          <div className="flex items-center justify-between my-4 text-gray-500 text-sm">
            <span className="flex items-center gap-1 text-yellow-700 font-semibold">
              <Star className="w-5 h-5" fill="orange" stroke="orange" />
              {meal?.rating}
            </span>
            <span className="text-gray-600 font-semibold">Heat & Eat in {meal?.preparationTime} min</span>
          </div>
          <div className="flex gap-2 mb-4">
            {meal?.dietaryTags.map((tag, idx) => (
              <span key={idx} className="bg-green-100 text-green-700 text-sm py-1 px-3 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 text-center bg-gray-100 p-4 rounded-lg text-gray-700 font-semibold">
            <div>
              <p className="text-xl">{calculateNutritionalValue(meal?.calories || 0)}</p>
              <p className="text-sm">Calories</p>
            </div>
            <div>
              <p className="text-xl">{calculateNutritionalValue(meal?.carbs || 0)}g</p>
              <p className="text-sm">Carbs</p>
            </div>
            <div>
              <p className="text-xl">{calculateNutritionalValue(meal?.protein || 0)}g</p>
              <p className="text-sm">Protein</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button onClick={() => handleAddProduct(meal)} className="w-full bg-purple-500 hover:bg-black text-white" disabled={meal?.stock <= 0}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Nutritional Facts, Ingredients, and Preparation */}
      <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-purple-500">Nutritional Facts & Ingredients</h3>
        <p className="mt-2 font-semibold text-lg">Ingredients:</p>
        <p className="text-gray-700 flex flex-col">{meal?.ingredients.join(" • ")}</p>
        <p className="mt-4 font-semibold text-lg">How to Prepare:</p>
        <p className="text-gray-600">Keep refrigerated until ready to serve. If desired, vent cover and microwave for 2-3 minutes. Not intended for oven use.</p>
      </div>

      {/* Reviews Section */}
      <ReviewCard mealId={meal._id} />
      <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-purple-500">Customer Reviews</h3>

        {Array.isArray(meal?.reviews) && meal.reviews.length > 0 ? (
          meal.reviews.map((review: any) => (
            <Card key={review._id} className="p-4 my-4 shadow-md border rounded-lg bg-neutral-100">
              <CardContent>
                <div className="mb-2">
                  <h4 className="font-bold text-lg">{review?.user?.name ?? "Anonymous User"}</h4>
                  <p className="text-gray-600 text-sm">{review?.user?.email ?? "No Email Provided"}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                  ))}
                  <span className="ml-2 font-semibold">{review.rating}/5</span>
                </div>
                <div className="mt-2">
                  <textarea className="w-full p-2 border rounded-lg focus:outline-none bg-gray-100 text-gray-700" rows={2} value={review.review} readOnly />
                </div>
                <p className="text-gray-500 text-right text-sm mt-2">
                  Reviewed on{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(review.createdAt))}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 mt-2">No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
