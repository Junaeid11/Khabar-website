"use client";
import { Button } from "../ui/button";
import { Heart, LogOut, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/contants";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import { useState, useEffect } from "react";
import Image from 'next/image';
import logo from '../../assets/Screenshot 2025-03-01 014710_prev_ui.png';
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const products = useAppSelector(orderedProductsSelector);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/find-meal", label: "Meals" },

  ];

  return (
    <header

    >
      <div className="container  rounded-b-2xl flex justify-between items-center mx-auto h-16 px-5">
        {/* Logo */}
        <Image src={logo} height={200} width={200} alt="logo" />

        {/* Navigation links */}
        <nav className="flex items-center space-x-6 relative">
          {navLinks.map(({ href, label }) => (
            <div key={href} className="relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: pathname === href ? "100%" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-1 bg-red-500"
              />
              <Link
                href={href}
                className={`${pathname === href
                  ? "dark:text-red-500 text-red-500 font-bold"
                  : "text-black hover:text-red-500"
                  }`}
              >
                {label}
              </Link>
            </div>
          ))}

          {/* Cart button */}

          {user?.role === "customer" ? (
            <Link href="/cart" passHref>
              <Button variant="outline" className="rounded-full size-10 flex items-center justify-center gap-1">
                <ShoppingCart className="w-5 h-5" />


                <span className="text-red-500 font-bold">{products?.length ?? 0}</span>
              </Button>
            </Link>
          ) : (

            null

          )}


          {user?.role === "provider" ? (
            <Link href={"post-meal-menu"}>
              <Button className="rounded-full bg-indigo-500 text-white font-extrabold">Add New Meal</Button>
            </Link>
          ) : (

            null

          )}

          {user?.email ? (
            <>

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="transition-all duration-300 ease-in-out">
                  <Avatar>
                    <AvatarImage src="https://cdn-icons-png.flaticon.com/512/4264/4264818.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="transition-all duration-300 ease-in-out">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="bg-red-500 cursor-pointer" onClick={handleLogOut}>
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button className="rounded-full" variant="outline">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>

    </header>
  );
}
