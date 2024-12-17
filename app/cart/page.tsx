"use client";
import { Button } from "@/components/ui/button";
import { Package, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromCart, updateQuantity } from "@/redux/features/cartSlice";

const Cart: React.FC = () => {
    const [selectedOption] = useState(0);
    const freightCharges = [25, 75, 0.062 * 100];

    // Access cart items from Redux store
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    // Handle increment and decrement quantity
    const handleQuantityChange = (id: string, increment: boolean) => {
        dispatch(updateQuantity({ slug: id, size: '', quantity: increment ? 1 : -1 }));
    };

    // Handle remove item from cart
    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart({ slug: id, size: '' }));
    };

    // Calculate totals
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = total * 0.062;
    const subtotal = total + freightCharges[selectedOption] + tax;

    // Navigation logic
    const router = useRouter();
    const navigateToCheckOut = () => {
        const isAuthenticated = document.cookie.includes("userToken");
        if (isAuthenticated) {
            router.push("/cart/checkOut");
        } else {
            router.push("/auth/signin");
        }
    };

    return (
        <LayoutWrapper className="min-h-screen p-4">
            <div>
                {/* Back Button */}
                <button className="text-[#7c7c7c] mb-4">&lt; back</button>

                {/* Header */}
                <div className="flex justify-center mb-6">
                    <h1 className="text-3xl md:text-5xl font-semibold text-[#004040]">Cart</h1>
                </div>

                {/* Cart Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Product Table */}
                    <div className="lg:col-span-8">
                        {cartItems.length > 0 ? (
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-[#E8ECEF] text-lg">
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
                                                    alt={item.title}
                                                    className="rounded-xl object-contain"
                                                />
                                                <div className="space-y-2">
                                                    <h2 className="text-sm font-semibold text-[#2B2B2B]">
                                                        {item.title}
                                                    </h2>
                                                    <button
                                                        className="flex text-xs text-red-500 hover:underline"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
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
                                            <td className="text-center">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-500">Your cart is empty.</p>
                        )}
                    </div>

                    {/* Cart Summary */}
                    <div className="md:col-span-4 lg:w-[21rem] xl:w-full w-full">
                        <div className="border border-[#E0E0E0] rounded-xl p-4 space-y-6">
                            <h3 className="text-lg lg:text-2xl font-semibold mb-4 text-center">
                                Cart Summary
                            </h3>
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
                                        <td className="text-right py-4">
                                            ${freightCharges[selectedOption].toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="font-semibold text-xl">
                                        <td className="py-4">Subtotal</td>
                                        <td className="text-right py-4">${subtotal.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <Button
                                className="w-full flex justify-center items-center"
                                onClick={navigateToCheckOut}
                            >
                                Checkout <Package className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Cart;
