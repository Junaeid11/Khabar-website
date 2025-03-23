import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard";
import { getAllMeal } from "@/services/meal";
import { IMeal } from "@/types/meal";
import Link from "next/link";

const FeatureMeals = async () => {
  const { data: meals } = await getAllMeal();

  return (
    <div className=" bg-white/15 mx-10 bg-opacity-50 pt-6 pb-8">

        <div className=" text-center items-center justify-between ">
          <h2 className="text-3xl font-bold">Meal Menus</h2>

        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-10">
          {meals?.slice(0, 4).map((product: IMeal, idx: number) => (
            <ProductCard key={idx} meal={product} />
          ))}
        </div>
        <div className="text-center pt-10">
  <Link href="/find-meals">
    <Button 
      variant="outline" 
      className="px-6 py-3 text-lg font-semibold rounded-full border-1 border-black text-violet-500 hover:bg-violet-500 hover:text-white transition duration-300 shadow-md"
    >
      🍽️ View All Meals
    </Button>
  </Link>
</div>


    </div>
  );
};

export default FeatureMeals;
