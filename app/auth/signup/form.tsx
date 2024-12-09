"use client";

import React, { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, Phone, User } from "lucide-react";
import { mockRegister } from "@/utils/auth";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await mockRegister({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: parseInt(formData.phone, 10),
        password: formData.password,
      });
      setMessage(response);
    } catch (error) {
      setMessage(error as string);
    } finally {
      setLoading(false);
    }
  };
  const iconClass = "h-4 w-4";
  const inputClass =
    "w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="flex gap-4">
        <div className="relative w-1/2">
          <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${iconClass}`} />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-6 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="relative w-1/2">
          <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${iconClass}`} />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-6 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"

          />
        </div>
      </div>

      <div className="relative w-full">
        <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${iconClass}`} />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

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

      <div className="relative w-full">
        <LockKeyhole className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${iconClass}`} />
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          {showConfirmPassword ? <Eye className={iconClass} /> : <EyeOff className={iconClass} />}
        </button>
      </div>

      {message && (
        <p className="text-center text-sm text-red-500">{message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#008080] text-white py-2.5 sm:py-3 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base font-medium"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};
export default SignupForm;
