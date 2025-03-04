"use client";

import { useEffect, useState } from "react";
import { getAllOrder, updateStatus } from "@/services/order";
import { TOrder } from "@/types/cart";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const statusOptions = ["Pending", "Accepted", "Cancelled"];

// Function to get color based on status
const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-500 text-white";
    case "Accepted":
      return "bg-green-500 text-white";
    case "Cancelled":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const OrderTable = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getAllOrder();
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

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const handleUpdateStatus = async (orderId: string) => {
    try {
      const updatedStatus = selectedStatus[orderId];
      if (!updatedStatus) return;

      console.log("Correct Order ID:", orderId);
      console.log("Correct New Status:", updatedStatus);

      const res = await updateStatus(updatedStatus, orderId); // ✅ Fixed order
      console.log(res);
      toast.success(res.message);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: updatedStatus } : order
        )
      );
    } catch (res: any) {
      toast.error(res.message);
    }
  };

  if (loading) {
    return <p className="text-center p-6">Loading orders...</p>;
  }

  return (
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Order ID</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead >Update Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">{order.transaction.id}</TableCell>
              <TableCell>{order.user?.name || "N/A"}</TableCell>
              <TableCell>{order.user?.email || "N/A"}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>
                <select
                  className="border rounded-md p-1 text-sm"
                  value={selectedStatus[order._id] || order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <Button
                  className="ml-2"
                  onClick={() => handleUpdateStatus(order._id)}
                >
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4">
              No orders found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
