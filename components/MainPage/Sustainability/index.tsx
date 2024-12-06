import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import sustainability from "@/public/images/Sustainability.png";
import { Button } from "@/components/ui/button";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";

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
        <LayoutWrapper className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
                <div className="xl:w-[50rem] 2xl:w-[60rem] md:w-[30rem] lg:w-[38rem]">
                    <h1 className="text-xl sm:text-4xl lg:text-5xl  font-semibold mb-6">
                        Committed to Sustainability in Healthcare
                    </h1>

                    <div className="relative">
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 w-full text-justify">
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

                    <Button className="bg-[#008080] text-sm sm:text-base lg:text-lg mt-2 lg:mt-5 text-white  py-3 rounded-lg hover:bg-teal-700 transition">
                        About Us →
                    </Button>
                </div>

                <motion.div
                    className="w-full h-full "
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <Image
                        src={sustainability}
                        alt="Surgical Tools"
                        className="w-full h-[15rem] lg:h-[25rem] object-cover xl:ml-[7rem] md:mt-[3rem] lg:mt-0 xl:-mt-[2rem] md:ml-[4rem]"
                        priority
                    />
                </motion.div>
            </div>
        </LayoutWrapper>
    );
}
