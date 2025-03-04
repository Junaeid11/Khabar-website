"use client";

import { useEffect, useState } from "react";
import { getAllMeal } from "@/services/meal";
import { IMeal } from "@/types/meal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "@/components/ui/loading";
import Image from "next/image";

const FindMeals = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [providerFilter, setProviderFilter] = useState<string>(""); 

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await getAllMeal();
        setMeals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
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
    if (ratingFilter > 0) {
        updatedMeals = updatedMeals.filter((meal) => meal.rating !== undefined && meal.rating >= ratingFilter);
      }
    if (providerFilter) {
      updatedMeals = updatedMeals.filter((meal) => meal.provider?.name.toLowerCase().includes(providerFilter.toLowerCase()));
    }

    setFilteredMeals(updatedMeals);
  }, [searchTerm, ratingFilter, providerFilter, meals]);
  if (loading) return <Loading />;

  return (
    <div className="p-6 w-100">
      <h2 className="text-2xl font-bold text-center">Find Delicious Meals</h2>
      <div className="mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search meals by name, or description"
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Filter by Rating */}
      <div className="mt-4 flex items-center">
        <label htmlFor="rating" className="mr-2">Filter by Rating:</label>
        <select
          id="rating"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(Number(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value={0}>All Ratings</option>
          <option value={1}>1+ Star</option>
          <option value={2}>2+ Stars</option>
          <option value={3}>3+ Stars</option>
          <option value={4}>4+ Stars</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>

      {/* Filter by Meal Provider */}
      <div className="mt-4">
        <input
          type="text"
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          placeholder="Filter by provider"
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Display filtered meals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredMeals.map((meal) => (
          <div key={meal._id} className="bg-white shadow-lg rounded-lg p-4">
            <Image width={100} height={100} src={meal.imageUrls[0]} alt={meal.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{meal.name}</h3>
            <p className="text-gray-600">{meal.description}</p>
            <p className="text-sm text-gray-500">{meal.calories} Cal | {meal.protein}g Protein | {meal.carbs}g Carb</p>
            <p className="text-yellow-500 text-sm">⭐ {meal.rating} ({meal.ratingCount} Reviews)</p>
            <Link href={`/find-meals/${meal._id}`}>
              <Button>See Details</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindMeals;
