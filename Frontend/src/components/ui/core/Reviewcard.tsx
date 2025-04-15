import { motion } from "framer-motion";
import { TReview } from "@/types/review";
import { Star } from "lucide-react";
import Image from "next/image";

interface ReviewCardProps {
  review: TReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { user, rating, meal, review: comment } = review;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="bg-amber-50 dark:bg-gray-800 rounded-2xl shadow-md p-5 flex flex-col justify-between gap-4 w-full max-w-sm h-[320px] transition-all"
    >
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-orange-300 dark:bg-gray-600 flex items-center justify-center text-lg font-bold text-white">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-semibold text-base text-gray-800 dark:text-white">
            {user?.name || "Anonymous"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Product Image + Name */}
      {meal && (
        <div className="flex items-center gap-4">
          <Image
            width={64}
            height={64}
            src={meal?.imageUrls?.[0] || "https://via.placeholder.com/70"}
            alt={meal?.name}
            className="w-16 h-16 rounded-lg object-cover shadow"
          />
          <div className="text-sm font-medium text-gray-800 dark:text-white">
            <h4 className="truncate max-w-[180px]">{meal.name}</h4>
          </div>
        </div>
      )}

      {/* Review Text */}
      <p className="text-gray-700 dark:text-gray-300 text-base italic leading-relaxed line-clamp-4">
        “{comment}”
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={18}
            className={index < rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ReviewCard;
