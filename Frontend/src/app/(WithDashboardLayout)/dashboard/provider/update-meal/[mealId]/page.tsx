
import UpdateMealForm from "@/components/ui/core/UpdateMealForm";
import { getSingleMeal } from "@/services/meal";

const UpdateMeal = async ({params}:{params: any}) => {
  const { mealId } = await params;

  const { data: meal } = await getSingleMeal(mealId);


  return (
    
      <div className="">
        <UpdateMealForm meal={meal} />
     
 
      </div>
  );
};

export default UpdateMeal;
