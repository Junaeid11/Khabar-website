'use client';

import { IMeal } from '@/types/meal';
import Image from 'next/image';
import React from 'react';

const OfferCard = ({ meal }: { meal: IMeal }) => {
  return (
    <div className="relative  rounded-xl shadow-lg overflow-hidden p-4">
      <div className="relative">
        <Image width={400} height={300} src={meal.imageUrls[0]} alt={meal.name} className="w-full h-64 object-cover rounded-lg" />
        <div className="absolute top-4 left-4 bg-black/80 text-white text-lg font-bold px-3 py-1 rounded-md">
          25% Off
        </div>
        <div className="absolute top-6 right-6 bg-red-500 text-white font-bold px-4 py-2 rounded-full transform rotate-[-15deg] shadow-md">
          ${meal.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
