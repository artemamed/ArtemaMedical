"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const OTPVerification = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Ensure only one character is entered
    setOtp(newOtp);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text").slice(0, 6).split("");
    setOtp(pasteData);
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="p-[5rem] rounded-2xl shadow-xl w-[30rem] bg-[#CFE7E7] ">
        <h1 className="text-xl font-semibold text-center mb-2">
          OTP Verification
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the OTP sent to your email
        </p>
        <div className="flex gap-2 justify-center mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e)}
              className="w-10 h-10 text-center border rounded-md focus:ring focus:ring-teal-500 focus:outline-none"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </div>
        <Button className="bg-[#008080] mx-auto block">Verify</Button>

      </div>
    </div>
  );
};

export default OTPVerification;
