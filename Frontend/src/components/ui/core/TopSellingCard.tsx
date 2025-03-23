"use client";

import { IMeal } from "@/types/meal";
import { Card, CardHeader, CardContent } from "../card";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation"; 

const TopSellingCard = ({ meal }: { meal: IMeal }) => {
  const router = useRouter(); 

  const handleClick = () => {
    router.push(`/find-meals/${meal._id}`); 
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
      onClick={handleClick} 
    >
      <Card className="p-4 shadow-xl rounded-lg bg-amber-500/25">
        <CardHeader className="relative p-0 h-48 overflow-hidden rounded-lg">
          <Image
            src={
              meal?.imageUrls[0] ||
              "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
            }
            width={500}
            height={500}
            alt="product image"
            className="w-full h-full object-cover rounded-lg"
          />

          {meal.category && (
            <div className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md">
              <Image
                src={
                  meal.category.icon ||
                  "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                }
                width={30}
                height={30}
                alt={meal.category.name}
                className="w-6 h-6"
              />
            </div>
          )}
        </CardHeader>

        {/* Meal Info */}
        <CardContent className="mt-3">
          <h3 className="font-semibold text-lg truncate">{meal.name}</h3>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-medium">
                {meal.rating} ({meal.ratingCount})
              </span>
            </div>
            <p className="text-sm text-gray-700 font-medium mt-1">
              Sold: {meal.stock} times
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TopSellingCard;
