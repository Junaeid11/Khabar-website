"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative flex h-[80vh] items-center justify-center bg-cover bg-center "
    style={{
      backgroundImage:
        "url(https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      backgroundSize: "cover",
      backgroundPosition: "center",

      borderRadius:'20px'


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
          <Link href="/find-meals">
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
