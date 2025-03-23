"use client";

import { getAllReview } from "@/services/Review";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReviewCard from "@/components/ui/core/Reviewcard";
import { TReview } from "@/types/review";

const Testimonial = () => {
  const [review, setReview] = useState<TReview[]>([]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await getAllReview();
        setReview(data.result);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReview();
  }, []);

  return (
      <div className="bg-opacity-50 py-8 mx-10 overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-serif font-bold text-center mb-6"
        >
          Testimonial
        </motion.h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            {[...review, ...review].map((reviewItem, index) => (
              <div key={index} className="w-72 flex-shrink-0">
                <ReviewCard  review={reviewItem} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
  );
};

export default Testimonial;
