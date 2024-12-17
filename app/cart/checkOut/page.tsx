"use client";

import { Button } from "@/components/ui/button";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { PackageCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/features/cartSlice";
import { RootState } from "@/app/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

// Define Zod validation schema for the form
const shippingAddressSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address"),
    street: z.string().min(1, "Street address is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    differentBillingAddress: z.boolean(),
});

type ShippingAddress = z.infer<typeof shippingAddressSchema>;

const CheckOut: React.FC = () => {
    // Set up form validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingAddress>({
        resolver: zodResolver(shippingAddressSchema),
    });

    // Access cart items from Redux store
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Handle increment and decrement quantity
    const handleQuantityChange = (id: string, increment: boolean) => {
        dispatch(updateQuantity({ slug: id, size: "", quantity: increment ? 1 : -1 }));
    };

    // Handle remove item from cart
    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart({ slug: id, size: "" }));
    };

    const router = useRouter();

    const navigateToOrderComplete = () => {
        router.push("/cart/checkOut/orderComplete");
    };

    const onSubmit = (data: ShippingAddress) => {
        toast.success("Shipping Address Submitted");
        console.log(data);
        navigateToOrderComplete();
    };

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
                    {/* Contact Information */}
                    <div className="border p-6 rounded-xl h-auto bg-white 2xl:w-[55rem] md:w-[22rem] lg:w-[40rem] xl:w-[47rem]">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h2>
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            {/* First Name and Last Name */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-gray-700 text-sm">
                                    <label htmlFor="firstName" className="block mb-2 font-medium">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        {...register("firstName")}
                                        className="w-full p-3 border rounded-md"
                                    />
                                    {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                                </div>
                                <div className="text-gray-700 text-sm">
                                    <label htmlFor="lastName" className="block mb-2 font-medium">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        {...register("lastName")}
                                        className="w-full p-3 border rounded-md"
                                    />
                                    {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="text-gray-700 text-sm">
                                <label htmlFor="phoneNumber" className="block mb-2 font-medium">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    {...register("phoneNumber")}
                                    className="w-full p-3 border rounded-md"
                                />
                                {errors.phoneNumber && <span className="text-red-500 text-xs">{errors.phoneNumber.message}</span>}
                            </div>

                            {/* Email Address */}
                            <div className="text-gray-700 text-sm">
                                <label htmlFor="email" className="block mb-2 font-medium">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    {...register("email")}
                                    className="w-full p-3 border rounded-md"
                                />
                                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                            </div>
                        </form>
                    </div>

                    {/* Shipping Address */}
                    <div className="border p-6 rounded-xl h-auto bg-white 2xl:w-[55rem] md:w-[22rem] lg:w-[40rem] xl:w-[47rem]">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Address</h2>
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            {/* Street Address */}
                            <div className="text-gray-700 text-sm">
                                <label htmlFor="street" className="block mb-2 font-medium">
                                    Street Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    {...register("street")}
                                    className="w-full p-3 border rounded-md"
                                />
                                {errors.street && <span className="text-red-500 text-xs">{errors.street.message}</span>}
                            </div>

                            {/* Country */}
                            <div className="text-gray-700 text-sm">
                                <label htmlFor="country" className="block mb-2 font-medium">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="country"
                                    {...register("country")}
                                    className="w-full p-3 border rounded-md"
                                >
                                    <option value="">Select Country</option>
                                    <option value="USA">USA</option>
                                    <option value="Canada">Canada</option>
                                    <option value="UK">UK</option>
                                </select>
                                {errors.country && <span className="text-red-500 text-xs">{errors.country.message}</span>}
                            </div>

                            {/* Town / City */}
                            <div className="text-gray-700 text-sm">
                                <label htmlFor="city" className="block mb-2 font-medium">
                                    Town / City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    {...register("city")}
                                    className="w-full p-3 border rounded-md"
                                />
                                {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
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
                                        {...register("state")}
                                        className="w-full p-3 border rounded-md"
                                    />
                                    {errors.state && <span className="text-red-500 text-xs">{errors.state.message}</span>}
                                </div>
                                <div className="text-gray-700 text-sm">
                                    <label htmlFor="zipCode" className="block mb-2 font-medium">
                                        Zip Code
                                    </label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        {...register("zipCode")}
                                        className="w-full p-3 border rounded-md"
                                    />
                                    {errors.zipCode && <span className="text-red-500 text-xs">{errors.zipCode.message}</span>}
                                </div>
                            </div>

                            {/* Billing Address Checkbox */}
                            <div className="flex items-center text-sm">
                                <input
                                    type="checkbox"
                                    id="differentBillingAddress"
                                    {...register("differentBillingAddress")}
                                    className="w-4 h-4 border rounded"
                                />
                                <label
                                    htmlFor="differentBillingAddress"
                                    className="ml-2 text-gray-700 text-[9px] sm:text-xs lg:text-base"
                                >
                                    Use a different billing address (optional)
                                </label>
                            </div>

                            {/* Place Order Button */}
                            <Button
                                type="submit"
                                className="flex gap-2"
                            >
                                Place Order<PackageCheck />
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-4 border p-[2rem] rounded-xl 2xl:ml-[10rem] lg:ml-[10rem] lg:w-[19rem] xl:w-[28rem] 2xl:w-[35rem] mb-[3rem] xl:ml-[9rem] xl:mr-[0.5rem]">
                    <h2 className="text-2xl font-semibold text-center mb-5">Order summary</h2>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col -ml-6 border-b pb-4 xl:ml-5">
                            <div className="flex items-center space-x-4">
                                <Image src={item.image} alt={item.title} width={80} height={80} className="object-contain rounded-md" />
                                <div className="flex-1 space-y-2 md:space-y-3">
                                    <h3 className="font-semibold text-sm text-[#2B2B2B]">{item.title}</h3>
                                    <p className="text-xs text-gray-600">Size: 19 cm</p>
                                    <p className="text-xs text-gray-600">SKU: {item.sku}</p>
                                    <div className="flex items-center space-x-2 border border-[#008080] w-[6.5rem] rounded-md px-2">
                                        <button
                                            className="px-3 py-1 text-[#008080]"
                                            onClick={() => handleQuantityChange(item.id, false)}
                                        >
                                            -
                                        </button>
                                        <span className="text-xs">{item.quantity}</span>
                                        <button
                                            className="px-3 text-[#008080]"
                                            onClick={() => handleQuantityChange(item.id, true)}
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
