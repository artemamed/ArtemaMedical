// small

"use client";

import { Button } from "@/components/ui/button";
import { Settings2, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const instruments = [
    { name: "Screw Cate", imageUrl: "/images/productSubCategory/pic1.png" },
    { name: "Screw Driver", imageUrl: "/images/productSubCategory/pic2.png" },
    { name: "Bone Cutting", imageUrl: "/images/productSubCategory/pic3.png" },
    { name: "Screw Cate", imageUrl: "/images/productSubCategory/pic1.png" },
    { name: "Screw Driver", imageUrl: "/images/productSubCategory/pic2.png" },
    { name: "Bone Cutting", imageUrl: "/images/productSubCategory/pic3.png" },
];

const categories = [
    {
        name: "General Instruments",
        icon: "carbon:reminder-medical",
        subcategories: ["Scalpels", "Forceps", "Retractors"],
    },
    {
        name: "Orthopedic",
        icon: "material-symbols-light:foot-bones-outline",
        subcategories: ["Screw Drivers", "Bone Cutters", "Wire Cutters"],
    },
    {
        name: "Scissors",
        icon: "mingcute:scissors-line",
        subcategories: ["Iris Scissors", "Mayo Scissors", "Bandage Scissors"],
    },
    {
        name: "ENT",
        icon: "f7:ear",
        subcategories: ["Nasal Forceps", "Ear Specula", "Laryngoscopes"],
    },
    {
        name: "Dental",
        icon: "ph:tooth",
        subcategories: ["Probes", "Mirrors", "Extraction Forceps"],
    },
    {
        name: "Cardiovascular",
        icon: "material-symbols:cardiology-outline-rounded",
        subcategories: ["Scalpels", "Forceps", "Retractors"],
    },
    {
        name: "Gynaecology",
        icon: "et:profile-female",
        subcategories: ["Screw Drivers", "Bone Cutters", "Wire Cutters"],
    },
    {
        name: "Plastic Surgery",
        icon: "game-icons:scalpel",
        subcategories: ["Iris Scissors", "Mayo Scissors", "Bandage Scissors"],
    },
    {
        name: "Needle Holder",
        icon: "streamline:health-medical-syringe-instrument-medical-syringe-health-beauty-needle",
        subcategories: ["Nasal Forceps", "Ear Specula", "Laryngoscopes"],
    },
    {
        name: "Surgical Set",
        icon: "healthicons:surgical-sterilization",
        subcategories: ["Probes", "Mirrors", "Extraction Forceps"],
    },
];

const ProductSubCategory = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const router = useRouter();

    const handleCategoryClick = (subcategory: string) => {
        router.push(`/subcategory/${subcategory.toLowerCase().replace(/\s/g, "-")}`);
        setShowSidebar(false);
    };
    const handleViewClick = () => {
        router.push("subCategoryListing");
        setShowSidebar(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1) {
                setShowButton(false);
            } else {
                setShowButton(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className="block lg:hidden">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-6 text-center py-[2rem] lg:py-[4rem] ">
                    Orthopedic Instruments
                </h1>

                <div className="relative flex min-h-screen mx-[1rem] lg:mx-[5rem] my-[2rem]">
                    {/* Sidebar Toggle Button */}
                    {showButton && (
                        <Button
                            className="fixed top-[13rem] left-[3.5rem] md:top-[13rem] lg:top-[15rem] lg:left-[5rem]"
                            variant="secondary"
                            onClick={() => setShowSidebar(!showSidebar)}
                        >
                            Show Categories <Settings2 className="w-5 h-5 ml-2" />
                        </Button>
                    )}

                    {/* Sidebar */}
                    <aside
                        className={` fixed top-0 left-0 h-full bg-[#F7F7F7] shadow-lg z-40 p-4 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"
                            } transition-transform duration-300 lg:static lg:translate-x-0 lg:w-64 lg:rounded-2xl`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-lg text-center">Categories</h2>
                            <Button
                                className="lg:hidden"
                                variant="ghost"
                                onClick={() => setShowSidebar(false)}
                            >
                                <X />
                            </Button>
                        </div>
                        <ul className="space-y-4">
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <details className="cursor-pointer">
                                        <summary className="hover:text-[#008080] flex items-center gap-2">
                                            <Icon icon={category.icon} className="text-xl text-[#008080]" />
                                            {category.name}
                                        </summary>
                                        <ul className="ml-8 mt-2 space-y-1 text-sm text-gray-600">
                                            {category.subcategories.map((subcategory, subIndex) => (
                                                <li
                                                    key={subIndex}
                                                    className="hover:text-[#008080] cursor-pointer"
                                                    onClick={() => handleCategoryClick(subcategory)}
                                                >
                                                    {subcategory}
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                </li>
                            ))}
                        </ul>
                    </aside>

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
                                    <div className="flex items-center justify-between gap-8">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                                            {instrument.name}
                                        </h3>
                                        <Button variant="secondary" className="px-[2rem]" onClick={() => handleViewClick()}>
                                            View
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>

            <div className="hidden lg:block">
                <h1 className="text-3xl lg:text-5xl font-semibold mb-6 text-center py-[4rem]">
                    Orthopedic Instruments
                </h1>
                <div className="flex min-h-screen mx-[5rem] my-[2rem]">
                    {/* Sidebar Toggle Button */}
                    <Button
                        className="absolute top-[15rem] left-[5rem]"
                        variant="secondary"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        {showSidebar ? "Hide Categories" : "Show Categories"}
                        <Settings2 className="w-5 h-5 ml-2" />
                    </Button>

                    {/* Sidebar */}
                    {showSidebar && (
                        <aside className="w-64 bg-gray-100 p-4 rounded-2xl">
                            <h2 className="font-semibold text-lg text-center mb-4">Categories</h2>
                            <ul className="space-y-4">
                                {categories.map((category, index) => (
                                    <li key={index}>
                                        <details className="cursor-pointer">
                                            <summary className="hover:text-[#008080] flex items-center gap-2">
                                                {/* Iconify Icon */}
                                                {category.icon && (
                                                    <Icon
                                                        icon={category.icon}
                                                        className="text-xl text-[#008080]"
                                                    />
                                                )}
                                                {category.name}
                                            </summary>
                                            <ul className="ml-8 mt-2 space-y-1 text-sm text-gray-600">
                                                {category.subcategories.map((subcategory, subIndex) => (
                                                    <li
                                                        key={subIndex}
                                                        className="hover:text-[#008080] cursor-pointer"
                                                    >
                                                        {subcategory}
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    </li>
                                ))}                        </ul>
                        </aside>
                    )}

                    {/* Main Content */}
                    <main className="flex-1 p-6">
                        <div className="grid grid-cols-3 gap-6">
                            {instruments.map((instrument, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg p-4 flex flex-col items-center"
                                >
                                    <Image
                                        width={300}
                                        height={300}
                                        src={instrument.imageUrl}
                                        alt={instrument.name}
                                        className="w-full h-full object-contain mb-4"
                                    />
                                    <div className="flex items-center justify-between gap-8">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mr-5">
                                            {instrument.name}
                                        </h3>
                                        <Button variant="secondary" className="px-[2rem]" onClick={() => handleViewClick()}>
                                            View
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default ProductSubCategory;
