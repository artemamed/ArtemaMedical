"use client";

import { Mail } from "lucide-react";
import React, { useState } from "react";

const OtpVerify = () => {
  const [formData, setFormData] = useState({
    email: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  const inputClass = "w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="relative w-full">
        <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`} />
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

      <p className="text-center text-sm text-gray-600">
        Check your inbox to get OTP Code to reset your password
      </p>

      <button
        type="submit"
        className="w-full bg-[#008080] text-white py-2.5 sm:py-3 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base font-medium"
      >
        Get OTP Code
      </button>
    </form>
  );
};

export default OtpVerify;
