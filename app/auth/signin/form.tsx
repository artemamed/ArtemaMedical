"use client";

import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  // Mock Login Function
  const mockLogin = (email: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "ubaid@gmail.com" && password === "123456") {
          resolve("Login successful!");
        } else {
          reject("Invalid email or password.");
        }
      }, 1000);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await mockLogin(formData.email, formData.password);
      document.cookie = "userToken=12345; path=/"; // Set a mock cookie for authentication
      setMessage(response); // Display success message
      router.push("/cart"); // Redirect to the cart page
    } catch (error) {
      setMessage(error as string); // Display error message
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

      {message && (
        <p className={`text-center mt-4 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default SigninForm;
