"use client";

import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import React, { useState } from "react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          {showConfirmPassword ?
            <Eye className={iconClass} /> :
            <EyeOff className={iconClass} />
          }
        </button>
      </div>

      <button
        type="submit"
        className=" bg-[#008080] p-3 mx-auto block text-white py-2.5 sm:py-3 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base font-medium"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
