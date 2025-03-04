import ProductCard from "@/components/ui/core/ProductCard";
import { IMeal } from "@/types";
import FilterSidebar from "./filterSidebar";

const AllProducts = ({ meals }: { meals: IMeal[] }) => {
  return (
    <div className="flex gap-8 my-10">
      <div className="w-full max-w-sm">
        <FilterSidebar />
      </div>
      <div>
        <div className="grid grid-cols-3 gap-8">
          {meals?.map((meal: IMeal, idx: number) => (
            <ProductCard key={idx} meal={meal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
