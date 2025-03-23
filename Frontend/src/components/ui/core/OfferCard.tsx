'use client';

import { IMeal } from '@/types/meal';
import Image from 'next/image';
import React from 'react';

const OfferCard = ({ meal }: { meal: IMeal }) => {
  return (
    <div className="relative rounded-xl shadow-lg overflow-hidden p-4 transition-transform transform hover:scale-105 duration-300">
      <div className="relative">
        <Image 
          width={400} 
          height={300} 
          src={meal.imageUrls[0]} 
          alt={meal.name} 
          className="w-full h-64 object-cover rounded-lg" 
        />
        
        {/* Discount Badge */}
        <div className="absolute top-4 left-4 bg-black/80 text-white text-lg font-bold px-3 py-1 rounded-md">
          25% Off
        </div>
        
        {/* Price Tag */}
        <div className="absolute top-6 right-6 bg-red-500 text-white font-bold px-4 py-2 rounded-full transform rotate-[-15deg] shadow-md">
          ${meal.price.toFixed(2)}
        </div>
      </div>
      <div className="absolute bottom-0 text-3xl font-serif left-0 w-full bg-gradient-to-t from-black/100 to-transparent p-4 text-white text-center">
        <h3 className="text-xl font-bold">{meal.name}</h3>
      </div>
    </div>
  );
};

export default OfferCard;