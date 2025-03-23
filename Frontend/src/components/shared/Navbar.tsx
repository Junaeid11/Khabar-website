"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { LogOut, ShoppingCart, Menu, Home, Book, Contact, Info, Utensils } from "lucide-react";
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
import Image from "next/image";
import logo from "../../assets/Screenshot 2025-03-01 014710_prev_ui.png";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const products = useAppSelector(orderedProductsSelector);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    {
      href: "/find-meals",
      label: "Meals",
      icon: <Utensils className="w-5 h-5" />,
     
    },
    { href: "/blogs", label: "Blogs", icon: <Book className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <Contact className="w-5 h-5" /> },
    { href: "/about", label: "About", icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fce7b2] mx-auto shadow-md rounded-b-2xl">
      <div className="container mx-auto flex justify-between items-center h-16 px-5">
        <Link href="/">
          <Image src={logo} height={50} width={150} alt="logo" />
        </Link>

        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>

        <nav
          className={`grid md:flex items-center space-x-6 ${
            isOpen ? "block" : "hidden"
          } absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-5 md:p-0 z-50`}
        >
          {navLinks.map(({ href, label, icon, }) => (
            <div key={href} className="relative group">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: pathname === href ? "100%" : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute  left-0 h-1 "
              />
              <Link
                href={href}
                className={`flex items-center gap-2 py-2 md:py-0 ${
                  pathname === href
                    ? "text-[#7a20e1] font-bold"
                    : "text-black hover:text-[#7B2CBF]"
                }`}
                
              >
                {icon}
                {label}
              </Link>

            </div>
          ))}

          {user?.role === "customer" && (
            <Link href="/order-meal" passHref>
              <Button variant="outline" className="rounded-full flex items-center gap-1">
                <ShoppingCart className="w-5 h-5" />
                <span className="text-[#E63946] font-bold">{products?.length ?? 0}</span>
              </Button>
            </Link>
          )}

          {user?.role === "provider" && (
            <Link href="post-meal-menu">
              <Button className="rounded-full hover:bg-amber-500 hover:text-[#181818] bg-indigo-500 text-white font-extrabold">
                Add New Meal
              </Button>
            </Link>
          )}

          {user?.email ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://cdn-icons-png.flaticon.com/512/4264/4264818.png" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`/dashboard/${user?.role}/`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="bg-[#7B2CBF] text-white cursor-pointer"
                  onClick={handleLogOut}
                >
                  <LogOut />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
