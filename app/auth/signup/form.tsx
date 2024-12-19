"use client";

import React, { useState } from "react";
import { LockKeyhole, Mail, Phone, User } from "lucide-react";
import Input from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";
import { setAuth } from "@/redux/features/authSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API;

// Define Zod schema for validation
const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
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
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signupSchema.parse(formData);
      setLoading(true);

      const response = await fetch(`${API_URL}/buyers/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY || "",
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
        throw new Error(errorData.message || "An error occurred");
      }

      const data = await response.json();

      // Automatically sign in the user
      dispatch(
        setAuth({
          email: formData.email,
          token: data.token,
          avatarUrl: data.avatarUrl,
          firstName: formData.firstName,
          lastName: formData.lastName,   
          phoneNumber: formData.phone,   
        })
      );

      toast.success("Account created and signed in successfully!");
      router.push("/auth/signin");
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else if (error instanceof Error) {
        toast.error(error.message);
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
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
