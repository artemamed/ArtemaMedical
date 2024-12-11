"use client";

import React, { useState } from "react";
import { LockKeyhole, Mail, Phone, User } from "lucide-react";
import Input from "@/components/ui/input";
import { toast } from "react-toastify";  // Import React Toastify
import { z } from "zod";  // Import Zod for form validation

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = "d2dc7fd4b580502694511b66b31e72ea420aef1f2f775d8d2b7f96282399856cf7b3af24b0cd8223103c93cc669c117b";

// Define Zod schema for validation
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate form using Zod schema
    try {
      signupSchema.parse(formData);  // This will throw an error if validation fails
      setLoading(true);
      setMessage(null);
  
      const response = await fetch(`${API_URL}/buyers/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
  
        // Show API error message in a toast if response is not ok
        toast.error(errorData.message || "An error occurred");
        throw new Error(errorData.message || "An error occurred.");
      }
  
      setMessage("Account created successfully!");
      toast.success("Account created successfully!");  // Show success toast
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        // Show validation error toasts only for Zod errors
        error.errors.forEach((err) => toast.error(err.message));
      } else if (error instanceof Error) {
        // Handle API errors and show one toast message for the error
        if (!error.message.includes("already exists") && !error.message.includes("An error occurred")) {
          toast.error(error.message);  // Show error toast for API errors
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="firstName"
        placeholder="First Name"
        icon={<User className="text-gray-400" />}
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <Input
        name="lastName"
        placeholder="Last Name"
        icon={<User className="text-gray-400" />}
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        icon={<Mail className="text-gray-400" />}
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        name="phone"
        type="tel"
        placeholder="Phone Number"
        icon={<Phone className="text-gray-400" />}
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        icon={<LockKeyhole className="text-gray-400" />}
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        icon={<LockKeyhole className="text-gray-400" />}
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      {message && <p className={`text-sm ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>{message}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
