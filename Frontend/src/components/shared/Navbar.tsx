"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  LogOut,
  ShoppingCart,
  Menu,
  Home,
  Book,
  Contact,
  Info,
  Utensils,
  X,
} from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

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
    { href: "/find-meals", label: "Meals", icon: <Utensils className="w-5 h-5" /> },
    { href: "/blogs", label: "Blogs", icon: <Book className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <Contact className="w-5 h-5" /> },
    { href: "/about", label: "About", icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fce7b2] shadow-md rounded-b-2xl">
      <div className="container mx-auto flex justify-between items-center h-16 px-5">
        <Link href="/">
          <Image src={logo} height={50} width={150} alt="logo" />
        </Link>
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden flex absolute top-16 left-0 w-full bg-white shadow-md p-5 z-50"
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map(({ href, label, icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-2 p-3 rounded-md ${pathname === href ? "text-[#7a20e1] font-bold bg-indigo-100" : "text-black hover:text-[#7B2CBF]"
                        }`}
                    >
                      {icon}
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
        <nav className="hidden md:flex items-center  ml-20 gap-2">
          {navLinks.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 p-2 ${pathname === href ? "text-[#7a20e1] font-bold" : "text-black hover:text-[#7B2CBF]"
                }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          {user?.role === "customer" && (
            <Link href="/order-meal">
              <Button variant="outline" className="rounded-full flex items-center gap-1">
                <ShoppingCart className="w-5 h-5" />
                <span className="text-[#E63946] font-bold">{products?.length ?? 0}</span>
              </Button>
            </Link>
          )}
        <div className="hidden md:flex">
        {user?.role === "provider" && (
            <Link href="post-meal-menu">
              <Button
                className="rounded-full hover:bg-amber-500 hover:text-[#181818] bg-indigo-500 text-white font-extrabold px-5 py-2 text-sm sm:px-3 sm:py-1 sm:text-xs"
              >
                Add New Meal
              </Button>
            </Link>
          )}
        </div>


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
                <DropdownMenuItem className="bg-[#7B2CBF] text-white cursor-pointer" onClick={handleLogOut}>
                  <LogOut />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="rounded-full bg-amber-500 text-white" variant="outline">Login</Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

    </header>

  );
}
