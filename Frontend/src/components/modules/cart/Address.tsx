"use client";


import { Textarea } from "@/components/ui/textarea";
import {

  updateShippingAddress,
} from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function Address() {
  const dispatch = useAppDispatch();

 
  const handleShippingAddress = (address: string) => {
    dispatch(updateShippingAddress(address));
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold">Address</h1>
        <div className="mt-5">
          <Textarea
            onChange={(e) => handleShippingAddress(e.target.value)}
            rows={2}
            className="bg-slate-200"
          />
        </div>
      </div>
    </div>
  );
}
