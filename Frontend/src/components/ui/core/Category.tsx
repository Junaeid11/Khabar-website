'use client';

import { ICategory } from '@/types/category';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-amber-200/20 border-2 border-dashed border-yellow-400 rounded-xl p-4 shadow-md transition-transform duration-300 hover:shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 250 }}
    >
      {category.icon && (
        <motion.div
          className="relative w-24 h-24 mb-3 rounded-full overflow-hidden border-4 border-white shadow-md"
          whileHover={{ rotate: 360 }} // Rotate image on hover
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <Image
            src={category.icon}
            alt={category.name}
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      )}

      <span className="text-black text-xl  font-bold text-center">
        {category.name}
      </span>
    </motion.div>
  );
};

export default CategoryCard
