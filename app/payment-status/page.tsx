'use client';
import React from "react";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import jwt from "jsonwebtoken";

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

  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {expired ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-600">
              Session Expired
            </h1>
            <p>Please refresh the page or try again.</p>
          </div>
        ) : status === "success" ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-green-600">
              Payment Successful!
            </h1>
            <p>Transaction Reference: {txnRef}</p>
          </div>
        ) : status === "failed" ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
            <p>Transaction Reference: {txnRef}</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-600">Processing...</h1>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PaymentStatus;
