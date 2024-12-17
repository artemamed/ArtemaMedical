"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const OrderComplete: React.FC = () => {
    const router = useRouter();
    // Access cart items from Redux store
        const cartItems = useSelector((state: RootState) => state.cart.items);

    const navigateToMoreProducts = () => {
        router.push("/category");
    };
    return (
        <div className="min-h-screen p-4 mx-4 lg:mx-[3rem] xl:mx-[5rem]">
            {/* Page Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-teal-800 text-center mb-5">
                Order
            </h1>

            {/* Steps */}
            <div className="flex flex-col sm:flex-row items-center justify-center mb-8 gap-4 md:gap-8 lg:gap-12">
                <div className="hidden sm:flex items-center">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-teal-800 text-white flex items-center justify-center rounded-full text-xs md:text-sm">
                        ✓
                    </div>
                    <span className="ml-2 text-teal-800 text-sm md:text-base">Shopping cart</span>
                </div>
                <div className="hidden sm:flex items-center">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-teal-800 text-white flex items-center justify-center rounded-full text-xs md:text-sm">
                        ✓
                    </div>
                    <span className="ml-2 text-teal-800 text-sm md:text-base">Checkout details</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-teal-600 text-white flex items-center justify-center rounded-full text-xs md:text-sm">
                        3
                    </div>
                    <span className="ml-2 text-teal-600 text-sm md:text-base">Order complete</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center lg:mt-12">
                <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 lg:p-8 max-w-[90%] md:max-w-[800px] text-center">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 text-[#6C7275]">
                        Thank You For Choosing Artema!
                    </h2>
                    <p className="text-xl md:text-2xl lg:text-4xl font-bold text-[#2B2B2B]">
                        Your order has been received
                    </p>

                    {/* Products */}
                    <div className="flex justify-center mt-6 gap-4">
                        {cartItems.map((product, index) => (
                            <div key={index} className="relative">
                                <Image
                                    width={100}
                                    height={100}
                                    src={product.image}
                                    alt={product.title}
                                    className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-md"
                                />
                                <span className="absolute -top-2 -right-2 bg-[#004040] text-white text-xs md:text-sm rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
                                    {product.quantity}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Order Details */}
                    <div className="mt-6 space-y-2 text-gray-600 text-sm md:text-base">
                        <p>
                            <span className="font-medium text-[#6C7275]">Order code:</span> #0123_45678
                        </p>
                        <p>
                            <span className="font-medium text-[#6C7275]">Date:</span> October 19, 2023
                        </p>
                        <p>
                            <span className="font-medium text-[#6C7275]">Total:</span> $1,345.00
                        </p>
                        <p>
                            <span className="font-medium text-[#6C7275]">Payment method:</span> Credit Card
                        </p>
                    </div>

                    {/* Button */}
                    <Button className="mt-6 text-sm md:text-base px-6 py-2 md:py-3" onClick={navigateToMoreProducts} >
                        Explore More Products
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderComplete;
