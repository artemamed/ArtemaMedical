"use client";

import Image from "next/image";
import React, { useState } from "react";

const instruments = [
    { name: "Screw Cate", imageUrl: "/images/productSubCategory/pic1.png", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", amount:"$299" },
    { name: "Screw Driver", imageUrl: "/images/productSubCategory/pic2.png", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", amount:"$299" },
    { name: "Bone Cutting", imageUrl: "/images/productSubCategory/pic3.png", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", amount:"$299" },
    { name: "Screw Cate", imageUrl: "/images/productSubCategory/pic1.png", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", amount:"$299" },
    { name: "Screw Driver", imageUrl: "/images/productSubCategory/pic2.png", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", amount:"$299" },
    { name: "Bone Cutting", imageUrl: "/images/productSubCategory/pic3.png", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit", amount:"$299" },
];

const SubCategoryListing = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-6 text-center py-[2rem] lg:py-[4rem] ">
            Sleeves & Drill
            </h1>

            <div className="relative flex min-h-screen mx-[1rem] lg:mx-[5rem] my-[2rem]">

               

                {/* Backdrop for Sidebar (Mobile Only) */}
                {showSidebar && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
                        onClick={() => setShowSidebar(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-6 lg:-mt-[2.5rem]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {instruments.map((instrument, index) => (
                            <div
                                key={index}
                                className="rounded-lg p-4 flex flex-col items-center bg-white"
                            >
                                <Image
                                    width={300}
                                    height={300}
                                    src={instrument.imageUrl}
                                    alt={instrument.name}
                                    className="w-full h-full object-contain mb-4"
                                />
                                <div className="">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800">
                                        {instrument.name}
                                    </h3>
                                    <h3 className="text-base">
                                        {instrument.description}
                                    </h3>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                                        {instrument.amount}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
};

export default SubCategoryListing;
