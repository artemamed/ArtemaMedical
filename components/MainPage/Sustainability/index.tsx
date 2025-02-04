import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import sustainability from "@/public/images/Sustainability.png";
import { Button } from "@/components/ui/button";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import Link from "next/link";

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

    const fullText = "Artema Medical is a medical equipment manufacturers. Our medical tools are designed by German-grade steel, that ensuring the strength, durability, and reliability of our instruments. They strive to meet the highest international standards with every instrument they create. We also have a team of skilled medical equipment suppliers who are dedicated to understanding your needs and ensuring that the right surgical instruments are delivered to you.";

    const shortText = fullText.slice(0, 145) + "...";

    return (
        <LayoutWrapper className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
                <div className="xl:w-[50rem] 2xl:w-[60rem] md:w-[30rem] lg:w-[38rem]">
                    <h2 className="text-xl sm:text-4xl lg:text-5xl  font-semibold mb-6">
                        We work with Reliability and Commitment
                    </h2>

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
                        <Link href="/about">
                            About Us →
                        </Link>
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
