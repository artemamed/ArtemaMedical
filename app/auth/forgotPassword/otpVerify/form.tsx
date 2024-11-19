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
    <div className="flex flex-col items-center justify-center">
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
            className="w-10 h-10 text-center border-2 rounded-md focus:ring focus:ring-teal-500 focus:outline-none"
            maxLength={1}
            autoFocus={index === 0}
          />
        ))}
      </div>
      <Button className="bg-[#008080] px-[2rem]">Verify</Button>
    </div>

  );
};

export default OTPVerification;
