"use server"
import { revalidateTag } from "next/cache";

export const getAllBlogs = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/blog`, {
            method: "GET",
        })
        revalidateTag("blogs");;
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error);
    }
};
export const getSingleBlog = async (blogId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${blogId}`,
        {
          next: {
            tags: ["blog"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };