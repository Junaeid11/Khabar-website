import { motion } from "framer-motion";
import { TReview } from "@/types/review";
import { Star } from "lucide-react";
import Image from "next/image";

interface ReviewCardProps {
  review: TReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review}) => {
  const { user, rating, meal,review: comment } = review;


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 flex flex-col gap-4"
    >
      {meal && (
        <div className="flex justify-center items-center gap-3 dark:border-gray-700 pt-3">
          <Image
            width={70}
            height={70}
            src={meal?.imageUrls?.[0] || "https://via.placeholder.com/70"}
            alt={meal?.name}
            className="w-16 h-16 object-cover rounded-lg shadow-md"
          />
          <h1>{meal.name}</h1>
     
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center font-bold text-lg text-gray-800 dark:text-white">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            {user?.name || "Anonymous"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* User Comment */}
      <p className="text-gray-700 dark:text-gray-300 text-base italic leading-relaxed font-medium">
     &#34;{comment}&#34;
      </p>

      {/* Rating Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={20}
            className={index < rating ? "text-red-500" : "text-gray-300 dark:text-gray-600"}
          />
        ))}
      </div>

      {/* Meal Information */}
  
    </motion.div>
  );
};

export default ReviewCard;
