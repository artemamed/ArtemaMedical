import React from "react";
import ForgotPassword from "./form";

export default function Page() {
  return (
    <>
      <section className="min-h-screen bg-gray-100 flex items-center justify-center md:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden m-2 lg:-mt-[10rem]">
          <div className="p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-6">
              Enter Your Email
            </h1>
            <p className="text-gray-600 text-center mb-8">
              We will send a reset link to your email
            </p>
            <ForgotPassword />
          </div>
        </div>
      </section>
    </>
  );
}
