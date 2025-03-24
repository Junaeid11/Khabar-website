"use client";

import { createContact } from "@/services/Contact";
import { useForm } from "react-hook-form";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { toast } from "sonner";

type UserData = {
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserData>();

  const onSubmit = async (messageData: UserData) => {
    console.log(messageData);
    const toastId = toast.loading("Loading...");

    try {
      const res = await createContact(messageData);
      console.log(res);
      if (res.success) {
        toast.success("Message Sent", { id: toastId, duration: 2000 });
        reset();
      } else {
        toast.error("Message send failed", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="grid lg:flex sm:flex-row bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden max-w-6xl w-full">

        {/* Left Section (Hidden on small screens) */}
        <div className=" flex flex-col justify-center items-center w-full sm:w-1/2 bg-gray-100 dark:bg-gray-900 p-8">
          <FaEnvelopeOpenText className="text-6xl text-gray-600 dark:text-gray-300 mb-5" />
          <h2 className="text-2xl font-bold text-gray-700 dark:text-white text-center">
            HAVE SOME QUESTIONS?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-center">
            Feel free to reach out. We will get back to you as soon as possible.
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full sm:w-1/2 p-8 sm:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            <div>
              <label htmlFor="name" className="block text-base font-medium dark:text-white text-[#07074D]">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base text-gray-700 outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-base font-medium dark:text-white text-[#07074D]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base text-gray-700 outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-base font-medium dark:text-white text-[#07074D]">
                Message
              </label>
              <textarea
                rows={4}
                id="message"
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-4 text-base text-gray-700 outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition-all duration-300"
              >
                Submit
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
