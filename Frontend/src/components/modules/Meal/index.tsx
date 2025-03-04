"use client";

import { useEffect, useState } from "react";
import { getAllMeal } from "@/services/meal";
import Image from "next/image";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Meal = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const { data } = await getAllMeal();
                setLoading(false);
                console.log(data)
                setMeals(data);
            } catch (error) {
                console.error("Error fetching meals:", error);
            }
        };

        fetchMeals();
    }, []);
    if (loading) return <Loading />

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center">View This Weeks Mouthwatering Menu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {meals.map((meal, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                        <Image src={meal.imageUrls[0]} alt={meal.name} width={400} height={200} className="w-full h-48 object-cover rounded-md" />
                        <span className="text-sm bg-orange-500 text-white px-2 py-1 rounded-md mt-2 inline-block">Keto</span>
                        <h3 className="text-lg font-bold mt-2">{meal.name}</h3>
                        <p className="text-gray-600">{meal.description}</p>
                        <p className="text-sm text-gray-500">{meal.calories} Cal | {meal.protein}g Protein | {meal.carbs}g Carb</p>
                        <p className="text-yellow-500 text-sm">⭐ {meal.rating} ({meal.ratingCount} Reviews)</p>
                       <Link href={`/find-meal/${meal._id}`}>
                       <Button>
                        See Details
                       </Button>
                       
                       </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Meal;
