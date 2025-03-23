import { TBlog } from "@/types/blog";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaClock, FaUtensils, FaTag } from "react-icons/fa";

const RecipeBlogCard = ({ blogs }: { blogs: TBlog }) => {
  return (
    <motion.div
      className="bg-amber-400/15 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 max-w-sm mx-auto border border-gray-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Recipe Image */}
      <div className="relative overflow-hidden rounded-xl">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl"
        >
          <Image
            width={300}
            height={200}
            src={blogs.image}
            alt={blogs.title}
            className="w-full h-48 object-cover rounded-xl"
          />
        </motion.div>
      </div>

      {/* Recipe Title */}
      <h1 className="text-xl font-bold mt-4 text-gray-800 text-center">{blogs.title}</h1>

      {/* Recipe Info */}
      <div className="mt-4 flex justify-between text-gray-600 text-sm">
        <div className="flex items-center space-x-2">
          <FaUtensils className="text-red-500" />
          <span>{blogs.servings} servings</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaClock className="text-blue-500" />
          <span>30 min</span> 
        </div>
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        {blogs.tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-yellow-400/80 text-sm text-gray-800 py-1 px-3 rounded-full flex items-center gap-1"
          >
            <FaTag className="text-gray-700" />
            {tag}
          </span>
        ))}
      </div>

      {/* Show More Button */}
      <Link href={`/blogs/${blogs._id}`} passHref>
        <motion.button
          className="mt-5 px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg shadow-md hover:shadow-lg transition duration-200 w-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show More
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default RecipeBlogCard;
