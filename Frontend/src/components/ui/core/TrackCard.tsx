"use client";
import { FaClipboardList, FaShippingFast, FaTruck, FaHome } from "react-icons/fa";
import Loading from "../loading";
import { useEffect, useState } from "react";
import { getOrder } from "@/services/order";
import { TOrder } from "@/types/cart";
import Image from "next/image";

import logo from '../../../app/20943865.jpg'

const statusSteps = [
  { label: "Preparing", icon: <FaClipboardList size={24} /> },
  { label: "Ready", icon: <FaShippingFast size={24} /> },
  { label: "On Way", icon: <FaTruck size={24} /> },
  { label: "Delivered", icon: <FaHome size={24} /> },
];

export default function OrderTracking() {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getOrder(); 
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loading />;
  if (orders.length === 0) return ( <div className='flex justify-center items-center'>
    <Image
  src={logo}
  alt={"No data Found"}
  width={500}
  height={150}
/>
  </div>)

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Order Tracking</h2>
      {orders.map((order) => {
        const { orderStatus, createdAt, transaction, _id } = order as TOrder;
        const activeIndex = Math.max(0, statusSteps.findIndex((step) => step.label === orderStatus));

        return (
          <div key={_id} className="mb-6 p-4 border rounded-lg shadow-md">
            <p className="text-gray-600 mb-2">
              Order ID: <span className="font-semibold">{transaction.id || "N/A"}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Placed on: {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
            </p>

            <div className="flex items-center justify-between relative mb-4">
              {statusSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center w-1/4">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      index <= activeIndex ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p
                    className={`text-sm mt-2 ${
                      index <= activeIndex ? "font-semibold text-black" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              ))}

              <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 z-0">
                <div
                  className="h-1  bg-purple-600 transition-all duration-300"
                  style={{ width: activeIndex === statusSteps.length - 1 ? "100%" : `${(activeIndex / (statusSteps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
