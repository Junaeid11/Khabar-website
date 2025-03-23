"use client";
;

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
    console.log(messageData)
    const toastId = toast.loading("Loading...");
  
    try {
      const res = await createContact(messageData);
      console.log(res)
      if (res.success) {
        toast.success("Message Sent", { id: toastId, duration: 2000 });
        reset();
      } else {
        toast.error("Message send failed", { id: toastId });
      }
    } catch (err) {
    }
  };
  
  return (
<div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
  <div className="flex flex-wrap bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden max-w-5xl w-full">
    <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gray-100 dark:bg-gray-900 p-10">
      <FaEnvelopeOpenText className="text-6xl text-gray-600 dark:text-gray-300 mb-5" />
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white text-center">
        HAVE SOME QUESTIONS?
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-3 text-center">
        Feel free to reach out. We will get back to you as soon as possible.
      </p>
    </div>
    <div className="w-full md:w-1/2 p-12 flex justify-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="name" className="mb-3 block text-base font-medium dark:text-white text-[#07074D]">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="mb-3 dark:text-white block text-base font-medium text-[#07074D]">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@domain.com"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="mb-3 dark:text-white block text-base font-medium text-[#07074D]">
              Message
            </label>
            <textarea
              rows={4}
              id="message"
              placeholder="Type your message"
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && <p className="text-red-500">{errors.message.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full border border-red-500 dark:border-red-500 text-red-500 dark:text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-400 hover:text-black dark:hover:bg-red-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );

};

export default ContactPage;
