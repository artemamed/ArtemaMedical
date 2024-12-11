"use client";

import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod"; // Import Zod for schema validation
import { toast } from "react-toastify"; // Import React Toastify

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API;

// Zod schema for form validation
const signinSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

const SigninForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form data using Zod
    try {
      signinSchema.parse(formData); // Will throw error if validation fails
      postMessage(null); // Reset message

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (API_KEY) {
        headers["x-api-key"] = API_KEY;
      }

      const response = await fetch(`${API_URL}/buyers/buyer-login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || "An error occurred during login.");
      }

      const data = await response.json();
      document.cookie = `userToken=${data.token}; path=/`; // Set authentication token
      toast.success("Login successful!"); // Show success toast
      router.push("/cart"); // Redirect to the cart page
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        // Show validation error toasts
        error.errors.forEach((err) => toast.error(err.message));
      } else if (error instanceof Error) {
        // Show API error toast
        toast.error(error.message);
      } else {
        toast.error("An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  const iconClass = "h-4 w-4";
  const inputClass =
    "w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="relative w-full">
        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${iconClass}`} />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

      <div className="relative w-full">
        <LockKeyhole className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${iconClass}`} />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          {showPassword ? <Eye className={iconClass} /> : <EyeOff className={iconClass} />}
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
