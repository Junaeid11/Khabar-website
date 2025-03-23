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
import { ShoppingCart, Star } from "lucide-react";
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
    <Card className="p-4 border bg-amber-400/15 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
      <CardHeader className="relative p-0">
        <div className="w-full h-48 overflow-hidden rounded-lg">
          <Image
            src={
              meal?.imageUrls[0] ||
              "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
            }
            width={500}
            height={500}
            alt={meal?.name}
            className="w-full h-full object-cover"
          />
        </div>
        {meal?.stock === 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
            Out of Stock
          </div>
        )}
      </CardHeader>

      {/* Product Info */}
      <CardContent className="mt-3">
        <Link href={`/find-meal/${meal._id}`} passHref>
          <CardTitle className="text-lg font-semibold text-gray-800  transition cursor-pointer">
            {meal?.name.length > 22 ? `${meal?.name?.slice(0, 22)}...` : meal?.name}
          </CardTitle>
        </Link>

        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          <p className="font-semibold text-lg text-red-500">${meal?.price.toFixed(2)}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" fill="orange" stroke="orange" />
            <span className="text-gray-700">4.5</span>
          </div>
        </div>
      </CardContent>

      {/* Buttons */}
      <CardFooter className="mt-3">
        <div className="flex justify-between w-full">
          <Link href={`/find-meals/${meal._id}`} passHref>
            <Button size="sm" variant="outline" className="w-32 bg-gradient-to-r from-red-500 to-orange-500 text-white hover:bg-amber-400/10 hover:text-red">
              View Details
            </Button>
          </Link>
          <Button
            onClick={() => handleAddProduct(meal)}
            disabled={meal?.stock === 0 || user?.role !== "customer"}
            variant="outline"
            size="sm"
            className="w-9 h-9 p-0 flex items-center justify-center rounded-full border-gray-400 hover:bg-gray-200"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
