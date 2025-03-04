"use client"
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import Loading from '@/components/ui/loading';
import { useEffect, useState } from 'react';
import { getAllMeal } from '@/services/meal';
import { IMeal } from '@/types/meal';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState<IMeal[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await getAllMeal();  // Assuming this is fetching meal data
        console.log(data);
        setMeals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
  
      <Card className="col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">All Meals</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Dietary Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">No meals available</TableCell>
                </TableRow>
              ) : (
                meals.map((meal) => (
                  <TableRow key={meal._id}>
                    <TableCell>
                      {meal.imageUrls && meal.imageUrls.length > 0 ? (
                        <Image width={150} height={100} src={meal.imageUrls[0]} alt={meal.name} />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded"></div>
                      )}
                    </TableCell>
                    <TableCell>{meal.name}</TableCell>
                    <TableCell>{meal.description}</TableCell>
                    <TableCell>${meal.price.toFixed(2)}</TableCell>
                    <TableCell>{meal.stock}</TableCell>
                    <TableCell>{meal.rating}</TableCell>
                    <TableCell>
                      {meal.dietaryTags.join(", ")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
