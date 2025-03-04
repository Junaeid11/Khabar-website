"use client";

import { getAllOrder, updateOrder } from "@/services/order";
import { TOrder } from "@/types/cart";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { Card, CardContent } from "../card";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const statusOptions: TOrder["orderStatus"][] = ["Preparing", "Ready", "On Way", "Delivered"];

const OrderCard = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [selectedStatus, setSelectedStatus] = useState<{ [key: string]: TOrder["orderStatus"] }>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getAllOrder();
        console.log(data)
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId: string, newStatus: TOrder["orderStatus"]) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const handleUpdateStatus = async (orderId: string) => {
    try {
      const updatedStatus = selectedStatus[orderId];
      if (!updatedStatus) return;

     const res = await updateOrder(updatedStatus, orderId);

      toast.success(res.message);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: updatedStatus } : order
        )
      );
    } catch (error) {
      toast.error("Failed to update order status.");
      console.error("Error updating order:", error);
    }
  };


  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Customer Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 shadow-lg border rounded-2xl hover:shadow-2xl transition-shadow bg-white">
              <CardContent>
                <h2 className="text-lg font-bold text-gray-900">Order ID: {order._id}</h2>
                <p className="text-sm text-gray-500">Transaction ID: {order.transaction.id}</p>

                <div className="mt-3">
                  <label className="text-sm font-semibold text-gray-700">Order Status:</label>
                  <select
                    className="mt-1 block w-full border rounded-lg p-2 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    value={selectedStatus[order._id] || order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value as TOrder["orderStatus"])}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <Button className="mt-2 w-full" onClick={() => handleUpdateStatus(order._id)}>
                    Update Status
                  </Button>
                </div>

                <p className="text-sm mt-2 text-gray-600">Payment: {order.paymentMethod} </p>
                <p className="text-sm text-gray-600">Shipping: {order.shippingAddress}</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">Total: ${order.totalAmount}</p>

                <Button
                  variant="outline"
                  className="mt-4 w-full flex items-center justify-center gap-2"
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [order._id]: !prev[order._id],
                    }))
                  }
                >
                  {expanded[order._id] ? (
                    <>
                      Hide Details <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      View Products <ChevronDown size={16} />
                    </>
                  )}
                </Button>

                {expanded[order._id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 bg-gray-50 p-4 rounded-lg border"
                  >
                    <h3 className="font-semibold text-gray-800">Products:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {order.products.map((product) => (
                        <li key={product._id} className="mt-2 p-2 bg-yellow-100 rounded-lg">
                          <span className="font-semibold text-gray-900">{product.meal.name}</span> - Qty: {product.quantity}
                          <br />
                          <span className="text-blue-600 font-medium">Delivery:</span> {product.deliverySchedule}
                          <br />
                          <span className="text-green-600 font-medium">Preferences:</span> {product.dietaryPreferences}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
