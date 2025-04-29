"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IMeal } from "@/types/meal";
import { ShoppingCart, Star, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const ProductCard = ({ meal }: { meal: IMeal }) => {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const handleAddProduct = (meal: IMeal) => {
    toast.success("Meal added to Cart!");
    dispatch(addProduct(meal));
  };

  return (
    <Card className="rounded-xl overflow-hidden border border-amber-500 shadow-md hover:shadow-xl transition-all bg-amber-500/15">
      {/* Image Section */}
      <CardHeader className="relative p-0 group">
        <div className="w-full h-44  relative">
          <Image
            src={
              meal?.imageUrls[0] ||
              "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
            }
            alt={meal?.name}
            width={500}
            height={500}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Out of Stock Badge */}
        {meal.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded z-10">
            Out of Stock
          </div>
        )}
      </CardHeader>

      {/* Info */}
      <CardContent className="p-4 space-y-2">
        {/* Category Name Tag */}
        {meal?.category?.name && (
          <div className="text-xs font-semibold text-orange-600 bg-orange-100 inline-block px-3 py-1 rounded-full mb-1">
            {meal.category.name}
          </div>
        )}

        <Link href={`/find-meals/${meal._id}`}>
          <CardTitle className="text-lg font-bold text-gray-800 hover:text-orange-500 transition cursor-pointer flex items-center gap-1">
            <UtensilsCrossed className="w-4 h-4 text-orange-400" />
            {meal.name.length > 22 ? `${meal.name.slice(0, 22)}...` : meal.name}
          </CardTitle>
        </Link>

        <div className="flex justify-between items-center text-sm">
          <p className="text-red-500 font-semibold text-base">
            ${meal?.discountPrice?.toFixed(2) || meal?.price?.toFixed(2)}
          </p>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-gray-800">{meal.rating?.toFixed(1) || "4.5"}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <Link href={`/find-meals/${meal._id}`}>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:bg-amber-200-100"
          >
            View
          </Button>
        </Link>
        <Button
          onClick={() => handleAddProduct(meal)}
          size="icon"
          className="rounded-full  border bg-white  hover:bg-orange-100"
        >
          <ShoppingCart className="w-5 h-5 text-black" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
