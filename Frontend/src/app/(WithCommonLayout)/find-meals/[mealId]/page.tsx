
import ProductDetails from "@/components/modules/products/productDetails";
import ReviewCard from "@/components/modules/products/Review";
import { getSingleMeal } from "@/services/meal";

const ProductDetailsPage = async ({params}:{params: any}) => {
  const { mealId } = await params;

  const { data: meal } = await getSingleMeal(mealId);
  console.log(meal);

  return (
    
      <div className="flex justify-center items-center mx-auto my-10">
        <ProductDetails meal={meal} />
     
 
      </div>
  );
};

export default ProductDetailsPage;
