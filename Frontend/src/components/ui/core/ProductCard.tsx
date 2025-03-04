"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IMeal } from "@/types/meal";

import {  ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ meal }: { meal: IMeal }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = (meal: IMeal) => {
    dispatch(addProduct(meal));
    
  };

  return (
    <Card className="p-3">
      <CardHeader className="relative p-0 h-48">
        <Image
          src={
            meal?.imageUrls[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          width={500}
          height={500}
          alt="product image"
          className="rounded-sm h-48 object-cover"
        />
        {meal?.stock === 0 && (
          <div className="absolute left-2 top-0 bg-red-500 text-white px-2 rounded-full">
            Out of Stock
          </div>
        )}
      </CardHeader>

      <CardContent className=" p-0 mt-2">
        <Link href={`/find-meal/${meal._id}`} passHref>
          <CardTitle
            title={meal?.name}
            className="font-semibold cursor-pointer text-sm"
          >
            {meal?.name.length > 20
              ? meal?.name?.slice(0, 20) + "..."
              : meal?.name}
          </CardTitle>
        </Link>

        <div className="flex items-center justify-between my-2">
          <p className="text-sm text-gray-600">
        
              <span className="font-semibold">
                $ {meal?.price.toFixed(2)}
              </span>
     
          </p>

          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4" fill="orange" stroke="orange" />

          </div>
        </div>
      </CardContent>

      <CardFooter className="block p-0">
        <div className="flex gap-2 items-center justify-between">
         
        <Link href={`/find-meals/${meal._id}`} passHref>
          <Button
            size="sm"
            variant="outline"
            className="w-32"
          >
            View Details
          </Button>
          </Link>
          <Button
            onClick={() => handleAddProduct(meal)}
            disabled={meal?.stock === 0}
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
          >
            <ShoppingCart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
