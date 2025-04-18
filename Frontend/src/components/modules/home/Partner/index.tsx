"use client";

import NMContainer from "@/components/ui/core/NMContainer";
import { motion } from "framer-motion";
import Image from "next/image";

const deliveryPartners = [
  { id: 3, name: "Grubhubbb", logo: "https://img.freepik.com/free-vector/flat-design-antojitos-logo-design-template_23-2149599172.jpg?ga=GA1.1.1270781558.1728510980&semt=ais_hybrid" },
  { id: 4, name: "Postmatesss", logo: "https://img.freepik.com/free-vector/restaurant-tasty-food-logo-design_460848-10307.jpg?ga=GA1.1.1270781558.1728510980&semt=ais_hybrid" },
  { id: 5, name: "ZomatoVai", logo: "https://img.freepik.com/free-vector/ecofood-logo-template_1195-33.jpg?ga=GA1.1.1270781558.1728510980&semt=ais_hybrid" },
  { id: 6, name: "SwiggyKha", logo: "https://img.freepik.com/premium-vector/food-drink-company-logo-template_1286368-96481.jpg?ga=GA1.1.1270781558.1728510980&semt=ais_hybrid" },
];

const PartnersSection = () => {
  return (
 <NMContainer>
     <div className="min-h-60  overflow-hidden">
      <h2 className="text-center text-3xl font-serif md:text-3xl font-bold mb-6 text-gray-900 dark:text-white py-10">
        Our Food Delivery Partners
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-8 min-w-max"
          initial={{ x: 0 }}
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
        >
          {[...deliveryPartners, ...deliveryPartners].map((partner, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="w-[120px] h-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
 </NMContainer>
  );
};

export default PartnersSection;
