"use client";

import { Button } from "@/components/ui/button";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { PackageCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";



const CheckOut: React.FC = () => {
    const [shippingAddress, setShippingAddress] = useState({
        street: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
        differentBillingAddress: false,
    });

    // Handler for form input changes
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setShippingAddress((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Submit handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Shipping Address Submitted:", shippingAddress);

    };

    const [selectedOption,] = useState(0);

    const shippingCosts = [0, 15, 15];

    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Tray Table", price: 19, quantity: 2, sku: "033-0591-02", image: "/images/productSubCategory/pic4.png" },
        { id: 2, name: "Tray Table", price: 19, quantity: 1, sku: "033-0591-02", image: "/images/productSubCategory/pic2.png" },
        { id: 3, name: "Table Lamp", price: 39, quantity: 1, sku: "033-0591-03", image: "/images/productSubCategory/pic3.png" },
    ]);

    const handleRemoveItem = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleQuantityChange = (id: number, action: "increment" | "decrement") => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: action === "increment" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    const router = useRouter();

    const navigateToOrderComplete = () => {
        router.push("/cart/checkOut/orderComplete");
    };

    const total = subtotal + shippingCosts[selectedOption];

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
                {/* Shipping Address */}
                <div className="border p-6 rounded-xl h-[35rem] bg-white 2xl:w-[55rem] md:w-[22rem] lg:w-[40rem] xl:w-[47rem]">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Address</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Street Address */}
                        <div className="text-gray-700 text-sm">
                            <label htmlFor="street" className="block mb-2 font-medium">
                                Street Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                placeholder="Street Address"
                                className="w-full p-3 border rounded-md"
                                value={shippingAddress.street}
                                onChange={handleAddressChange}
                            />
                        </div>

                        {/* Country */}
                        <div className="text-gray-700 text-sm">
                            <label htmlFor="country" className="block mb-2 font-medium">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="country"
                                name="country"
                                className="w-full p-3 border rounded-md"
                                value={shippingAddress.country}
                                onChange={handleAddressChange}
                            >
                                <option value="">Country</option>
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
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Town / City"
                                className="w-full p-3 border rounded-md"
                                value={shippingAddress.city}
                                onChange={handleAddressChange}
                            />
                        </div>

                        {/* State and Zip Code */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-gray-700 text-sm">
                                <label htmlFor="state" className="block mb-2 font-medium">
                                    State
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    placeholder="State"
                                    className="w-full p-3 border rounded-md"
                                    value={shippingAddress.state}
                                    onChange={handleAddressChange}
                                />
                            </div>
                            <div className="text-gray-700 text-sm">
                                <label htmlFor="zipCode" className="block mb-2 font-medium">
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    placeholder="Zip Code"
                                    className="w-full p-3 border rounded-md"
                                    value={shippingAddress.zipCode}
                                    onChange={handleAddressChange}
                                />
                            </div>
                        </div>

                        {/* Billing Address Checkbox */}
                        <div className="flex items-center text-sm">
                            <input
                                type="checkbox"
                                id="differentBillingAddress"
                                name="differentBillingAddress"
                                className="w-4 h-4 border rounded"
                                checked={shippingAddress.differentBillingAddress}
                                onChange={handleAddressChange}
                            />
                            <label htmlFor="differentBillingAddress" className="ml-2 text-gray-700 text-[9px] sm:text-xs lg:text-base">
                                Use a different billing address (optional)
                            </label>
                        </div>

                        {/* Place Order Button */}
                        <Button
                            type="submit"
                            className="flex gap-2"
                            onClick={navigateToOrderComplete}
                        >
                            Place Order<PackageCheck />
                        </Button>
                    </form>
                </div>


                {/* Order Summary */}
                <div className="space-y-4 border p-[2rem] rounded-xl 2xl:ml-[10rem] lg:ml-[10rem] lg:w-[19rem] xl:w-[28rem] 2xl:w-[35rem] mb-[3rem] xl:ml-[9rem] xl:mr-[0.5rem]">
                    <h2 className="text-2xl font-semibold text-center mb-5">Order summary</h2>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col -ml-6 border-b pb-4 xl:ml-5">
                            <div className="flex items-center space-x-4">
                                <Image src={item.image} alt={item.name} width={80} height={80} className="object-contain rounded-md" />
                                <div className="flex-1 space-y-2 md:space-y-3">
                                    <h3 className="font-semibold text-sm text-[#2B2B2B]">{item.name}</h3>
                                    <p className="text-xs text-gray-600">Size: 19 cm</p>
                                    <p className="text-xs text-gray-600">SKU: {item.sku}</p>
                                    <div className="flex items-center space-x-2 border border-[#008080] w-[6.5rem] rounded-md px-2">
                                        <button
                                            className="px-3 py-1 text-[#008080]"
                                            onClick={() => handleQuantityChange(item.id, "decrement")}
                                        >
                                            -
                                        </button>
                                        <span className="text-xs">{item.quantity}</span>
                                        <button
                                            className="px-3 text-[#008080]"
                                            onClick={() => handleQuantityChange(item.id, "increment")}
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
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <table className="w-full">
                        <tbody>
                            <tr className="text-md border-b">
                                <td className="py-4">Shipping</td>
                                <td className="text-right py-4">${shippingCosts[selectedOption].toFixed(2)}</td>
                            </tr>
                            <tr className="text-md border-b">
                                <td className="py-4">Subtotal</td>
                                <td className="text-right py-4">${subtotal.toFixed(2)}</td>
                            </tr>
                            <tr className="font-semibold text-xl">
                                <td className="py-4">Total</td>
                                <td className="text-right py-4">${total.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default CheckOut;
