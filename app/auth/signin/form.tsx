"use client";

import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import React, { useState } from "react";

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  const iconClass = "h-4 w-4 ";
  const inputClass = "w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500";

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
          {showPassword ?
            <Eye className={iconClass} /> :
            <EyeOff className={iconClass} />
          }
        </button>
      </div>
            <a
              href="/auth/forgotPassword"
              className="text-[#008080] hover:underline text-sm m-1"
            >
              Forgot password?
            </a>

      <button
        type="submit"
        className="w-full bg-[#008080] text-white py-2.5 sm:py-3 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base font-medium"
      >
        Sign In
      </button>
    </form>
  );
};

export default SigninForm;
