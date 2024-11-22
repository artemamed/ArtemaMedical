// "use client";
import { motion } from "framer-motion";
import Image from "next/image";
import heroSection from "@/public/images/heroSection1.png";

export default function HeroSection() {
    return (
        <div className="container mx-auto min-h-screen flex items-center px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-8">
                <div className="text-center md:text-left leading-tight">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
                        Revolutionizing <span className="text-[#008080]">Healthcare</span>, One Innovation at a Time
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0 leading-tight">
                        We represent first-rate surgical instruments that provide the customers with the quality they demand, the price they can afford, and the fidelity they expect. We are proud of our 40 years of success in helping thousands of patients and healthcare industries around the world.
                    </p>
                    <button className="bg-[#008080] text-sm sm:text-base lg:text-lg text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
                        Explore More →
                    </button>
                </div>

                {/* Right Section - Larger Image */}
                <motion.div
                    className="relative w-full h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[40rem] xl:h-[50rem]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <Image
                        src={heroSection}
                        alt="Surgical Tools"
                        className="object-cover w-full h-full"
                    />
                </motion.div>
            </div>
        </div>
    );
}
