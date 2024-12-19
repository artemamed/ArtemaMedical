"use client";

import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/features/cartSlice";
import { RootState } from "@/app/store";
import ContactForm from "@/components/ui/contactForm";


const CheckOut: React.FC = () => {
    // Access cart items from Redux store
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    // Handle increment and decrement quantity
    const handleQuantityChange = (slug: string, size: string, increment: boolean) => {
        const item = cartItems.find(item => item.slug === slug && item.size === size);
        if (!item) return;

        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;

        dispatch(updateQuantity({ slug, size, quantity: newQuantity }));
    };

    // Handle remove item from cart
    const handleRemoveItem = (slug: string, size: string) => {
        dispatch(removeFromCart({ slug, size }));
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = total * 0.062;
    const freightCharge = cartItems.length === 1 && cartItems[0].quantity === 1 ? 25 : 75;

    const subtotal = total + freightCharge + tax;

    return (
        <LayoutWrapper className="min-h-screen p-4">
            {/* Header */}
            <button className="text-gray-500 mb-4">&lt; Back</button>
            <h1 className="text-3xl md:text-4xl font-bold text-teal-800 text-center mb-5">Check Out</h1>

            {/* Steps */}
            <div className="flex flex-col sm:flex-row items-center justify-center mb-8 gap-4 md:gap-12 ">
                <div className="hidden sm:block md:flex items-center">
                    <div className="w-8 h-8 bg-teal-800 text-white flex items-center justify-center rounded-full">✓</div>
                    <span className="ml-2 text-teal-800">Shopping cart</span>
                </div>
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-teal-600 text-white flex items-center justify-center rounded-full">2</div>
                    <span className="ml-2 text-teal-600">Checkout details</span>
                </div>
                <div className="hidden sm:block md:flex items-center">
                    <div className="w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded-full">3</div>
                    <span className="ml-2 text-gray-400">Order complete</span>
                </div>
            </div>

            {/* Checkout Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                <div className="space-y-10">
                    <ContactForm />
                </div>
                {/* Order Summary */}
                <div className="space-y-4 border p-[2rem] rounded-xl 2xl:ml-[10rem] lg:ml-[10rem] lg:w-[19rem] xl:w-[28rem] 2xl:w-[35rem] mb-[3rem] xl:ml-[9rem] xl:mr-[0.5rem]">
                    <h2 className="text-2xl font-semibold text-center mb-5">Order summary</h2>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col -ml-6 border-b pb-4 xl:ml-5">
                            <div className="flex items-center space-x-4">
                                {/* <Image src={item.image} alt={item.title} width={80} height={80} className="object-contain rounded-md" /> */}
                                <Image src="/assets/avatar.jpg" alt={item.title} width={80} height={80} className="object-contain rounded-md" />
                                <div className="flex-1 space-y-2 md:space-y-3">
                                    <h3 className="font-semibold text-sm text-[#2B2B2B]">{item.title}</h3>
                                    <p className="text-xs text-gray-600">Size: {item.size}</p>
                                    <p className="text-xs text-gray-600">SKU: {item.sku}</p>
                                    <div className="flex items-center space-x-2 border border-[#008080] w-[6.5rem] rounded-md px-2">
                                        <button
                                            className="px-3 py-1 text-[#008080]"
                                            onClick={() => handleQuantityChange(item.slug, item.size, false)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="text-xs">{item.quantity}</span>
                                        <button
                                            className="px-3 text-[#008080]"
                                            onClick={() => handleQuantityChange(item.slug, item.size, true)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-4 -mt-[4.5rem] ">
                                    <p className="text-sm font-semibold text-[#2B2B2B] -ml-[2rem]">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        className="text-xs text-[#666666] hover:text-red-500"
                                        onClick={() => handleRemoveItem(item.slug, item.size)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <table className="w-full">
                        <tbody>
                            <tr className="text-md border-b border-[#E8ECEF]">
                                <td className="py-4">Total</td>
                                <td className="text-right py-4">${total.toFixed(2)}</td>
                            </tr>
                            <tr className="text-md border-b border-[#E8ECEF]">
                                <td className="py-4">Tax</td>
                                <td className="text-right py-4">${tax.toFixed(2)}</td>
                            </tr>
                            <tr className="text-md border-b border-[#E8ECEF]">
                                <td className="py-4">Freight Charge</td>
                                <td className="text-right py-4">${freightCharge.toFixed(2)}</td>
                            </tr>
                            <tr className="font-semibold text-xl">
                                <td className="py-4">Total</td>
                                <td className="text-right py-4">${subtotal.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default CheckOut;
