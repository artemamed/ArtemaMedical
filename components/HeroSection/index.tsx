import { motion } from "framer-motion";
import Image from "next/image";
import heroSection from "@/public/images/heroSection1.png";

export default function HeroSection() {
    return (
        <div className="container mx-auto min-h-screen flex items-center px-4">
            {/* Grid container for layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full md:px-5 ">
                {/* Left Section - Text Content */}
                <div className="-mt-[20rem] md:-mt-[25rem] lg:-mt-[20rem] xl:-mt-[15rem]">
                    <h1 className="text-xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6 leading-tight">
                        Revolutionizing <span className="text-teal-600">Healthcare</span>, One Innovation at a Time
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8">
                        We represent first-rate surgical instruments that provide the customers with the quality they demand, the price they can afford, and the fidelity they expect. We are proud of our 40 years of success in helping thousands of patients and healthcare industries around the world.
                    </p>
                    <button className="bg-teal-600 text-sm sm:text-base lg:text-lg text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
                        Explore More →
                    </button>
                </div>

                {/* Right Section - Larger Image */}
                <motion.div
                    className="relative w-full h-64 md:h-[30rem] lg:h-[50rem] xl:h-[65rem] lg:w-auto md:-mt-[25rem] lg:-mt-[10rem] lg:-ml-[5rem] xl:-mt-[5rem]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <Image
                        src={heroSection}
                        alt="Surgical Tools"
                        className="object-cover w-full h-full "
                        fill
                        priority
                    />
                </motion.div>
            </div>
        </div>
    );
}
