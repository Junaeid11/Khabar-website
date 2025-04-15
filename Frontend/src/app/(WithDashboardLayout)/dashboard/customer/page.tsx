"use client";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import Loading from '@/components/ui/loading';
import { useEffect, useState } from 'react';
import { TOrder } from '@/types/cart';
import { getOrder } from '@/services/order';
import { ICategory } from '@/types/category';
import { getAllCategories } from '@/services/Category';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FF5', '#F56D91', '#76C7C0'];

export default function Dashboard() {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [priceRange, setPriceRange] = useState([]);

  const totalValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await getAllCategories();
      const formattedCategories = data.map((category: ICategory) => ({
        name: category.name,
        value: category.count || 1,
      }));
      setCategories(formattedCategories);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getOrder();
        setOrders(data);

        const priceData = data.map((order: any, index: number) => ({
          name: `Order ${index + 1}`,
          value: order.totalAmount,
        }));

        setPriceRange(priceData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 space-y-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <Card className="hover:shadow-lg bg-amber-400/25 transition-shadow duration-300 border border-gray-200">
          <CardContent className="p-6 ">
            <h4 className="text-sm text-gray-500 mb-1">Total Orders</h4>
            <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
            <p className="text-xs text-gray-400 mt-1">Number of all orders</p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200 bg-amber-400/25 ">
          <CardContent className="p-6">
            <h4 className="text-sm text-gray-500 mb-1">Total Cost</h4>
            <p className="text-3xl font-bold text-green-600">৳{totalValue.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-1">Total value from all orders</p>
          </CardContent>
        </Card>
      </div>

      {/* 🔶 Charts Side-by-Side */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* My Cost Line Chart */}
        <Card className="w-full bg-amber-400/25  md:w-1/2">
          <CardContent>
            <h2 className="text-xl font-semibold  m-2">Order Cost Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={priceRange}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4A90E2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Meal Categories Pie Chart */}
        <Card className="w-full bg-amber-400/25  md:w-1/2">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Meal Categories</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 🧾 Orders Table */}
      <Card className='bg-amber-400/10 '>
        <CardContent>
          <h2 className="text-2xl  text-center font-semibold mb-4">All Orders</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Order Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No orders available</TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.transaction.id}>
                    <TableCell>{order.transaction.id}</TableCell>
                    <TableCell className="text-green-600">{order.status}</TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell className="text-blue-600">{order.orderStatus}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
