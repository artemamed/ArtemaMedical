"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import heroSection from "@/public/images/heroSection1.png";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";


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

    const fullText = "We are proud of our 40 years of success in helping thousands of patients and healthcare industries around the world. Our artistic approach and generations of experience have enabled us to extend our services worldwide and introduce innovative Medical equipment in the healthcare industry. We commit to a promising future by serving every Surgeons, provider, and researcher with the finest quality of surgical instruments.";

    const shortText = fullText.slice(0, 145) + "...";

    const router = useRouter();

    const navigateToBlog = () => {
        router.push("/blog");
    };

    return (
        <LayoutWrapper>
            <div className="min-h-screen ">
                <div className=" flex items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full gap-8 ">
                        {/* Left Section - Text Content */}
                        <div className="text-left">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-semibold mb-4 md:mb-6 mt-10 lg:-mt-[4rem]">
                                Empowering <span className="text-[#008080]">Healthcare</span>, with Modern Medical Equipment
                            </h1>
                            <div className="relative">
                                <p className="text-sm sm:text-base md:text-lg 2xl:text-xl text-gray-600 w-full leading-6 lg:leading-8 text-justify">
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

                            <Button className="mt-5" onClick={navigateToBlog}>
                                Explore More →
                            </Button>
                        </div>

                        {/* Right Section - Image */}
                        <motion.div
                            className="relative w-full aspect-[3/4] lg:aspect-[4/5] xl:aspect-[3/4]  "
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src={heroSection}
                                alt="Surgical Tools"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
