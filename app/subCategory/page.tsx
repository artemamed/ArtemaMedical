"use client";

import BreadcrumbComponent from "@/components/Breadcrumb";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const instruments = [
    { name: "Screw Cate", imageUrl: "/images/productSubCategory/pic1.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.", amount: "$299", link: "/product/screw-cate" },
    { name: "Screw Driver", imageUrl: "/images/productSubCategory/pic2.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.", amount: "$299", link: "/product/screw-driver" },
    { name: "Bone Cutting", imageUrl: "/images/productSubCategory/pic3.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.", amount: "$299", link: "/product/bone-cutting" },
    { name: "Screw Cate1", imageUrl: "/images/productSubCategory/pic1.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.", amount: "$299", link: "/product/screw-cate1" },
    { name: "Screw Driver1", imageUrl: "/images/productSubCategory/pic2.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.", amount: "$299", link: "/product/screw-driver1" },
    { name: "Bone Cutting1", imageUrl: "/images/productSubCategory/pic3.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.", amount: "$299", link: "/product/bone-cutting1" },
];

const SubCategoryListing = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <LayoutWrapper className="lg:py-[3rem]">
                <BreadcrumbComponent />
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-6 text-center mt-[1rem]  text-[#004040]">
                    Sleeves & Drill
                </h1>
                <div className="text-end -mb-[3rem] lg:-mb-1 mr-[1rem] md:mr-[2rem] text-sm sm:text-base">
                    Showing all results ...
                </div>
                <div className="relative flex min-h-screen ">
                    {/* Backdrop for Sidebar (Mobile Only) */}
                    {showSidebar && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
                            onClick={() => setShowSidebar(false)}
                        ></div>
                    )}

                    {/* Main Content */}
                    <main className="flex-1 pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {instruments.map((instrument, index) => (
                                <Link href="/product" key={index}>
                                    <div className="rounded-lg p-4 flex flex-col items-center bg-white cursor-pointer">
                                        <div className="relative w-full h-full">
                                            <Image
                                                width={300}
                                                height={300}
                                                src={instrument.imageUrl}
                                                alt={instrument.name}
                                                className="w-full h-full object-contain mb-4"
                                            />
                                            <ShoppingCart
                                                className="absolute top-2 right-2 text-[#008080] bg-[#F7F7F7] rounded-full p-2 h-[3rem] w-[2.5rem]"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-base sm:text-lg font-bold text-gray-800">
                                                {instrument.name}
                                            </h3>
                                            <h3 className="text-sm text-[#666666]">
                                                {instrument.description}
                                            </h3>
                                            <h3 className="text-base sm:text-xl font-semibold text-gray-800">
                                                {instrument.amount}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </main>
                </div>
            </LayoutWrapper>
        </>
    );
};

export default SubCategoryListing;
