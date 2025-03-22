import { TBlog } from "@/types/blog";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaClock, FaUtensils, FaTag } from "react-icons/fa";

const RecipeBlogCard = ({ blogs }: { blogs: TBlog }) => {
  return (
    <motion.div
      className="bg-amber-400/20 rounded-lg p-6 max-w-sm mx-auto shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Recipe Image */}
      <div className="overflow-hidden rounded-lg">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            width={200}
            height={230}
            src={blogs.image}
            alt={blogs.title}
            className="w-full h-auto object-cover rounded-lg"
          />
        </motion.div>
      </div>

      {/* Recipe Title */}
      <h1 className="text-2xl font-semibold mt-4 text-red-600">{blogs.title}</h1>
      {/* Important Data with Icons */}
      <div className="mt-4 flex space-x-6 text-black">
        {/* Serving Size */}
        <div className="flex items-center space-x-2">
          <FaUtensils className="text-red-500" />
          <span className="text-sm">{blogs.servings} servings</span>
        </div>

        {/* Preparation Time */}
        <div className="flex items-center space-x-2">
          <FaClock className="text-red-500" />
          <span className="text-sm ">30 min</span> 
        </div>
      </div>

      {/* Tags */}
      <div className="mt-3 flex space-x-2 flex-wrap">
        {blogs.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-yellow-500 text-sm m-2 text-black py-1 px-3 rounded-full"
          >
            <FaTag className="inline mr-1" />
            {tag}
          </span>
        ))}
      </div>

      {/* Show More Button */}
      <Link href={`/blogs/${blogs._id}`}>
        <motion.button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Show More
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default RecipeBlogCard;
