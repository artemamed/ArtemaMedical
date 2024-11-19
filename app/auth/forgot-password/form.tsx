"use client";
import { useState } from "react";
import React from "react";

const ForgotPassword = () => {
  const [isloading, ] = useState<boolean>(false);
  // type of the IForgotPassword form inputs
  type IForgotPassword = {
    email: string;
  };
  // state where we store out IForgotPassword form inputs
  const [input, setinput] = useState<IForgotPassword>({
    email: "",
  });
  // its help the user to write something in the input field
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };  
  
  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            value={input.email}
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-light-secondary focus:border-light-secondary block w-full p-2.5 "
            placeholder="name@company.com"
            onChange={handleChange}
            required={true}
            autoComplete={"true"}
          />
          <label htmlFor="emailOTP" className="text-sm">
            Write you email and for get OTP verification code.
          </label>
        </div>

        <button
          type="button"
          // onClick={handleSendOTP}
          disabled={isloading}
          className="w-full text-white bg-green-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Get OTP Code
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
