"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import {
  clearCart,
  orderedProductsSelector,
  shippingAddressSelector,
  subTotalSelector,
  updateDelivery,
  updateDietaryPreference,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createOrder } from "@/services/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentDetails() {
  
  const subTotal = useAppSelector(subTotalSelector);
  const deliverySchedule = useAppSelector(updateDelivery)
  const dietaryPreferences = useAppSelector(updateDietaryPreference)
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);
  const user = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");
    try {
      if (!user.user) {
        router.push("/login");
        throw new Error("Please login first.");
      }

     
      if (!shippingAddress) {
        throw new Error("Shipping address is missing");
      }

      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }
      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }
      if (deliverySchedule.length === 0) {
        throw new Error("Please Add Schedule");
      }
      const orderData = {
        products:cartProducts.map(item => ({
          meal: item._id, 
          quantity: item.orderQuantity,
          deliverySchedule ,
          dietaryPreferences
        })),
        shippingAddress,
        paymentMethod: "Online",
      }
      console.log(orderData)

      const res = await createOrder(orderData);

      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());
         window.location.href = res.data;
      }

      if (!res.success) {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>

        <div className="flex justify-between">
          <p className="text-gray-500 my-5">Total Amount:</p>
          <p className="font-semibold my-5">{subTotal}</p>
        </div>
      <Button
        onClick={handleOrder}
        className="w-full bg-amber-500 hover:bg-orange-300 text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}
