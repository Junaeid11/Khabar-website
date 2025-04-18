"use client";

import { useEffect, useState } from "react";
import { getAllMeal } from "@/services/meal";
import { IMeal } from "@/types/meal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "@/components/ui/loading";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllCategories } from "@/services/Category";
import { FaSearch } from "react-icons/fa";
import { UtensilsCrossed, Star, ShoppingCart } from "lucide-react";

import { toast } from "sonner";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

// Temporary or context-based placeholders for user & add-to-cart logic

const FindMeals = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [price, setPrice] = useState(250);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);
  const [stockFilter, setStockFilter] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 6;

  const dietaryTags = ["vegan", "vegetarian", "gluten-free", "keto", "paleo", "halal", "kosher"];
  const ratings = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await getAllMeal();
        setMeals(data);
        setFilteredMeals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);
  const user = { role: "customer" };
  const dispatch = useAppDispatch();

  const handleAddProduct = (meal: IMeal) => {
    toast.success("Meal added to Cart!");
    dispatch(addProduct(meal));
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    let updatedMeals = [...meals];

    if (searchTerm) {
      updatedMeals = updatedMeals.filter(
        (meal) =>
          meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meal.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ratingFilter !== null) {
      updatedMeals = updatedMeals.filter(
        (meal) => meal.rating !== undefined && meal.rating >= ratingFilter
      );
    }

    if (selectedCategories.length > 0) {
      updatedMeals = updatedMeals.filter((meal) =>
        selectedCategories.includes(meal.category?._id)
      );
    }

    if (selectedDietaryTags.length > 0) {
      updatedMeals = updatedMeals.filter((meal) =>
        meal.dietaryTags && Array.isArray(meal.dietaryTags)
          ? selectedDietaryTags.every((tag) => meal.dietaryTags.includes(tag))
          : false
      );
    }

    updatedMeals = updatedMeals.filter((meal) => meal.price <= price);

    if (stockFilter === "inStock") {
      updatedMeals = updatedMeals.filter((meal) => meal.stock > 0);
    } else if (stockFilter === "outOfStock") {
      updatedMeals = updatedMeals.filter((meal) => meal.stock === 0);
    }

    setFilteredMeals(updatedMeals);
    setCurrentPage(1);
  }, [searchTerm, ratingFilter, selectedCategories, selectedDietaryTags, stockFilter, price, meals]);

  if (loading) return <Loading />;

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const paginatedMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(filteredMeals.length / mealsPerPage);

  return (
    <div className="p-6 w-full flex gap-6">
      {/* Sidebar Filters */}
      <div className="w-72">
        <Card className="p-4 rounded-2xl shadow-md">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Filter By Price</h2>
            <Slider defaultValue={[price]} max={500} onValueChange={(val) => setPrice(val[0])} />
            <p className="mt-2">${price}</p>

            <h2 className="text-lg font-semibold mt-6">Dietary Tags</h2>
            {dietaryTags.map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedDietaryTags.includes(tag)}
                  onCheckedChange={() =>
                    setSelectedDietaryTags((prev) =>
                      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                    )
                  }
                />
                <span>{tag}</span>
              </div>
            ))}

            <h2 className="text-lg font-semibold mt-6">Category</h2>
            {categories.map((category) => (
              <div key={category._id} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedCategories.includes(category._id)}
                  onCheckedChange={() =>
                    setSelectedCategories((prev) =>
                      prev.includes(category._id)
                        ? prev.filter((id) => id !== category._id)
                        : [...prev, category._id]
                    )
                  }
                />
                <span>{category.name}</span>
              </div>
            ))}

            <h2 className="text-lg font-semibold mt-6">Rating</h2>
            <ul className="space-y-2 mt-2">
              {ratings.map((rating) => (
                <li key={rating} className="flex items-center gap-2">
                  <Checkbox
                    checked={ratingFilter === rating}
                    onCheckedChange={() => setRatingFilter((prev) => (prev === rating ? null : rating))}
                  />
                  <span className="text-yellow-500">
                    {"★".repeat(rating)}
                    {"☆".repeat(5 - rating)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Meal Grid */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-center mb-4">Find Delicious Meals</h2>

        {/* Search Box */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search meals..."
            className="w-full p-2 pl-10 border rounded-lg shadow-sm"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedMeals.map((meal) => (
            <Card
              key={meal._id}
              className="rounded-xl overflow-hidden border border-amber-500 shadow-md hover:shadow-xl transition-all bg-amber-500/15"
            >
              <CardHeader className="relative p-0 group">
                <div className="w-full h-44 relative">
                  <Image
                    src={
                      meal?.imageUrls?.[0] ||
                      "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                    }
                    alt={meal?.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {meal.stock === 0 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded z-10">
                    Out of Stock
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-4 space-y-2">
                {meal?.category?.name && (
                  <div className="text-xs font-semibold text-orange-600 bg-orange-100 inline-block px-3 py-1 rounded-full mb-1">
                    {meal.category.name}
                  </div>
                )}

                <Link href={`/find-meal/${meal._id}`}>
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
                  disabled={meal.stock === 0 || user?.role !== "customer"}
                  size="icon"
                  className="rounded-full border bg-white hover:bg-orange-100"
                >
                  <ShoppingCart className="w-5 h-5 text-black" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-4">
          <Button
            className="bg-amber-400 text-black hover:bg-amber-500"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            className="bg-amber-400 text-black hover:bg-amber-500"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FindMeals;
