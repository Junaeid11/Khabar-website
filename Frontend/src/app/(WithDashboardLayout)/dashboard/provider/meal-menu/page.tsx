"use client"

import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import Loading from '@/components/ui/loading';
import { useEffect, useState } from 'react';
import { deleteMenu, getAllMeal } from '@/services/meal';
import { IMeal } from '@/types/meal';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState<IMeal[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await getAllMeal();
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

  const handleDelete = async (meal: IMeal) => {
    try {
      const res = await deleteMenu(meal._id);
      if (res.success) {
        toast.success(res.message);
        setMeals((prevMeals) => prevMeals.filter((item) => item._id !== meal._id));
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the meal.");
    }
  };

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
                <TableHead>Category</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">No meals available</TableCell>
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
                    <TableCell className="text-red-500 font-bold">${meal.price.toFixed(2)}</TableCell>
                    <TableCell className="text-green-500 font-bold">{meal.stock}</TableCell>
                    <TableCell>{meal.rating}</TableCell>
                    <TableCell>
                      {meal.category.name}
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-gray-500 hover:text-green-500"
                        title="Edit"
                        onClick={() =>
                          router.push(
                            `/dashboard/provider/update-meal/${meal._id}`
                          )
                        }
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-gray-500 hover:text-red-500"
                        title="Delete"
                        onClick={() => handleDelete(meal)} // Directly delete on click
                      >
                        <Trash className="w-5 h-5" />
                      </button>
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
