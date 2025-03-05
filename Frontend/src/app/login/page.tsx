"use client";

import { Suspense } from "react";
import LoginForm from "@/components/modules/auth/login/LoginForm";
import Loading from "@/components/ui/loading";

const LoginPage = () => {
  return (
    <div className="mx-auto">
      <Suspense fallback={<div><Loading/></div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};


export default LoginPage;
