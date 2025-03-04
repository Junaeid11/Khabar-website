"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";



export const ThankYouContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mt-2">We appreciate your purchase. Your order is being processed.</p>

        {orderId ? (
          <p className="mt-4 text-green-600 font-semibold text-lg">
            Order ID: <span className="text-gray-800">{orderId}</span>
          </p>
        ) : (
          <p className="mt-4 text-red-500">No order ID found.</p>
        )}

        <p className="text-gray-500 mt-4">You will receive a confirmation email with your order details shortly.</p>

        <Link href="/">
          <button className="bg-white hover:text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-violet-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};


