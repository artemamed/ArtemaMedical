"use client";
import { Button } from "@/components/ui/button";
import { CircleArrowRight } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";


const SurgicalCatalog = () => {
    const cards = Array(9).fill({
        title: "Orthopedic Instruments",
        items: [
            "Bone Forceps",
            "Orthopedic Osteotome",
            "Bone Saw",
            "Trauma Plate and Screws",
        ],
    });

    const router = useRouter();

  const navigateToSubCategories = () => {
    router.push("/productCategoryShow");
  };

    return (
        <div className="min-h-screen p-4 sm:p-6 md:p-8 mb-[3rem] sm:mb-[4rem] md:mb-[5rem] font-poppins -mt-[10rem] sm:mt-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 sm:mb-6 md:mb-8 leading-tight">
                Explore Our Complete Range of Surgical Tools
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-14">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="p-4 sm:p-5 md:p-6 rounded-2xl border bg-white hover:bg-[#CFE7E7] transition-colors duration-300 hover:scale-105"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 md:mb-4 leading-snug">
                                {card.title}
                            </h2>
                            <CircleArrowRight className="text-[#008080] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 cursor-pointer" onClick={navigateToSubCategories}/>
                        </div>

                        <ul className="space-y-2 sm:space-y-3 md:space-y-4 mt-[2rem] sm:mt-[3rem] md:mt-[5rem]">
                            {card.items.map((item: string, idx: number) => (
                                <li
                                    key={idx}
                                    className="flex items-center space-x-2 text-gray-700"
                                >
                                    <span className="text-[#008080] text-lg sm:text-xl md:text-2xl lg:text-3xl">
                                        ➜
                                    </span>
                                    <span className="text-sm sm:text-base md:text-lg lg:text-xl">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <Button className="mt-5 px-[2rem]">Load More</Button>
        </div>
    );
};

export default SurgicalCatalog;
