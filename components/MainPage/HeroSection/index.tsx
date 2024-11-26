"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import heroSection from "@/public/images/heroSection1.png";
import { useEffect, useState } from "react";

export default function HeroSection() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const fullText = "We represent first-rate surgical instruments that provide the customers with the quality they demand, the price they can afford, and the fidelity they expect.We are proud of our 40 years of success in helping thousands of patients and healthcare industries around the world";

    const shortText = fullText.slice(0, 145) + "...";

    return (
        <div className="container mx-auto  min-h-screen">
            <div className=" flex items-center px-4  -mb-[3rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-8">
                {/* Left Section - Text Content */}
                <div className="text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 md:mb-6 leading-tight">
                        Revolutionizing <span className="text-[#008080]">Healthcare</span>, One Innovation at a Time
                    </h1>
                    <div className="relative">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 w-full">
                        {isMobile ? (isExpanded ? fullText : shortText) : fullText}
                    </p>

                    {isMobile && !isExpanded && (
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="text-[#008080] text-sm underline mb-5"
                        >
                            Read More
                        </button>
                    )}
                </div>
                    <button className="bg-[#008080] lg:mt-5 text-sm sm:text-base lg:text-lg text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-105 mt-2">
                        Explore More →
                    </button>
                </div>

                {/* Right Section - Image */}
                <motion.div
                    className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[4/5] xl:aspect-[3/4]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <Image
                        src={heroSection}
                        alt="Surgical Tools"
                        fill
                        className="object-cover object-center -ml-5"
                        priority
                    />
                </motion.div>
            </div>
        </div>
        </div>
    );
}
