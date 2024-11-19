"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";

const AddOTP = () => {
  const [input, setinput] = React.useState({
    OTP: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };  const HandleVerify = async () => {
  
   
  };
  return (
    <>
      <div className="max-w-md mx-auto  my-20 ">
        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl lg:text-4xl ">
          Enter the OTP whose we send to your email
        </h1>
        <form className=" rounded px-8 py-6">
          <div className="mb-4">
            <Label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="OTP"
            >
              OTP:
            </Label>
            <input
              className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-light-secondary dark:focus:border-light-secondary"
              id="OTP"
              name="OTP"
              value={input.OTP}
              onChange={handleChange}
              type="text"
              placeholder="Enter OTP"
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              className="bg-green-500 text-white font-bold py-2 px-5  focus:outline-none focus:shadow-outline"
              type="button"
              onClick={HandleVerify}
            >
              Verify OTP
            </Button>
            <Button className="inline-block align-baseline font-bold text-sm bg-transparent hover:bg-green-500">
              Resend OTP
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddOTP;
