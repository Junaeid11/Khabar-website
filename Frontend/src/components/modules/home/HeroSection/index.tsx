"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden ">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://wallpapers.com/images/hd/hd-food-background-d3zblbn8v3apa4mx.jpg)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Overlay for Contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Box */}
      <motion.div
        className="relative bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl text-center max-w-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Title */}
        <motion.h1
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Chef Crafted Meals <br /> Deliciously Delivered!
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-200 mt-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Enjoy healthy, chef-prepared meals delivered straight to your door.
          Fresh, delicious, and hassle-free!
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Link href="/find-meals">
            <Button className="bg-yellow-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition-transform hover:scale-105">
              Find Your Meal
            </Button>
          </Link>
        </motion.div>

        {/* Sign Up Link */}
        <p className="mt-3 text-sm text-gray-300">
          Don&#39;t have an account?{" "}
          <Link href="/register" className="text-yellow-400 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
