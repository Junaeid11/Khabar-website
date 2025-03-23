import Link from "next/link";

export default function About() {
    return (
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] flex items-center justify-center bg-cover bg-center bg-[url('/path-to-your-image.jpg')]">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <h1 className="relative text-white text-4xl md:text-6xl font-bold">About Us</h1>
        </section>
  
        {/* About Content */}
        <section className="container mx-auto px-6 md:px-12 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Who We Are</h2>
          <p className="mt-4 text-gray-600 text-lg md:w-3/4 mx-auto">
            We are a passionate meal delivery service bringing fresh, delicious, and healthy meals straight to your doorstep. Our goal is to provide convenient, nutritious, and affordable meals for everyone.
          </p>
        </section>
  
        {/* Our Mission */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            <p className="mt-4 text-gray-600 text-lg">
              We aim to make mealtime stress-free by offering carefully curated meal plans with high-quality ingredients, catering to various dietary needs.
            </p>
          </div>
        </section>
  
        {/* Services Section */}
        <section className="container mx-auto px-6 md:px-12 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800">What We Offer</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold text-gray-700">Fresh Ingredients</h3>
              <p className="mt-2 text-gray-600">We use only the freshest ingredients to prepare your meals.</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold text-gray-700">Variety of Meals</h3>
              <p className="mt-2 text-gray-600">A diverse menu that suits different tastes and dietary preferences.</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold text-gray-700">Fast Delivery</h3>
              <p className="mt-2 text-gray-600">Get your meals delivered to your doorstep quickly and efficiently.</p>
            </div>
          </div>
        </section>
  
        {/* Call-to-Action */}
        <section className="bg-[#7B2CBF] text-white py-16 text-center">
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
  