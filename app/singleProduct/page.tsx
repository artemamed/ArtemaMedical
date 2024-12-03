"use client";

import BreadcrumbComponent from "@/components/Breadcrumb";
import { ScrollAreaHorizontalDemo } from "@/components/Product/singleProductScroll";
import { Button } from "@/components/ui/button";
import { Plus, Ruler, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const instruments = [
    { name: "Screw Cate", imageUrl: "/images/productSubCategory/pic1.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.", amount: "$299" },
    { name: "Screw Driver", imageUrl: "/images/productSubCategory/pic2.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.", amount: "$299" },
    { name: "Bone Cutting", imageUrl: "/images/productSubCategory/pic3.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.", amount: "$299" },
    { name: "Screw Cate1", imageUrl: "/images/productSubCategory/pic1.png", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet.", amount: "$299" },
];

const SingleProduct: React.FC = () => {
    // const [showSidebar, setShowSidebar] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState("/images/productSubCategory/pic4.png");

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (key: string) => {
        setOpenDropdown(openDropdown === key ? null : key);
    };

    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const sizes = [
        { label: "19 cm SKU:033-0591-02", value: "19cm-sku1" },
        { label: "19 cm SKU:033-0591-02", value: "19cm-sku2" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8 mb-[5rem]">
            <div className="w-full">
                <div className="2xl:mx-[6rem]">
                <BreadcrumbComponent />
                </div>
                {/* Product Section */}
                <div className="flex flex-col lg:flex-row py-8 lg:py-16 space-y-6 lg:space-y-0 lg:space-x-8">
                    {/* Image Section */}
                    <div className="flex flex-col justify-center items-center lg:w-3/5 gap-4">
                        <div className="flex justify-center items-center">
                            <Image
                                width={300}
                                height={300}
                                src={selectedImage}
                                alt="Selected Product"
                                className="h-48 sm:h-64 lg:h-[35rem] lg:w-[35rem] mix-blend-multiply"
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <ScrollAreaHorizontalDemo onImageClick={handleImageClick} />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-1/3 lg:pl-8">
                        <h1 className="text-xl sm:text-xl lg:text-2xl font-bold">
                            Double Drill Guide with Stopper and 2 Sleeve
                        </h1>
                        <p className="text-gray-500 text-sm lg:text-base mt-2">
                            The Double Drill Guide With Stopper And 2 Sleeves Is A Precision
                            Surgical Tool Tailored For Orthopedic And Dental Procedures.
                            <a href="#" className="text-blue-500 hover:underline"> Read More</a>
                        </p>

                        {/* Size Selector */}
                        <div className="mt-6">
                            <p className="text-sm font-semibold flex">
                                <Ruler className="mr-2 h-5 w-5" />Size
                            </p>
                            <div className="flex-1 md:flex space-y-3 md:space-y-0 gap-4 mt-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size.value}
                                        onClick={() => setSelectedSize(size.value)}
                                        className={`border px-3 py-2 rounded-lg text-sm ${selectedSize === size.value
                                            ? "bg-[#F0FDFD] text-[#008080] border-[#008080]"
                                            : "hover:border-[#008080]"
                                            }`}
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price and Quantity */}
                        <div className="text-xl 2xl:text-3xl font-bold mt-4">$9.99</div>
                        <div className="mt-6 flex gap-4">
                            <div className="flex items-center space-x-4 text-[#008080] border border-[#008080] rounded-md px-5">
                                <button onClick={decrementQuantity}>−</button>
                                <span>{quantity}</span>
                                <button onClick={incrementQuantity}>+</button>
                            </div>
                            <Button >
                                Add to cart
                                <ShoppingCart className="ml-2 h-5 w-5" />
                            </Button>
                        </div>

                        {/* Additional Information */}
                        <div className="mt-6 border-b border-gray-50">
                            {["Terms & Condition", "Care Instructions", "Warranty Information"].map((label) => (
                                <div key={label}>
                                    <button
                                        onClick={() => toggleDropdown(label)}
                                        className="w-full flex justify-between items-center py-3 text-gray-600 border-b border-gray-100 hover:bg-gray-50 "
                                    >
                                        <span>{label}</span>
                                        <Plus className="h-5 w-5" />
                                    </button>
                                    {openDropdown === label && (
                                        <div className="p-4 text-gray-500 bg-gray-50">
                                            <p>
                                                {`Details about ${label.toLowerCase()}.`}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <div className="mt-16 2xl:mx-[6rem]">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                        Similar Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {instruments.map((instrument, index) => (
                            <div
                                key={index}
                                className="rounded-lg p-4 flex flex-col items-center bg-white"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        width={300}
                                        height={300}
                                        src={instrument.imageUrl}
                                        alt={instrument.name}
                                        className="w-full h-full object-contain mb-4"
                                    />
                                    <ShoppingCart
                                        className="absolute top-5 right-5 text-[#008080] bg-[#F7F7F7] rounded-full p-2 h-[3rem] w-[2.5rem]"
                                    />
                                </div>
                                <div className="">
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
