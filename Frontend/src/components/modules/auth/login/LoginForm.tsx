"use client";

import { motion } from "framer-motion";
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
import { useState } from "react";
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

  const autofillCredentials = (role: "user" | "provider") => {
    if (role === "user") {
      setValue("email", "user12@gmail.com");
      setValue("password", "tanim121");
    } else {
      setValue("email", "provider@gmail.com");
      setValue("password", "provider123");
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
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
    <div className="flex h-screen bg-gray-100" style={{
      backgroundImage:
      "url(https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-black-meat-western-food-banner-background-image_194600.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="w-full max-w-md m-auto bg-black bg-opacity-95 rounded-lg shadow-xl p-8">
        <div className="flex justify-center mb-4">
          <Image src={logo} alt="Logo" width={170} height={60} />
        </div>

        <div className="flex justify-between mb-4">
          <Button onClick={() => autofillCredentials("user")} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            User Credentials
          </Button>
          <Button onClick={() => autofillCredentials("provider")} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Provider Credentials
          </Button>
        </div>

        <Form {...form}>
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="w-full border-gray-300 rounded-md p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="w-full border-gray-300 rounded-md p-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex items-center justify-center">
              <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!} onChange={handleReCaptcha} />
            </div>

            <Button
              disabled={!reCaptchaStatus}
              onClick={form.handleSubmit(onSubmit)}
              className="mt-5 w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-3"
            >
              {isSubmitting ? "Logging in..." : "LOGIN"}
            </Button>

            <p className="text-sm text-gray-600 text-center my-4">
              Don&apos;t have an account? <Link href="/register" className="text-red-600 hover:underline">Sign up</Link>
            </p>
          </motion.form>
        </Form>
      </div>
    </div>
  );
}
