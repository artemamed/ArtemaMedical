"use client";

import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/features/cartSlice";
import { RootState } from "@/app/store";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const CheckOut: React.FC = () => {
    const { firstName, lastName, phoneNumber, email } = useSelector(
        (state: RootState) => state.auth);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const getValidImageUrl = (imageUrl: string | null) => {
        if (!imageUrl) return "/placeholder.png";
        const baseUrl = "https://medinven.api.artemamed.com";
        return imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`;
    };

    const handleQuantityChange = (slug: string, size: string, increment: boolean) => {
        const item = cartItems.find(item => item.slug === slug && item.size === size);
        if (!item) return;

        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        dispatch(updateQuantity({ slug, size, quantity: newQuantity }));
    };

    const handleRemoveItem = (slug: string, size: string) => {
        dispatch(removeFromCart({ slug, size }));
    };

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = total * 0.062;
    const freightCharge = (() => {
        if (cartItems.length === 1 && cartItems[0].quantity === 1) {
            return 25;
        }
        const hasMultipleCharges = cartItems.some(item => item.quantity > 1 || cartItems.length > 1);
        return hasMultipleCharges ? 75 : 0;
    })();
    const subtotal = total + freightCharge + tax;

    // Handle placing order and redirecting for payment
    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const orderId = `ORDER_${Date.now()}`;
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7);

            const payload = {
                apiOperation: "INITIATE_CHECKOUT",
                checkoutMode: "PAYMENT_LINK",
                interaction: {
                    operation: "PURCHASE",
                    merchant: {
                        name: "ARTEMAMEDICA",
                        url: "http://localhost:3001/cart/checkOut/orderComplete",
                    },
                },
                order: {
                    currency: "USD",
                    amount: subtotal.toFixed(2),
                    id: orderId,
                    description: "Payment Process",
                },
                paymentLink: {
                    expiryDateTime: expiryDate.toISOString(),
                    numberOfAllowedAttempts: "7",
                },
            };

            const response = await axios.post("/api/payment", payload);
            if (response.data.paymentLink?.url) {
                window.location.href = response.data.paymentLink.url; // Redirect to the payment gateway
            } else {
                throw new Error("Payment link not found");
            }
        } catch (error) {
            console.error(error);
            toast.error("Payment process failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <LayoutWrapper className="min-h-screen p-4">
            <button className="text-gray-500 mb-4">&lt; Back</button>
            <h1 className="text-3xl md:text-4xl font-bold text-teal-800 text-center mb-5">Check Out</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                <div className="border p-6 rounded-xl h-auto bg-white 2xl:w-[55rem] md:w-[22rem] lg:w-[40rem] xl:w-[47rem]">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h2>
                    <div className="space-y-4">
                        {/* Contact Details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-gray-700 text-sm">
                                <label className="block mb-2 font-medium">First Name</label>
                                <div className="w-full p-3 border rounded-md ">
                                    {firstName || "Not provided"}
                                </div>
                            </div>
                            <div className="text-gray-700 text-sm">
                                <label className="block mb-2 font-medium">Last Name</label>
                                <div className="w-full p-3 border rounded-md ">
                                    {lastName || "Not provided"}
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-700 text-sm">
                            <label className="block mb-2 font-medium">Phone Number</label>
                            <div className="w-full p-3 border rounded-md ">{phoneNumber || "Not provided"}</div>
                        </div>
                        <div className="text-gray-700 text-sm">
                            <label className="block mb-2 font-medium">Email Address</label>
                            <div className="w-full p-3 border rounded-md ">{email || "Not provided"}</div>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 border p-[2rem] rounded-xl 2xl:ml-[10rem] lg:ml-[10rem] lg:w-[19rem] xl:w-[28rem] 2xl:w-[35rem] mb-[3rem] xl:ml-[9rem] xl:mr-[0.5rem]">
                    <h2 className="text-2xl font-semibold text-center mb-5">Order Summary</h2>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col -ml-6 border-b pb-4 xl:ml-5">
                            <div className="flex items-center space-x-4">
                                <Image src={getValidImageUrl(item.image)} alt={item.title} width={80} height={80} className="object-contain rounded-md w-full h-[5rem]" />
                                <div className="flex-1 space-y-2 md:space-y-3">
                                    <h3 className="font-semibold text-sm text-[#2B2B2B] md:w-[15rem] lg:w-[12.5rem] xl:w-[18.5rem]">{item.title}</h3>
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
                                <div className="flex flex-col space-y-4 -mt-[4.5rem] md:mt-[4rem] lg:mt-auto ">
                                    <p className="text-sm font-semibold text-[#2B2B2B] -ml-[2rem] md:-ml-[8rem] lg:-ml-[6rem]">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        className="text-xs text-[#666666] hover:text-red-500 md:-ml-[6.5rem] lg:-ml-[4.5rem]"
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
                    <Button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </Button>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default CheckOut;
