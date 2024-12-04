"use client";
import { Button } from "@/components/ui/button";
import { Package, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const Cart: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState(0);

    const options = ["Free shipping", "Express shipping", "Pick Up"];
    const shippingCosts = [0, 15, 15]; 

    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Tray Table", price: 19, quantity: 2, sku: "033-0591-02", image: "/images/productSubCategory/pic4.png" },
        { id: 2, name: "Tray Table", price: 19, quantity: 1, sku: "033-0591-02", image: "/images/productSubCategory/pic2.png" },
        { id: 3, name: "Table Lamp", price: 39, quantity: 1, sku: "033-0591-03", image: "/images/productSubCategory/pic3.png" },
    ]);

    const handleQuantityChange = (id: number, increment: boolean) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: increment
                            ? item.quantity + 1
                            : item.quantity > 1
                                ? item.quantity - 1
                                : item.quantity,
                    }
                    : item
            )
        );
    };

    const handleRemoveItem = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal + shippingCosts[selectedOption];

    const handleShippingChange = (index: number) => {
        setSelectedOption(index);
    };

    const router = useRouter();

    const navigateToCheckOut = () => {
        const isAuthenticated = document.cookie.includes("userToken"); // Check if the user is authenticated
        if (isAuthenticated) {
          router.push("/cart/checkOut");
        } else {
          router.push("/auth/signin");
        }
      };
      

    return (
        <div className="min-h-screen p-4 mx-4 md:mx-[5rem]">
            <div>
                <button className="text-[#7c7c7c]">&lt; back</button>

                {/* Back and Header */}
                <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
                    <h1 className="mx-auto text-3xl md:text-5xl font-semibold text-[#004040]">Cart</h1>
                </div>

                {/* Steps */}
                <div className="flex flex-col sm:flex-row items-center justify-center mb-8 gap-4 md:gap-12">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#008080] text-white flex items-center justify-center rounded-full">
                            1
                        </div>
                        <span className="text-sm ml-2 font-medium text-[#008080]">Shopping cart</span>
                    </div>
                    <div className="hidden sm:block md:flex items-center">
                        <div className="w-8 h-8 bg-[#B1B5C3] text-white flex items-center justify-center rounded-full">
                            2
                        </div>
                        <span className="text-sm ml-2  text-[#B1B5C3]">Checkout details</span>
                    </div>
                    <div className="hidden sm:block md:flex items-center">
                        <div className="w-8 h-8 bg-[#B1B5C3] text-white flex items-center justify-center rounded-full">
                            3
                        </div>
                        <span className="text-sm ml-2  text-[#B1B5C3]">Order complete</span>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 2xl:gap-16">
                    {/* Product Table */}
                    <div className="hidden lg:block lg:col-span-8">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-[#E8ECEF] text-lg md:text-xl">
                                        <th className="text-left p-3">Product</th>
                                        <th className="text-center p-3">Quantity</th>
                                        <th className="text-center p-3">Price</th>
                                        <th className="text-center p-3">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="border-b border-[#E8ECEF]">
                                            <td className="p-3 flex items-center gap-4">
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="rounded-xl object-contain"
                                                />
                                                <div className="space-y-2">
                                                    <h2 className="text-sm font-semibold text-[#2B2B2B]">
                                                        {item.name}
                                                    </h2>
                                                    <p className="text-xs text-[#666666]">SKU: {item.sku}</p>
                                                    <button
                                                        className="flex text-xs text-[#666666] hover:text-red-500"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                                                        Remove
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <div className="flex items-center justify-center space-x-2 border w-[5rem] border-[#008080] rounded-md mx-auto">
                                                    <button
                                                        className="px-2 py-1 text-[#008080]"
                                                        onClick={() => handleQuantityChange(item.id, false)}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        className="px-2 py-1 text-[#008080]"
                                                        onClick={() => handleQuantityChange(item.id, true)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-center">${item.price.toFixed(2)}</td>
                                            <td className="text-center">${(item.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobilez */}

                    <div className="block lg:hidden space-y-4 md:w-[36rem]">
                        <h2 className="text-lg font-semibold mb-4">Product</h2>
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col border-b border-[#E0E0E0] pb-4"
                            >
                                {/* Product Header */}
                                <div className="flex items-center space-x-4">
                                    {/* Product Image */}
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="object-contain rounded-md"
                                    />

                                    {/* Product Name and SKU */}
                                    <div className="flex-1 space-y-2 md:space-y-3 ">
                                        <h3 className="font-semibold text-sm text-[#2B2B2B]">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-gray-600">Size: 19 cm</p>
                                        <p className="text-xs text-gray-600">SKU: {item.sku}</p>
                                        <div className="flex items-center space-x-2 border border-[#008080] rounded-md px-2 w-[7.5rem]">
                                            <button
                                                className="px-3 py-1 text-[#008080] cursor-pointer"
                                                onClick={() => handleQuantityChange(item.id, false)}
                                            >
                                                -
                                            </button>
                                            <span className="text-xs">{item.quantity}</span>
                                            <button
                                                className="px-3 text-[#008080] "
                                                onClick={() => handleQuantityChange(item.id, true)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    {/* <div className="flex-1"> */}
                                    {/* Product Price */}
                                    <div className="flex flex-col text-right space-y-4">
                                        <p className="text-sm font-semibold text-[#2B2B2B] -ml-5 -mt-[3.5rem]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        {/* Remove Button */}
                                        <button
                                            className="text-xs text-[#666666] flex  hover:text-red-500 justify-end"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                        </button>
                                    </div>

                                    {/* </div> */}
                                </div>
                            </div>
                        ))}
                    </div>



                    {/* Cart Summary Table */}
                    <div className="md:col-span-4 lg:w-[21rem] xl:w-full w-full md:my-[3rem] my-0">
                        <div className="border border-[#E0E0E0] rounded-xl p-4 space-y-6 lg:space-y-8 ">
                            <h3 className="text-lg font-semibold mb-4">Cart Summary</h3>

                            <div className="flex flex-col space-y-2">
                                {options.map((option, index) => (
                                    <label
                                        key={index}
                                        className={`flex items-center p-3 rounded-lg border cursor-pointer ${selectedOption === index
                                            ? "border-[#008080] text-[#008080]"
                                            : "border-gray-200 text-gray-500"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="shipping"
                                            className="mr-2 accent-[#008080]"
                                            checked={selectedOption === index}
                                            onChange={() => handleShippingChange(index)}
                                        />
                                        {option} <span className="ml-auto">${shippingCosts[index].toFixed(2)}</span>
                                    </label>
                                ))}
                            </div>

                            <table className="w-full">
                                <tbody>
                                    <tr className="text-md border-b border-[#E8ECEF] space-y-2">
                                        <td className="py-4">Subtotal</td>
                                        <td className="text-right py-4">${subtotal.toFixed(2)}</td>
                                    </tr>
                                    <tr className="text-md border-b border-[#E8ECEF] space-y-2">
                                        <td className="py-4">Shipping</td>
                                        <td className="text-right py-4">${shippingCosts[selectedOption].toFixed(2)}</td>
                                    </tr>
                                    <tr className="font-semibold text-xl space-y-2">
                                        <td className="py-4">Total</td>
                                        <td className="text-right py-4">${total.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <Button className="flex justify-center w-full" onClick={navigateToCheckOut}>
                                Checkout<Package className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
