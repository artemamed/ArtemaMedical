"use client";

import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/features/authSlice";
import { toast } from "react-toastify";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API; // Include the API key

const signinSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

const SigninForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "", firstName: "", lastName: "", phone: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate the form data using Zod schema
      signinSchema.parse(formData);

      // Make the API request to login
      const response = await fetch(`${API_URL}buyers/buyer-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY || "",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid login credentials");
      }

      // Parse the API response
      const { data, success, message, statusCode } = await response.json();

      // Ensure success and correct status code
      if (success && statusCode === 201) {
        // Dispatch Redux action to set the authenticated user
        dispatch(
          setAuth({
            email: data.email,
            token: "", // Placeholder for token if not included in the API response
            avatarUrl: "", // Placeholder for avatar URL if not included in the API response
            firstName: data.firstname,
            lastName: data.lastname,
            phoneNumber: data.number,
          })
        );

        // Show a success message and redirect the user
        toast.success(message || "Login successful!");
        router.push("/cart/checkOut");
      } else {
        throw new Error(message || "An error occurred during login");
      }
    } catch (error: unknown) {
      // Show an error message if something goes wrong
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      // Reset the loading state
      setLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="relative w-full">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="relative w-full">
        <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-[#008080] text-white py-2.5 sm:py-3 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base font-medium"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default SigninForm;
