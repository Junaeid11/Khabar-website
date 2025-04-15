
import NMContainer from "@/components/ui/core/NMContainer";
import OfferCard from "@/components/ui/core/OfferCard";
import { getAllMeal } from "@/services/meal";
import { IMeal } from "@/types/meal";

const OfferMeals = async () => {
  const { data: meals } = await getAllMeal();

  return (
    <div className="">
      <NMContainer className="my-16">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold">Offer Meals</h2>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {meals?.slice(3, 6).map((product: IMeal, idx: number) => (
            <OfferCard key={idx} meal={product} />
          ))}
        </div>
      </NMContainer>
    </div>
  );
};

export default OfferMeals;
