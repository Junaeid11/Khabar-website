"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TopSellingCard from "@/components/ui/core/TopSellingCard";
import { getAllMeal } from "@/services/meal";
import { IMeal } from "@/types/meal";

const TopSellingDishes = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await getAllMeal();
        setMeals(data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="  py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" text-3xl font-serif font-bold text-center mb-6"
        >
          Top Selling Dishes
        </motion.h2>
        <Swiper
          spaceBetween={15}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full"
        >
          {meals.map((meal) => (
            <SwiperSlide key={meal._id}>
              <TopSellingCard meal={meal} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopSellingDishes;
