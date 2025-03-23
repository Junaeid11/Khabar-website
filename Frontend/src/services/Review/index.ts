"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addReviews = async (ReviewData: any): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      method: "POST",
      body: JSON.stringify(ReviewData),
      headers: {
        "Content-Type": "application/json", 
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("REVIEW");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllReview = async (): Promise<any> => {
  try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review/all`, {
          method: "GET",
      })
      revalidateTag("review");;
      const data = await res.json();
      return data;
  } catch (error: any) {
      return Error(error);
  }
};