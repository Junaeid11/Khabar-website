
import DeliverySection from "@/components/modules/home/delevery";
import FeatureMeals from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/HeroSection";

const HomePage = async () => {
  return (
    <div>
      <HeroSection />
      <DeliverySection />
      <FeatureMeals/>
    
    </div>
  );
};

export default HomePage;
