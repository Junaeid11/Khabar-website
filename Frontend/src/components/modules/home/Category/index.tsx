"use client"; 

import { useState, useEffect } from "react";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllCategories } from "@/services/Category";

import { ICategory } from "@/types/category";
import CategoryCard from "@/components/ui/core/Category";

export default function Category() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await getAllCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <NMContainer className="my-5">
      <div className=" items-center text-center">
        <h2 className="text-4xl font-serif font-extrabold">Category</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 mt-10">
        {categories.map((category, idx) => (
          <CategoryCard key={idx} category={category} />
        ))}

        
      </div>
    </NMContainer>
  );
}
