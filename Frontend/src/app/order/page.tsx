"use client";

import { Suspense } from "react";
import { ThankYouContent } from "@/components/ui/core/OrderThanksCard";
import Loading from "@/components/ui/loading";

const ThankYou = () => {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <ThankYouContent />
    </Suspense>
  );
};

export default ThankYou;
