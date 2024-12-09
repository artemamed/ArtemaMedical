import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { CircleArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const Distributors = () => {
    const cards = [
        {
            logo: "/images/Distributors/Allnet.png",
            name: "All Net Medical",
        },
        {
            logo: "/images/Distributors/Dynamic.png",
            name: "Dynamic Medical Solution",
        },
        {
            logo: "/images/Distributors/Wincorn.png",
            name: "Wincorn Medical",
        },
    ];
    return (
        <LayoutWrapper className="min-h-screen flex justify-center items-center py-8">
            <div className="max-w-screen-lg w-full">
                {/* Header Section */}
                <div className="text-center">
                    <h1 className="text-2xl md:text-4xl font-semibold text-[#004040]">
                        Our Distributors
                    </h1>
                    <p className="text-[#666666] mt-2 max-w-2xl mx-auto text-base sm:text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Suspendisse potenti.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Suspendisse potenti.
                    </p>
                </div>
                <Image width={1000} height={1000} src="/images/Distributors/distributors.png" alt="Distributors" className="w-full h-auto object-contain" />


                <div className="flex items-center justify-center p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-16">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className=" shadow-lg rounded-lg p-6 flex flex-col items-center"
                            >
                                <div className="bg-[#F7F7F7] h-24 w-24 flex items-center justify-center">
                                    <Image
                                        width={100} height={100}
                                        src={card.logo}
                                        alt={card.name}
                                        className="object-contain h-full"
                                    />
                                </div>

                                <div className="flex w-[17.5rem]">
                                    <h3 className="text-lg font-semibold text-center">
                                        {card.name}
                                    </h3>
                                    <button className="w-10 h-10 flex items-center justify-center text-green-600 hover:text-green-800 mx-auto">
                                        <CircleArrowRight />
                                    </button> 
                                </div>
                            </div>
                        ))}
                    </div>
                </div>






            </div>
        </LayoutWrapper>
    );
};

export default Distributors;
