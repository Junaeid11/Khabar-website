
"use client"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import Image from 'next/image';
import Loading from '@/components/ui/loading';
import { useEffect, useState } from 'react';
import { TOrder } from '@/types/cart';
import { getOrder } from '@/services/order';
const revenueData = [
  { name: 'Jan', value: 500 },
  { name: 'Feb', value: 100 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 300 },
  { name: 'May', value: 400 },
  { name: 'Jun', value: 500 },
  { name: 'Jul', value: 6000 },
];

const teamData = [
  { name: "Traditional", value: 58, color: "#785EF0" },
  { name: "Paleo", value: 23, color: "#00A99D" },
  { name: "Keto", value: 12, color: "#FF4D4D" },
  { name: "Vegan", value: 7, color: "#FFC107" },
];


export default function Dashboard() {
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

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Price Range</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4A90E2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Meal menu</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={teamData} dataKey="value" nameKey="name" outerRadius={80}>
                {teamData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">All Order</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Order Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {orders.length === 0 ? null : orders.map((order) => (
                  <TableRow key={order.transaction.id}>
                    <TableCell>{order.transaction.id}</TableCell>
                    <TableCell className="text-yellow-500">{order.status}</TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell className="text-red-500">{order.orderStatus}</TableCell>
                  </TableRow>
                ))}

            </TableBody>
          </Table>
        </CardContent>
      </Card>


    </div>
  );
}
