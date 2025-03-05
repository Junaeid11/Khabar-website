"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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
      `${process.env.NEXT_PUBLIC_BASE_API}/menu?limit=${limit}&page=${page}&${params}`,
      {
        next: {
          revalidate: 0,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleMeal = async (mealId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/menu/${mealId}`,
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

export const addMeal = async (mealData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/menu`, {
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

export const updateMealMenu = async (
  mealData: FormData,
  mealId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/${mealId}`,
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
export const deleteMenu = async (
  mealId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/${mealId}`,
      {
        method: "DELETE",
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
