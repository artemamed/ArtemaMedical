"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const EmptyCart: React.FC = () => {
    const router = useRouter();

    const navigateToMoreProducts = () => {
        router.push("/productCategory");
    };
    return (
        <div className="my-[7rem] md:my-[15rem]  p-4 mx-4 lg:mx-[3rem] xl:mx-[5rem]">
            {/* Main Content */}
            <div className="flex items-center justify-center lg:mt-12">
                <div className="max-w-[90%] md:max-w-[800px] text-center">
                    {/* Products */}
                    <div className="flex justify-center  gap-4 -mb-[7rem] -mt-[5rem] ">
                        <div className="relative">
                            <Image
                                width={100}
                                height={100}
                                src="/images/cart/emptyCart.svg"
                                alt="Empty Cart"
                                className="w-[30rem] h-[25rem] object-contain rounded-md lg:-mt-[1rem]"
                            />
                        </div>
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-teal-800 text-center mb-5">
                        Cart Empty
                    </h1>

                    {/* Order Details */}
                    <div className=" text-gray-600 text-sm md:text-base">
                        <p>
                            <span className="font-medium text-[#6C7275]">Your cart is empty.
                                Start adding items to enjoy shopping!</span>
                        </p>
                    </div>

                    {/* Button */}
                    <Button className="mt-6 text-sm md:text-base px-6 py-2 md:py-3" onClick={navigateToMoreProducts} >
                        Explore Products
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EmptyCart;
