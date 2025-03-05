
import MealDetails from "@/components/modules/Meals/MealDetails";
import { getSingleMeal } from "@/services/meal";

const ProductDetailsPage = async ({params}:{params: any}) => {
  const { mealId } = await params;

  const { data: meal } = await getSingleMeal(mealId);
  console.log(meal)


  return (
    
      <div className="flex justify-center items-center mx-auto my-10 w-screen">
        <MealDetails meal={meal} />
     
 
      </div>
  );
};

export default ProductDetailsPage;
