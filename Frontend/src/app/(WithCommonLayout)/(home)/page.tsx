
import DeliverySection from "@/components/modules/home/delevery";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts"; 
import HeroSection from "@/components/modules/home/HeroSection";

const HomePage = async () => {
  return (
    <div>
      <HeroSection />
      <DeliverySection />
      <FeaturedProducts />
    
    </div>
  );
};

export default HomePage;
