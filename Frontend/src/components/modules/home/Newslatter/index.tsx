"use client";

import { Button } from '@/components/ui/button';
import NMContainer from '@/components/ui/core/NMContainer';
import { addSubscription } from '@/services/Subscribe';
import React, { useState } from 'react';
import { toast } from 'sonner';

const NewsLatterSection = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const subscribeData = { email }; // Ensure this matches backend expectation
            console.log("Sending data:", subscribeData);
    
            const res = await addSubscription(subscribeData);
            console.log("Response:", res);
    
            if (res.success) {
                toast.success(res.message);
                setEmail("");
            } else {
                toast.error(res.message);
            }
        } catch (err: any) {
            toast.error("Something went wrong. Please try again.");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
       <NMContainer className='px-5'>
         <section
            className="w-full rounded-2xl mb-5 min-h-screen bg-cover bg-center flex items-center justify-center relative"
            style={{
                backgroundImage: "url('https://cdn.magicdecor.in/com/2023/09/29153817/Fast-Food-Banner-Background-for-Wall-1-710x488.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

            <div className="relative max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-xl">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-semibold text-white text-center">
                    Subscribe to <span className="text-yellow-500 font-bold">Our Newsletter</span>
                </h2>
                <p className="text-gray-200 mt-2 text-center">
                    Get exclusive offers, meal updates, and delicious discounts delivered straight to your inbox.
                </p>

                {/* Input Field & Button */}
                <div className="mt-6 flex justify-center">
                    <div className="flex bg-white/90 shadow-lg rounded-full overflow-hidden w-full max-w-lg">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="px-4 py-3 w-full text-gray-700 focus:outline-none"
                        />
                        <Button 
                            onClick={handleSubmit}
                            disabled={loading} 
                            className="bg-gradient-to-r from-amber-500 to-orange-500  text-white font-medium px-6 py-3 h-full hover:bg-yellow-600 transition"
                        >
                            {loading ? "Subscribing..." : "Subscribe"}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
       </NMContainer>
    );
};

export default NewsLatterSection;
