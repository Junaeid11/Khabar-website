
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getMyProfile = async (): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/profile`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const updateProfile = async (
  profileData: FormData,
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/profile`,
      {
        method: "PUT",
        body: profileData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PROFILE");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};