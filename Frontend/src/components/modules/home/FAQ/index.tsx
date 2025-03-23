'use client'
import { useState } from "react";
import Image from "next/image";
import NMContainer from "@/components/ui/core/NMContainer";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is KHABAR food delivery service?",
      answer: "KHABAR provides a quick and reliable meal delivery service with a variety of delicious meals, fresh ingredients, and fast delivery to your door.",
    },
    {
      question: "How do I place an order?",
      answer: "You can place an order by visiting our website, selecting your meal, and providing delivery details for a smooth ordering experience.",
    },
    {
      question: "What areas do you deliver to?",
      answer: "We currently deliver to major cities and suburban areas. You can check our delivery zones on our website or contact customer service for more details.",
    },
    {
      question: "Can I track my delivery?",
      answer: "Yes! Once your order is dispatched, you can track it live through our delivery tracking feature on the website or via our mobile app.",
    },
    {
      question: "Are there any discounts for first-time users?",
      answer: "Yes, we offer exclusive discounts and deals for first-time users. Make sure to check the 'Special Offers' section on our website.",
    },
  ];

  return (
   <NMContainer>
     <div className="py-10 ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        <div className="text-center mb-10">
          <p className="text-sm text-gray-500">F.A.Q</p>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h3>
        </div>

        <div className="flex items-center space-x-8">
          {/* FAQ Illustration Image */}
          <div className="flex-shrink-0">
            <Image
              src="https://cdni.iconscout.com/illustration/premium/thumb/faq-illustration-download-in-svg-png-gif-file-formats--customer-questions-interrogation-point-and-answers-helpful-information-q-a-whoooa-solid-1-pack-people-illustrations-3779152.png?f=webp"
              alt="FAQ Illustration"
              width={600}
              height={700}
              className="object-contain"
            />
          </div>

          {/* FAQ Accordion */}
          <div className="flex-1">
            <ul>
              {faqData.map((item, index) => (
                <li key={index} className="mb-6">
                  <div
                    onClick={() => toggleAccordion(index)}
                    className="cursor-pointer flex items-center justify-between p-5 bg-indigo-100 rounded-lg"
                  >
                    <h4 className="text-lg font-semibold text-gray-900">{item.question}</h4>
                    <svg
                      className={`transition-transform duration-300 transform ${activeIndex === index ? "rotate-180" : ""}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                  {activeIndex === index && (
                    <div className="mt-4 p-5 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{item.answer}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
   </NMContainer>
  );
};

export default FAQSection;
