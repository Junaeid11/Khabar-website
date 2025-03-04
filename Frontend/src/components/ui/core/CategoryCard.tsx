import { ICategory } from "@/types";
import Image from "next/image";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md transition-transform transform hover:scale-105 hover:bg-purple-500 hover:text-white duration-300">
        <h3 className="text-lg font-semibold text-center">{category?.name}</h3>
      </div>
  
  );
};

export default CategoryCard;