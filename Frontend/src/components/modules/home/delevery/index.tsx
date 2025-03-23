"use client";
import { Truck, Laptop, Utensils } from "lucide-react";
import { motion } from "framer-motion";

const deliverySteps = [
  {
    icon: <Laptop size={60} className="text-purple-500" />,
    title: "Select Your Meals",
    description: "Choose from hundreds of restaurant-quality selections, rotating weekly.",
  },
  {
    icon: <Truck size={60} className="text-purple-500" />,
    title: "Cooked & Delivered Fresh",
    description: "Fully prepared fresh & delicious meals are delivered right to your door!",
  },
  {
    icon: <Utensils size={60} className="text-purple-500" />,
    title: "Heat, Eat, Bon Appétit!",
    description: "All of our meals are ready in three minutes or less!",
  },
];

export default function DeliverySection() {
  return (
    <section className=" text-Black py-16 px-6">
      <div className="container mx-auto text-center">
        <motion.h3 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-gray-500 text-lg font-semibold uppercase"
        >
          How <span className="font-extrabold text-purple-500 text-xl">&lsquo;Khabar&rsquo;</span> Works
        </motion.h3>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mt-2"
        >
          Hundreds of Rotating Meals Each Week
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {deliverySteps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4, delay: index * 0.2 }}
              className="flex flex-col items-center text-center p-6 bg-white/45 rounded-2xl shadow-lg"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-black">{step.title}</h3>
              <p className="text-gray-500 mt-2">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
