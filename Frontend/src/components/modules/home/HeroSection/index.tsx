"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center rounded-2xl"
    style={{
      backgroundImage:
        "url(https://i.pinimg.com/736x/33/ef/8b/33ef8b9c0b902154a6cd4103a21275ef.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "20px",
    }}
    >
      <div className="relative bg-white p-10 rounded-lg shadow-xl text-center max-w-lg">
        <motion.h1
          className="text-4xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Chef Crafted Meals <br /> Deliciously Delivered!
        </motion.h1>

        <motion.p
          className="text-gray-600 mt-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Enjoy healthy, chef-prepared meals delivered straight to your door. Fresh, delicious, and hassle-free!
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Link href="/find-meal">
            <Button className="bg-white text-purple-400 text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-black transition">
              Find Your Meal
            </Button>
          </Link>
        </motion.div>

        {/* Terms & Login Links */}
     

        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 font-semibold">Log in</Link>
        </p>
      </div>
    </div>
  );
}
