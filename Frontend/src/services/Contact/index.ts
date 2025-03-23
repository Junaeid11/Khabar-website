"use server";

import { revalidateTag } from "next/cache";

export const createContact = async (messageData: any): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/message/me`, {
      method: "POST",
      body: JSON.stringify(messageData),
      headers: {
        "Content-Type": "application/json", 
      },
   
    });
    revalidateTag("MESSAGE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all categories
export const getAllContact = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/message/me`, {
      next: {
        tags: ["MESSAGE"],
      },
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};