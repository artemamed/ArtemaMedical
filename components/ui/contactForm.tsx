import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Select from "react-select";
import countryList from "react-select-country-list";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PackageCheck } from "lucide-react";


const options = countryList().getData();


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
const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ShippingAddress>({
        resolver: zodResolver(shippingAddressSchema),
    });

    const handleChange = (selectedOption: { value: string } | null) => {
        if (selectedOption) {
            setValue("country", selectedOption.value);
        } else {
            setValue("country", "");
        }
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
        <>
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

                    {/* Country Selector */}
                    <div className="text-gray-700 text-sm">
                        <label htmlFor="country" className="block mb-2 font-medium">
                            Country <span className="text-red-500">*</span>
                        </label>
                        <Select
                            id="country"
                            options={options}
                            placeholder="Select Country"
                            className="w-full"
                            onChange={handleChange}
                        />
                        {errors.country && (
                            <span className="text-red-500 text-xs">{errors.country.message}</span>
                        )}
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

                    {/* Place Order Button */}
                    <Button
                        type="submit"
                        className="flex gap-2"
                    >
                        Place Order<PackageCheck />
                    </Button>
                </form>
            </div>
        </>
    );
};

export default ContactForm