"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import logo from "./../../../../assets/Screenshot 2025-03-01 014710_prev_ui.png";

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setIsLoading } = useUser();
  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const {
    formState: { isSubmitting },
    setValue,
  } = form;
  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  const autofillCredentials = async (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
    setReCaptchaStatus(true);
    await form.handleSubmit(onSubmit);
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      if (!reCaptchaStatus) {
        toast.error("Please complete the reCAPTCHA.");
        return;
      }
     
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        router.push(redirect || "/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div
      className="flex h-screen bg-black"
      style={{
        backgroundImage:
          "url(https://static.vecteezy.com/system/resources/previews/008/660/558/non_2x/organic-food-background-hand-drawn-concept-free-vector.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md m-auto bg-amber-500/45 bg-opacity-95 rounded-lg shadow-xl p-8">

        <div className="flex justify-center mb-4">
          <Link href="/">
            <Image src={logo} alt="Logo" width={170} height={60} />
          </Link>
        </div>
        <div className="flex justify-between mb-4">
          <Button
            onClick={() => autofillCredentials("user12@gmail.com", "tanim121")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            User Credentials
          </Button>
          <Button
            onClick={() => autofillCredentials("provider@gmail.com", "provider123")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Provider Credentials
          </Button>
        </div>

        {/* Login Form */}
        <Form {...form}>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Email Field */}
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      className="w-full border-gray-300 rounded-md p-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="w-full border-gray-300 rounded-md p-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ReCAPTCHA */}
            <div className="mt-4 flex items-center justify-center">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
                onChange={handleReCaptcha}
              />
            </div>

            {/* Login Button */}
            <Button
              disabled={!reCaptchaStatus}
              onClick={form.handleSubmit(onSubmit)}
              className="mt-5 w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-3"
            >
              {isSubmitting ? "Logging in..." : "LOGIN"}
            </Button>

            {/* Signup Link */}
            <p className="text-sm text-gray-600 text-center my-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-red-600 hover:underline">
                Sign up
              </Link>
            </p>
          </motion.form>
        </Form>
      </div>
    </div>
  );
}
