import Link from "next/link";
import { Facebook, Github, Linkedin, Twitter, Instagram } from "lucide-react"; // Import colorful icons

const Footer = () => {
    return (
        <footer className="flex mx-auto mt-10 pt-10 h-full text-white bg-slate-100 dark:bg-black dark:text-white flex-col space-y-10 justify-center py-5">
            <div className="flex place-content-center">
                <h1 className="text-black dark:text-white text-center font-extrabold text-3xl">Noob Work</h1>
            </div>

            <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
                <Link href="/" className="hover:text-gray-900">Home</Link>
                <Link href="/projects" className="hover:text-gray-900">Projects</Link>
                <Link href="/blog" className="hover:text-gray-900">Blog</Link>
                <Link href="/contact" className="hover:text-gray-900">Contact</Link>
            </nav>

            <div className="flex justify-center space-x-5">
                {/* Social Icons with Colors */}
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
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="w-7 h-7 text-pink-600 hover:scale-110 transition-transform" />
                </a>
            </div>

            <p className="text-center text-gray-700 font-medium mb-10">&copy; 2025 Noob Ltd. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
