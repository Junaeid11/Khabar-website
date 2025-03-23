import Link from "next/link";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

import logo from "../../assets/Screenshot 2025-03-01 014710_prev_ui.png";

const Footer = () => {
  return (
    <footer className="bg-yellow-400 text-black px-10 pt-10 rounded-t-3xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <Link href="/">
            <Image src={logo} height={150} width={250} alt="logo" />
          </Link>
          <p className="mt-3 text-sm">
            Discover culinary delights, recipes, and inspiration in our food haven.
          </p>
          <p className="mt-3 text-sm font-semibold">MON-FRI: 8:00 AM - 6:00 PM</p>
          <p className="text-sm font-semibold">SATURDAY: 9:00 AM - 5:00 PM</p>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="font-bold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:underline">Company Profile</Link></li>
            <li><Link href="#" className="hover:underline">About</Link></li>
            <li><Link href="#" className="hover:underline">Help Center</Link></li>
            <li><Link href="#" className="hover:underline">Career</Link></li>
            <li><Link href="#" className="hover:underline">Features</Link></li>
            <li><Link href="#" className="hover:underline">Explore</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold mb-3">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-black rounded-full"></span> 175 10th Street, Office 375, Berlin, DE 21562
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-black rounded-full"></span> +123 34598768 <br /> +554 34598734
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-black rounded-full"></span> food@restan.com
            </li>
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="bg-white/75 w-50% rounded-t-2xl flex flex-col items-center py-2 mt-8">
        <div className="flex space-x-5">
        <a href="https://www.facebook.com/junaeid.ahmed.450013" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="w-7 h-7 text-blue-600 hover:scale-110 transition-transform" />
                </a>
                <a href="https://github.com/Junaeid11" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="w-7 h-7 text-gray-800 hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.linkedin.com/in/junaeid-ahmed-tanim-765651285/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="w-7 h-7 text-blue-700 hover:scale-110 transition-transform" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="w-7 h-7 text-blue-400 hover:scale-110 transition-transform" />
                </a>
            
        </div>
      </div>
    </footer>
  );
};

export default Footer;
