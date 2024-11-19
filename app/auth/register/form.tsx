"use client";
import { useState } from "react";
import Link from "next/link";
import React from "react";

const Registerform = () => {
  const [isloading, ] = useState<boolean>(false);

  // type of the login form inputs
  type IRegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  };
  // state where we store out Login form inputs
  const [input, setinput] = useState<IRegisterForm>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  // its help the user to write something in the Login input field
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };  // Handle the submit Form
  
  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0  md:justify-around md:space-x-4">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First name
            </label>
            <input
              type="text"
              name="first_name"
              value={input.first_name}
              id="first_name"
              placeholder="john"
              className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-light-secondary dark:focus:border-light-secondary"
              onChange={handleChange}
              required={true}
              autoComplete={"true"}
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last name
            </label>
            <input
              type="text"
              name="last_name"
              value={input.last_name}
              id="last_name"
              placeholder="Bride"
              className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-light-secondary dark:focus:border-light-secondary"
              onChange={handleChange}
              required={true}
              autoComplete={"true"}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={input.email}
            id="email"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-light-secondary dark:focus:border-light-secondary"
            placeholder="name@company.com"
            onChange={handleChange}
            required={true}
            autoComplete={"true"}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={input.phone}
            id="phone"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-light-secondary dark:focus:border-light-secondary"
            placeholder="11198272983"
            onChange={handleChange}
            required={true}
            autoComplete={"true"}
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your Address
          </label>
          <input
            type="text"
            name="address"
            value={input.address}
            id="address"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-light-secondary dark:focus:border-light-secondary"
            onChange={handleChange}
            required={true}
            autoComplete={"true"}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={input.password}
            autoComplete={"true"}
            onChange={handleChange}
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-light-secondary dark:focus:border-light-secondary"
            required={true}
          />
        </div>

        <button
          type="button"
          // onClick={handleSubmitLogin}
          disabled= {isloading}
          className="w-full text-white bg-green-400 focus:ring-4 focus:outline-none focus:ring-light-secondary font-bold rounded-lg text-lg px-5 py-2.5 text-center "
        >
          Create an Account
        </button>
        <p className="text-base font-normal text-gray-800 ">
          Already have an account?{" "}
          <Link
            href={"/auth/login"}
            className="font-medium hover:text-green-500 hover:underline "
          >
            Login here
          </Link>
        </p>
      </div>
    </>
  );
};

export default Registerform;
