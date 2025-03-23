
import Category from "@/components/modules/home/Category";
import WhyChooseUs from "@/components/modules/home/ChooseUs";
import DeliverySection from "@/components/modules/home/delevery";
import FAQSection from "@/components/modules/home/FAQ";
import FeatureMeals from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/HeroSection";
import NewsLatterSection from "@/components/modules/home/Newslatter";
import OfferMeals from "@/components/modules/home/Offer";
import PartnersSection from "@/components/modules/home/Partner";
import PlansSection from "@/components/modules/home/PlansSection";
import RecipeBlogs from "@/components/modules/home/Recipe-Blog";
import Testimonial from "@/components/modules/home/Testimonial";
import TopSellingDishes from "@/components/modules/home/TopSelling";

const HomePage = async () => {
  return (
    <div>
      <HeroSection />
     
      <Category/>
      <TopSellingDishes/>
      <DeliverySection />
      <PlansSection/>
      <FeatureMeals/>
      <PartnersSection/>
      <OfferMeals/>
      <RecipeBlogs/>
      <Testimonial/>
      <WhyChooseUs/>
      <FAQSection/>
      <NewsLatterSection/>

    
    </div>
  );
};

export default HomePage;
