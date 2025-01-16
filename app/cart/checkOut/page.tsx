"use client";

import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { PackageCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/features/cartSlice";
import { RootState } from "@/app/store";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { CircleLoader } from 'react-spinners';


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
    const [shippingInfo, setShippingInfo] = useState({
        street: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
    });
    const [isShippingFormSubmitted, setIsShippingFormSubmitted] = useState(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setShippingInfo((prev) => ({ ...prev, [id]: value }));
    };

    const handleShippingFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { street, country, city, state, zipCode } = shippingInfo;
        if (!street || !country || !city || !state || !zipCode) {
            toast.error("Please fill in all the required fields.");
            return;
        }

        setIsShippingFormSubmitted(true);
        toast.success("Shipping information submitted successfully!");
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
    // const subtotal = total + freightCharge + tax;
    const subtotal = Math.ceil(total + freightCharge + tax);

    // const subtotal = 1;


    // Handle placing order and redirecting for payment
    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            // Step 1: Create session
            const createSessionResponse = await axios.post("/api/create-session");
            const sessionId = createSessionResponse.data.session.id;

            // Step 2: Update session with calculated amount (no need to store the response)
            await axios.post("/api/update-session", { sessionId, amount: subtotal });

            // Step 3: Redirect to payment URL
            const paymentUrl = `${window.location.origin}/api/payment-form?sessionId=${sessionId}&amount=${subtotal}`;

            if (paymentUrl) {
                window.location.href = paymentUrl; // Redirect to the payment gateway
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
                <div className="space-y-10">
                    {/* Contact Details */}
                    <div className="border p-6 rounded-xl h-auto bg-white 2xl:w-[55rem] md:w-[22rem] lg:w-[40rem] xl:w-[47rem]">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h2>
                        <div className="space-y-4">

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

                    {/* Shipping Address */}
                    <div className="border p-6 rounded-xl h-auto bg-white 2xl:w-[55rem] md:w-[22rem] lg:w-[40rem] xl:w-[47rem]">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Address</h2>
                        <form className="space-y-4" onSubmit={handleShippingFormSubmit} >
                            {/* Street Address */}
                            <div className="text-gray-700 text-sm">
                                <label htmlFor="street" className="block mb-2 font-medium">
                                    Street Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="street"
                                    type="text"
                                    className="w-full p-3 border rounded-md"
                                    placeholder="Street Address"
                                    value={shippingInfo.street}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Country */}
                            <div className="text-gray-700 text-sm">
                                <label htmlFor="country" className="block mb-2 font-medium">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="country"
                                    className="w-full p-3 border rounded-md"
                                    value={shippingInfo.country}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Country</option>
                                    <option value="USA">USA</option>
                                    <option value="Canada">Canada</option>
                                    <option value="UK">UK</option>
                                </select>

                            </div>


                            {/* Town / City */}
                            <div className="text-gray-700 text-sm">
                                <label htmlFor="city" className="block mb-2 font-medium">
                                    Town / City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    className="w-full p-3 border rounded-md"
                                    placeholder="City"
                                    value={shippingInfo.city}
                                    onChange={handleInputChange}
                                />

                            </div>

                            {/* State and Zip Code */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-gray-700 text-sm">
                                    <label htmlFor="state" className="block mb-2 font-medium">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="state"
                                        type="text"
                                        className="w-full p-3 border rounded-md"
                                        placeholder="State"
                                        value={shippingInfo.state}
                                        onChange={handleInputChange}
                                    />

                                </div>
                                <div className="text-gray-700 text-sm">
                                    <label htmlFor="zipCode" className="block mb-2 font-medium">
                                        Zip Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="zipCode"
                                        type="text"
                                        className="w-full p-3 border rounded-md"
                                        placeholder="Zip Code"
                                        value={shippingInfo.zipCode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <Button
                                type="submit"
                                className="flex gap-2"
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="space-y-4 border p-[2rem] rounded-xl 2xl:ml-[10rem] lg:ml-[10rem] lg:w-[19rem] xl:w-[28rem] 2xl:w-[35rem] mb-[3rem] xl:ml-[9rem] xl:mr-[0.5rem]">
                    <h2 className="text-2xl font-semibold text-center mb-5">Order Summary</h2>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col -ml-6 border-b pb-4 xl:ml-5">
                            <div className="flex items-center space-x-4">
                                <Image src={getValidImageUrl(item.image)} alt={item.title} width={80} height={80} className="object-contain rounded-md w-full h-[5rem]" />
                                <div className="flex-1 space-y-2 md:space-y-3">
                                    <div className="relative group">
                                        <h3
                                            className="font-semibold text-sm text-[#2B2B2B] truncate overflow-hidden whitespace-nowrap w-[6rem] lg:w-[10rem] xl:w-[12.5rem]"
                                        >
                                            {item.title}
                                        </h3>
                                        <div
                                            className="absolute hidden group-hover:block bg-white text-sm text-gray-800 px-2 py-1 rounded shadow-lg -top-8 left-0 z-10"
                                        >
                                            {item.title}
                                        </div>
                                    </div>

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
                                <div className="flex flex-col space-y-4 -mt-[1rem] md:mt-[0rem]  ">
                                    <p className="text-sm font-semibold text-[#2B2B2B] -ml-[2rem] md:-ml-[1rem] lg:-ml-[4.5rem]">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        className="text-xs text-[#666666] hover:text-red-500 md:-ml-[0rem] lg:-ml-[3rem]"
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
                        type="submit"
                        className="flex gap-2"
                        onClick={handlePlaceOrder}
                        disabled={!isShippingFormSubmitted || loading}
                    >
                        {loading ? <CircleLoader size={20} color="#ffffff" /> : <>Place Order <PackageCheck /></>}
                    </Button>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default CheckOut;
