import React from "react";
import Image from "next/image";
import logo1 from "@/public/assets/Signin_Logo.png";
import SigninForm from "./form";

const SigninPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl 2xl:max-w-5xl bg-[#CFE7E7] rounded-3xl shadow-2xl overflow-hidden">
        {/* Logo Section - Shows at top on mobile, left side on desktop */}
        <div className="flex md:w-1/2 bg-[#CFE7E7] p-8 md:p-[5rem]">
          <div className="relative w-full flex justify-center items-center">
            <Image
              src={logo1}
              alt="Company Logo"
              className="object-contain w-full h-auto max-h-[200px] md:max-h-none"
              priority
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 lg:p-[4rem] z-10 rounded-3xl bg-white shadow-lg content-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Sign In to your Account
          </h2>
          <SigninForm />
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/auth/signup"
              className="text-[#008080] hover:underline"
            >
              Sign up here
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default SigninPage;
