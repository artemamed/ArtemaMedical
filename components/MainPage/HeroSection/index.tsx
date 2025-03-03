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

    const fullText = "As a trusted medical equipment manufacturer with 40 years of experience, we are improving healthcare by delivering reliable and precise instruments. Our artistic approach and generation of experience has enabled us to expand our services globally and introduce innovative solutions to the healthcare industry. We are committed to a promising future, dedicated to serving every patient, provider, and researcher with the finest medical equipment.";

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
                            {/* <div className="text-left 2xl:-mr-10"> */}
                            <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold mb-4 md:mb-6 mt-10 lg:-mt-[4rem]">
                                Leading <span className="text-[#008080]">Medical Equipment</span> Manufacturers & Suppliers
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
