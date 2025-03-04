"use client";

import { Button } from "@/components/ui/button";
import { IMeal } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReviewCard from "../Review";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/cartSlice";

const ProductDetails = ({ meal}: { meal: IMeal }) => {

    const dispatch = useAppDispatch();
    const handleAddProduct = (meal: IMeal) => {
      dispatch(addProduct(meal));
      
    };
  const [selectedImage, setSelectedImage] = useState(meal?.imageUrls[0]);

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
                className={`rounded-md w-24 h-24 object-cover cursor-pointer border-2 transition duration-300 ${selectedImage === image ? "border-orange-500" : "border-gray-300"
                  }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <div>
          <span className="bg-orange-100 text-orange-700 px-3 py-1 text-sm rounded-full font-semibold">
            {meal?.category?.name}
          </span>
          <h2 className="font-bold text-3xl text-gray-900 mt-3">{meal?.name}</h2>
          <p className="text-gray-600 text-lg mt-2">{meal?.description}</p>
          <div className="flex items-center justify-between my-4 text-gray-500 text-sm">
            <span className="flex items-center gap-1 text-yellow-700 font-semibold">
              <Star className="w-5 h-5" fill="orange" stroke="orange" />
              {meal?.rating} ({meal?.ratingCount} Reviews)
            </span>
            <span className="text-gray-600 font-semibold">Heat & Eat in {meal?.preparationTime} min</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center bg-gray-100 p-4 rounded-lg text-gray-700 font-semibold">
            <div>
              <p className="text-xl">{meal?.calories}</p>
              <p className="text-sm">Calories</p>
            </div>
            <div>
              <p className="text-xl">{meal?.carbs}g</p>
              <p className="text-sm">Carbs</p>
            </div>
            <div>
              <p className="text-xl">{meal?.protein}g</p>
              <p className="text-sm">Protein</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button  onClick={() => handleAddProduct(meal)}  className="w-full bg-purple-500 hover:bg-black text-white">Add to Cart</Button>
          </div>
        </div>
      </div>

      {/* Ingredients & Preparation */}
      <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-purple-500">Nutritional Facts & Ingredients</h3>
        <p className="mt-2 font-semibold text-lg">Ingredients:</p>
        <p className="text-gray-700 flex flex-col">{meal?.ingredients.join(" • ")}</p>
        <p className="mt-4 font-semibold text-lg">How to Prepare:</p>
        <p className="text-gray-600">Keep refrigerated until ready to serve. If desired, vent cover and microwave for 2-3 minutes. Not intended for oven use.</p>
      </div>
      <ReviewCard productId={meal._id} />
      <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-purple-500">Customer Reviews</h3>
        

        {Array.isArray(meal?.reviews) && meal.reviews.length > 0 ? (
          <div className="mt-4 space-y-4">
            {meal?.reviews.map((review: any) => (
              <div key={review._id} className="border-b pb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold">{review.rating}/5</span>
                </div>
                <p className="text-gray-700 mt-2">{review.review}</p>
                <p className="text-gray-700 mt-2">{review.user.name}</p>
                <p className="text-gray-500 text-sm mt-1">
                Reviewed on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(review.createdAt))}

                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-2">No reviews yet. Be the first to leave a review!</p>
        )}


      </div>
    </div>

  );
};

export default ProductDetails;
