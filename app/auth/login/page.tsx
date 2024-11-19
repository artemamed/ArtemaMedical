import React from "react";
import LoginForm from "./form";

const Login = () => {
  return (
    <>
      <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden lg:-mt-[7rem]">
          <div className="p-8 md:p-10 lg:p-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-6">
              Login to Your Account
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Please enter your credentials to continue.
            </p>
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
