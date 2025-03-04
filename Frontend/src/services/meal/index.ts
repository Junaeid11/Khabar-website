"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get all products
export const getAllMeal = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();
  if (query?.rating) {
    params.append("ratings", query?.rating.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers?limit=${limit}&page=${page}&${params}`,
      {
        next: {
          tags: ["MEAL"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single product
export const getSingleMeal = async (mealId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers/${mealId}`,
      {
        next: {
          tags: ["MEAL"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// add product
export const addMeal = async (mealData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu`, {
      method: "POST",
      body: mealData,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("MEAL");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update product
export const updateMealMenu = async (
  mealData: FormData,
  mealId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers/${mealId}`,
      {
        method: "PATCH",
        body: mealData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("MEAL");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
