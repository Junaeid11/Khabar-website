"use client";

import NMContainer from "@/components/ui/core/NMContainer";
import RecipeBlogCard from "@/components/ui/core/RecipeBlogCard";
import { getAllBlogs } from "@/services/blogs";
import { TBlog } from "@/types/blog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const RecipeBlogs = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        toast.error("Error fetching meals:");
      }
    };
    fetchMeals();
  }, []);
  
  return (
    <NMContainer className="my-20">
    <div className="min-h-screen items-center text-center">
      <h2 className="text-3xl font-bold">Recipe Blogs</h2>
      <div className="grid grid-cols-3 gap-6 mt-10">
        {blogs.map((blogs, idx) => (
          <RecipeBlogCard key={idx} blogs={blogs} />
        ))}
        </div>

    </div>
    </NMContainer>
  );
};

export default RecipeBlogs;
