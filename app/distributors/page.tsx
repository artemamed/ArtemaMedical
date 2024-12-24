"use client"; // Mark this file as a Client Component

import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { CircleArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const Distributors = () => {
    const cards = [
        {
            logo: "/images/Distributors/Allnet.png",
            name: "All Net Medical",
            link: "https://www.allnetmedical.com/",
        },
        {
            logo: "/images/Distributors/Dynamic.png",
            name: "Dynamic Medical Solution",
            link: "https://www.dynamicmedicalsolution.com/",
        },
        {
            logo: "/images/Distributors/Wincorn.png",
            name: "Wincorn Medical",
            link: "https://www.wincornmedical.com/",
        },
    ];

    return (
        <LayoutWrapper className="min-h-screen flex flex-col justify-center items-center py-6 sm:py-12">
            <div className="w-full max-w-screen-lg">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-10">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#004040]">
                        Our Trusted Distributors
                    </h1>
                    <p className="text-[#666666] mt-4 max-w-xl sm:max-w-5xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                        We provide international services through a network of regional distributors and business partners. Our
                        distributors work in the U.K., the U.S.A., and Pakistan, extending to a number of cities and covering
                        three major continents of the world: North America, Europe, and Asia.
                    </p>
                    <p className="text-[#666666] mt-4 max-w-xl sm:max-w-5xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                        They are trustworthy and reliable, as they are highly qualified and experts in their fields. They distribute
                        our products and services with the same standard as we handled them. They transfer our motives to the
                        world with pure intention.
                    </p>
                </div>

                {/* Map Section */}
                <div className="relative w-full flex justify-center mb-10 sm:mb-12 md:-my-[4rem]">
                    <Image
                        src="/images/Distributors/distributors.png"
                        alt="Distributors Map"
                        width={900}
                        height={500}
                        className="w-full max-w-[500px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] h-auto object-contain"
                    />
                </div>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-14 xl:gap-20">
                {cards.map((card, index) => (
                    <div key={index} className="flex flex-col items-center xl:w-[360px]">
                        {/* Card Image */}
                        <div className="w-full h-[180px] sm:h-[200px] md:h-[240px] lg:h-[273px] bg-[#f7f7f7] rounded-2xl px-6 pt-10 pb-6 flex items-center justify-center">
                            <Image
                                src={card.logo}
                                alt={card.name}
                                width={120}
                                height={90}
                                className="object-contain lg:w-[180px]"
                            />
                        </div>
                        {/* Card Footer */}
                        <div className="w-full h-[60px] sm:h-[70px] md:h-[82px] bg-white rounded-bl-2xl rounded-br-2xl border border-[#e0e0e0] px-4 sm:px-6 flex items-center justify-between -mt-4">
                            <h3 className="text-[#2b2b2b] text-sm sm:text-base md:text-lg font-normal">
                                {card.name}
                            </h3>
                            <button
                                className="w-6 h-6 text-green-600 hover:text-green-800 ml-2"
                                onClick={() => window.open(card.link, "_blank")}
                            >
                                <CircleArrowRight size={32} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </LayoutWrapper>
    );
};

export default Distributors;
