'use client';
import { TBlog } from '@/types/blog';
import Image from 'next/image';
import { FaUser, FaCalendarAlt, FaTag, FaListUl, FaBookOpen } from 'react-icons/fa';

const BlogDetails = ({ blog }: { blog: TBlog }) => {
   
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Image */}
      <div className="relative w-full h-[450px]">
        <Image src={blog.image} alt={blog.title} layout="fill" objectFit="cover" className="w-full h-full" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg text-center px-4">{blog.title}</h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-6">
        {/* Blog Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-800" />
            <span className="font-semibold">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-800" />
            <span>{new Date(blog.createdAt).toDateString()}</span>
          </div>
        </div>

        {/* Blog Content */}
        <p className="text-gray-700 text-lg mt-6 leading-relaxed">{blog.content}</p>

        {/* Ingredients Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaListUl className="text-green-600" /> Ingredients
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
            {blog.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaBookOpen className="text-blue-600" /> Instructions
          </h2>
          <ol className="list-decimal pl-6 text-gray-700 space-y-2 mt-2">
            {blog.instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Tags Section */}
        <div className="mt-8 flex flex-wrap gap-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaTag className="text-yellow-500" /> Tags:
          </h2>
          {blog.tags && blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full flex items-center gap-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
