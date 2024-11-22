"use client";
import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";


const CartButton = () => {
    return (
        <>
            <div className="">
                <Link href={"/cart"} className="hover:text-gray-500">
                    <ShoppingCart className="w-6 h-6 hover:text-[#008080]" />
                </Link>
            </div>
        </>
    );
};

export default CartButton;
