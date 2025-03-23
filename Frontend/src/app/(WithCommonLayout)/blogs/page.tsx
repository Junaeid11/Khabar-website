"use client";

import NMContainer from "@/components/ui/core/NMContainer";
import RecipeBlogCard from "@/components/ui/core/RecipeBlogCard";
import Loading from "@/components/ui/loading";
import { getAllBlogs } from "@/services/blogs";
import { TBlog } from "@/types/blog";
import { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await getAllBlogs();
        console.log("Fetched Blogs:", data); // Debug log
        setBlogs(data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, []);
  if(loading){
    return <Loading/>
  }
  
  return (
    <NMContainer className="my-20">
    <div className=" items-center text-center">
      <h2 className="text-3xl font-serif font-bold">Recipe Blogs</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        {blogs.map((blogs, idx) => (
          <RecipeBlogCard key={idx} blogs={blogs} />
        ))}
        </div>

    </div>
    </NMContainer>
  );
};

export default Blogs;
