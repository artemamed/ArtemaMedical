import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PackageCheck } from "lucide-react";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Select from "react-select";
import countryList from "react-select-country-list";

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
const options = countryList().getData();

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        getValues,
    } = useForm<ShippingAddress>({
        resolver: zodResolver(shippingAddressSchema),
    });

    const router = useRouter();

    // Fetch user data from Redux
    const { firstName, lastName, phoneNumber, email } = useSelector(
        (state: RootState) => state.auth);

    // Set default values when component mounts
    useEffect(() => {
        reset({
            firstName: firstName || "",
            lastName: lastName || "",
            phoneNumber: phoneNumber || "",
            email: email || "",
        });
    }, [firstName, lastName, phoneNumber, email, reset]);

    const navigateToOrderComplete = () => {
        router.push("/cart/checkOut/orderComplete");
    };

    const onSubmit = (data: ShippingAddress) => {
        toast.success("Shipping Address Submitted");
        console.log("Form submitted:", data);
        navigateToOrderComplete();
    };

    const handleChange = (selectedOption: { value: string } | null) => {
        if (selectedOption) {
            setValue("country", selectedOption.value);
        } else {
            setValue("country", "");
        }
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
                                placeholder="Enter your first name"
                            />
                            {errors.firstName && (
                                <span className="text-red-500 text-xs">{errors.firstName.message}</span>
                            )}
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
                                placeholder="Enter your last name"
                            />
                            {errors.lastName && (
                                <span className="text-red-500 text-xs">{errors.lastName.message}</span>
                            )}
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
                            placeholder="Enter your phone number"
                        />
                        {errors.phoneNumber && (
                            <span className="text-red-500 text-xs">{errors.phoneNumber.message}</span>
                        )}
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
                            placeholder="Enter your email address"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">{errors.email.message}</span>
                        )}
                    </div>

                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Address</h2>
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
                            placeholder="Enter your street address"
                        />
                        {errors.street && <span className="text-red-500 text-xs">{errors.street.message}</span>}
                    </div>

                    {/* Country */}
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
                            value={options.find(option => option.value === getValues('country'))}
                        />
                        {errors.country && (
                            <span className="text-red-500 text-xs">{errors.country.message}</span>
                        )}
                    </div>

                    {/* City */}
                    <div className="text-gray-700 text-sm">
                        <label htmlFor="city" className="block mb-2 font-medium">
                            City <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="city"
                            {...register("city")}
                            className="w-full p-3 border rounded-md"
                            placeholder="Enter your city"
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
                                placeholder="Enter your state"
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
                                placeholder="Enter your zip code"
                            />
                            {errors.zipCode && <span className="text-red-500 text-xs">{errors.zipCode.message}</span>}
                        </div>
                    </div>

                    {/* Different Billing Address Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            {...register("differentBillingAddress")}
                            className="mr-2"
                        />
                        <label className="text-sm">Use different billing address</label>
                    </div>

                    {/* Place Order Button */}
                    <Button type="submit" className="flex gap-2 mt-6">
                        Place Order<PackageCheck />
                    </Button>

                </form>
            </div>
        </>
    );
};

export default ContactForm;
