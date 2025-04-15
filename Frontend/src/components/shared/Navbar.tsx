"use client";
import { useState, useRef, useEffect, useMemo } from "react";
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
  ChevronRight,
  CloudFog,
  Bot,
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
import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [user, setUser] = useState<IUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const products = useAppSelector(orderedProductsSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") || document.cookie.split('; ').find(row => row.startsWith('accessToken='));

    if (accessToken) {
      const decoded: any = jwtDecode(accessToken);
      const userData: any = {
        _id: decoded.userId,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        isActive: decoded.isActive,

      };

      setUser(userData);
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    await logout();
    setUser(null);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.replace("/");
    }
  };


  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/find-meals", label: "Meals", icon: <Utensils className="w-5 h-5" /> },
    { href: "/blogs", label: "Blogs", icon: <Book className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <Contact className="w-5 h-5" /> },
    { href: "/about", label: "About", icon: <Info className="w-5 h-5" /> },
    // ...(user?.email ? [{ href: `/dashboard/${user?.role}/`, label: "Dashboard", icon: <Bot className="w-5 h-5" /> }] : [])
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-tr from-amber-400 to-amber-500 shadow-md transition-all duration-300">

      <div className="container mx-auto flex justify-between items-center h-16 ">
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
              className="absolute top-16 left-0 w-full bg-white shadow-md p-5 z-50 md:hidden"
            >
              <ul className="flex flex-col gap-4 ">
                {navLinks.map(({ href, label, icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 p-3 rounded-md ${pathname === href ? "text-[#ee8319] font-bold bg-amber-100" : "text-black hover:text-[#bf3b2c]"}`}
                    >
                      {icon}
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>


              {user?.email ? (

                <Button onClick={handleLogOut} className="rounded-full bg-amber-500 text-white">Logout</Button>

              ) : (
                <Link href="/login">
                  <Button className="rounded-full bg-amber-800 hover:bg-amber-400 text-white">Login</Button>
                </Link>
              )}
            </motion.nav>
          )}

        </AnimatePresence>

        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg  transition-colors duration-300 ease-in-out ${pathname === href
                ? " text-orange-500 font-bold "
                : "text-black  hover:text-orange-500 "
                }`}
            >
              {label}
            </Link>
          ))}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 ml-5 text-black hover:text-[#bf422c]"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              More
              <span className="text-lg">▼</span>
            </button>


            {dropdownOpen && (
              <div className="absolute right-5 mt-2 w-[600px] bg-white shadow-lg rounded-lg p-4 z-50">
                <div className="grid grid-cols-3 gap-4">
                  {/* Category 1 */}
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#bfb02c]">Explore Sections</h3>
                    <a href="#top-selling" className="flex items-center text-gray-600 hover:text-[#bf6c2c] transition">
                      <ChevronRight className="mr-2" size={16} /> Top Selling Dishes
                    </a>
                    <a href="#delivery" className="flex items-center text-gray-600 hover:text-[#bf6c2c]transition">
                      <ChevronRight className="mr-2" size={16} /> Delivery Section
                    </a>
                    <a href="#plans" className="flex items-center text-gray-600 hover:text-[#bf6c2c] transition">
                      <ChevronRight className="mr-2" size={16} /> Plans Section
                    </a>
                  </div>

                  {/* Category 2 */}
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#bfb02c]">More Features</h3>
                    <a href="#feature-meals" className="flex items-center text-gray-600 hover:text-[#bf6c2c] transition">
                      <ChevronRight className="mr-2" size={16} /> Featured Meals
                    </a>
                    <a href="#partners" className="flex items-center text-gray-600 hover:text-[#bf6c2c] transition">
                      <ChevronRight className="mr-2" size={16} /> Partners
                    </a>
                    <a href="#offers" className="flex items-center text-gray-600 hover:text-[#bf6c2c] transition">
                      <ChevronRight className="mr-2" size={16} /> Offers & Discounts
                    </a>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#bfb02c]">Information</h3>
                    <a href="#blogs" className="flex items-center text-gray-600 hover:text-[#bf6c2c] transition">
                      <ChevronRight className="mr-2" size={16} /> Recipe Blogs
                    </a>
                    <a href="#testimonials" className="flex items-center text-gray-600 hover:text-[#bf6c2c] transition">
                      <ChevronRight className="mr-2" size={16} /> Testimonials
                    </a>
                    <a href="#faq" className="flex items-center text-gray-600 hover:text-[#bf6c2c] transition">
                      <ChevronRight className="mr-2" size={16} /> FAQs
                    </a>
                  </div>
                </div>
              </div>
            )}


          </div>
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
          <div className=" lg:flex">
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
                  <DropdownMenuItem className="bg-amber-400 text-black cursor-pointer" onClick={handleLogOut}>
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="rounded-full bg-gradient-to-r from-amber-700 to-orange-500 hover:bg-amber-300 text-white">Login</Button>
              </Link>
            )}
            <button className="lg:hidden px-2  rounded-md" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
