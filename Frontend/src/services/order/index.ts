"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getOrder = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customers/orders`, {
            method: "GET",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["ORDER"],
            },

        });
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error);
    }
};
export const getAllOrder = async (): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/order`, {
            method: "GET",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
           

        })
        revalidateTag("ORDER");;
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error);
    }
};

export const updateOrder = async (
  orderStatus: string,
  orderId: string
): Promise<any> => {
  
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify({orderStatus})
      }
    );
    revalidateTag("ORDER");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const updateStatus = async (
  status: string,
  orderId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify({status})
      }
    );
    revalidateTag("ORDER");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};