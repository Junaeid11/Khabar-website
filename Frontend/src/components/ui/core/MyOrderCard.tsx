'use client'

import Loading from '@/components/ui/loading';
import { getOrder } from '@/services/order';
import { TOrder } from '@/types/cart';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '../../../app/20943865.jpg'

const statusColors = {
  Pending: "bg-yellow-500",
  Accepted: "bg-green-500",
  Cancelled: "bg-red-500"
};

const MyOrderCard = () => {
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
  if (orders.length === 0) return ( <div>
    <Image
  src={logo}
  alt={"No data Found"}
  width={200}
  height={150}
  className="w-20 h-20 object-cover rounded-lg"
/>
  </div>)

  return (
    <div className="space-y-6 p-4">
      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg shadow-lg p-6 bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Order ID: {order.transaction.id}</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
              </div>
              
            </div>
          </div>
          <div className="mt-2 text-gray-700">
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> {order.user.email}</p>
            <p><strong>Phone:</strong> {order.user.phoneNo}</p>
          </div>

          <div className="mt-4 space-y-4">
            {order.products.map((product) => (
              <div key={product._id} className="border-b pb-4">
                <div className="flex gap-4 items-center">
                  <Image
                    src={product.meal.imageUrls[0]}
                    alt={product.meal.name}
                    width={200}
                    height={150}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold">{product.meal.name}</h4>
                    <p className="text-gray-600">{product.meal.description}</p>
                    <p className="text-sm text-gray-500">Dietary: {product.dietaryPreferences}</p>
                    <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                    <p className="text-sm font-semibold text-green-600">${product.meal.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-gray-800"><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
            <p className="text-gray-800"><strong>Shipping Address:</strong> {order.shippingAddress}</p>
            <p className="text-gray-800"><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p className="mt-1">
              <span className=""><strong>Status</strong> </span>
                <span className={`px-3 py-1 rounded-full text-white ${statusColors[order.status as keyof typeof statusColors]}`}>
                  {order.status}
                </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrderCard;
