'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PlansSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between  max-w-6xl mx-20">

      <div 
        className="relative w-80 h-80 md:w-[450px] md:h-[450px] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://cdn.prod.website-files.com/5f8777f972356e39b046d89f/5f8ba9295eb38664d61c0857_blob_group_1.svg')",
          margin:"0 20",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          className="relative w-64 h-64 md:w-96 md:h-96"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        >
          <Image
            src="https://cdn.prod.website-files.com/5f8777f972356e39b046d89f/5f890629fdc8820b90a154c3_food-2.png"
            alt="Plated Meal"
            layout="fill"
            objectFit="contain"
            className="rounded-full"
          />
        </motion.div>
      </div>

      {/* Text Section */}
      <div className="max-w-lg text-center md:text-left mt-8 md:mt-0">
        <h2 className="text-3xl font-bold font-serif text-gray-900">Meal plans made for your lifestyle</h2>
        <p className="text-gray-600 mt-4">
        At <span className='text-xl font-extrabold text-purple-600'>Khabar</span>, we understand that everyone’s lifestyle is unique. That&#39;s why our meal plans are crafted to fit your specific needs, whether you&rsquo;re looking for convenience, taste, or nutrition. From breakfast to dinner, we&#39;ve got you covered every step of the way.
        </p>
        <ul className="mt-6 space-y-2">
          <li className="flex items-center gap-2 text-red-600 font-semibold">
            📋 Choose your meals
          </li>
          <li className="flex items-center gap-2 text-red-600 font-semibold">
            🍽️ We cook & deliver
          </li>
          <li className="flex items-center gap-2 text-red-600 font-semibold">
            🔥 Heat & eat
          </li>
          <li className="flex items-center gap-2 text-red-600 font-semibold">
            ❤️ Enjoy & Repeat
          </li>
        </ul>
      </div>
    </section>
  );
}
