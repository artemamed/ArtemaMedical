import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import sustainability from "@/public/images/Sustainability.png";

export default function Sustainability() {
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

    const fullText = "At Artema Medical, we are driven by a mission to revolutionize the surgical tool industry while promoting eco-friendly practices. Our dedicated team works tirelessly to integrate sustainable solutions into every aspect of our operations, ensuring we leave a positive impact on both healthcare and the environment. Join us in our journey toward a greener future.";

    const shortText = fullText.slice(0, 145) + "...";

    return (
        <div className="px-4 md:px-[5rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 px-8">
                <div className="text-left">
                    <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
                        Committed to Sustainability in Healthcare
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

                    <button className="bg-[#008080] text-sm sm:text-base lg:text-lg mt-2 lg:mt-5 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition">
                        About Us →
                    </button>
                </div>

                <motion.div
                    className="w-full h-full flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <Image
                        src={sustainability}
                        alt="Surgical Tools"
                        className="w-full h-[15rem] lg:h-[25rem] object-cover"
                        priority
                    />
                </motion.div>
            </div>
        </div>
    );
}
