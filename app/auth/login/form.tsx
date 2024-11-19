"use client";

import { useState } from "react";
import Link from "next/link";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State for the login form inputs
  const [input, setInput] = useState({ email: "", password: "" });

  // Handle input changes
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Add handleSubmitLogin function
  const handleSubmitLogin = async () => {
    setIsLoading(true);
    try {
      // Add your login logic here
      console.log('Login attempted with:', input);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Your email
        </label>
        <input
          type="email"
          value={input.email}
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-light-secondary focus:border-light-secondary block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-light-secondary dark:focus:border-light-secondary"
          placeholder="name@company.com"
          onChange={handleChange}
          required={true}
          autoComplete="true"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Password
        </label>
        <input
          type="password"
          value={input.password}
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-light-secondary focus:border-light-secondary block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-light-secondary dark:focus:border-light-secondary"
          onChange={handleChange}
          required={true}
        />
      </div>
      <button
        type="button"
        onClick={handleSubmitLogin}
        className="w-full text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-light-secondary font-bold rounded-lg text-lg px-5 py-2.5 text-center"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <div>
        <p className="text-base font-normal text-gray-800 text-center">
          Create a new account?{" "}
          <Link href="/auth/register" className="font-medium hover:underline hover:text-green-500">
            Register here
          </Link>
        </p>
        <p className="text-base font-normal text-gray-800 text-center">or</p>
        <p className="text-base font-normal text-gray-800 text-center">
          <Link href="/auth/forgot-password" className="font-medium hover:text-green-500 hover:underline">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
