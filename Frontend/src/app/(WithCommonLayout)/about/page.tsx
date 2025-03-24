import Link from "next/link";
import Image from "next/image";
import { Leaf, Utensils, Truck, Users } from "lucide-react";

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center bg-[url('https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg')]">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="relative text-white text-5xl md:text-6xl font-bold">About Us</h1>
      </section>

      {/* About Content */}
      <section className="container mx-auto px-6 md:px-12 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Who We Are</h2>
        <p className="mt-4 text-gray-600 text-lg md:w-3/4 mx-auto">
          We are a dedicated meal delivery service, providing fresh, healthy, and delicious meals directly to your home. Our mission is to make nutritious eating easy and accessible for everyone.
        </p>
        <div className="mt-8 flex justify-center">
          <Image
            src="https://media.istockphoto.com/id/1446478805/photo/a-chef-is-finishing-the-preparation-of-the-plate.jpg?s=612x612&w=0&k=20&c=OoFoYYJ0_eun72wlt-lDzlYjY-CaLwphDgUyIApDu_I="
            alt="Healthy Meals"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-gray-600 text-lg">
            We strive to make mealtime stress-free by offering carefully curated meal plans made with fresh, high-quality ingredients, tailored to various dietary needs.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-6 md:px-12 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">What We Offer</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
            <Leaf className="w-12 h-12 text-green-600" />
            <h3 className="mt-4 text-xl font-bold text-gray-700">Fresh Ingredients</h3>
            <p className="mt-2 text-gray-600 text-center">We use only the freshest ingredients to prepare your meals.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
            <Utensils className="w-12 h-12 text-yellow-500" />
            <h3 className="mt-4 text-xl font-bold text-gray-700">Diverse Menu</h3>
            <p className="mt-2 text-gray-600 text-center">A variety of meals catering to different tastes and dietary needs.</p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center">
            <Truck className="w-12 h-12 text-blue-600" />
            <h3 className="mt-4 text-xl font-bold text-gray-700">Fast Delivery</h3>
            <p className="mt-2 text-gray-600 text-center">Meals delivered quickly to ensure freshness and convenience.</p>
          </div>
        </div>
      </section>


      {/* Call-to-Action */}
      <section className="bg-[#e5ab17] text-white py-16 text-center">
        <h2 className="text-3xl font-bold">Join Our Community</h2>
        <p className="mt-4 text-lg">Experience the best meal delivery service today!</p>
        <Link
          href="/find-meals"
          className="mt-6 inline-block bg-white text-[#7B2CBF] font-bold py-3 px-6 rounded-full transition-all hover:bg-gray-200"
        >
          Explore Meals
        </Link>
      </section>
    </div>
  );
}
