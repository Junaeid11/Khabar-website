import { ChevronRight } from "lucide-react"; // Importing an icon
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

      <Category />
      <section id="top-selling">
        <TopSellingDishes />
      </section>
      <section id="delivery">
        <DeliverySection />
      </section>
      <section id="plans">
        <PlansSection />
      </section>
      <section id="feature-meals">
        <FeatureMeals />
      </section>
      <section id="partners">
        <PartnersSection />
      </section>
      <section id="offers">
        <OfferMeals />
      </section>
      <section id="blogs">
        <RecipeBlogs />
      </section>
      <section id="testimonials">
        <Testimonial />
      </section>
      <section id="why-choose-us">
        <WhyChooseUs />
      </section>
      <section id="faq">
        <FAQSection />
      </section>
      <section id="newsletter">
        <NewsLatterSection />
      </section>
    </div>
  );
};

export default HomePage;
