"use server"

import { revalidateTag } from "next/cache";

export const addSubscription= async (subscribeData: any): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscribed/me`, {
      method: "POST",
      body: JSON.stringify(subscribeData),
        headers: {
              "Content-Type": "application/json", 
            },
   
    });
    revalidateTag("SUBSCRIBE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};