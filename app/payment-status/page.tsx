"use client";
import React from "react";

import { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SECRET_KEY = process.env.JWT_SECRET!;

const PaymentStatus = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<string | null>(null);
  const [txnRef, setTxnRef] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!token) {
      setExpired(true);
      return;
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as {
        status: string;
        txnRef: string;
      };
      setStatus(decoded.status);
      setTxnRef(decoded.txnRef);

      // Remove history so user can't go back
      window.history.replaceState(null, "", "/payment-status");
    } catch (error) {
      console.error("Error decoding JWT:", error);
      setExpired(true);
    }
  }, [token]);
  if (!token) {
    return notFound();
  }
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center h-screen overflow-y-hidden">
        {expired ? (
          <div className="flex flex-col items-center justify-center gap-7">
            <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
            <p>Transaction Reference: {txnRef}</p>
            <div className="flex flex-row justify-between items-center gap-6">
              <Button>Home</Button>
              <Link href="/cart" className="text-green-600 dark:text-green-400">
                Go to Cart
              </Link>
            </div>
          </div>
        ) : status === "success" ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900  flex items-center justify-center mx-auto mb-3.5">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Success</span>
            </div>
            <div className="flex flex-row justify-center gap-3 items-center">
              <p className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Payment Successful!
              </p>
            </div>
            <Link href={"/"}>
              <Button>Back to Home</Button>
            </Link>
          </div>
        ) : status === "failed" ? (
          <div className="flex flex-col items-center justify-center gap-7">
            <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
            <p>Transaction Reference: {txnRef}</p>
            <div className="flex flex-row justify-between items-center gap-6">
              <Button>Home</Button>
              <Link href="/cart" className="text-green-600 dark:text-green-400">
                Go to Cart
              </Link>
            </div>
          </div>
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold text-gray-600">Processing...</h1>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PaymentStatus;
