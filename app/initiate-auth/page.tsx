'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const NextStep: React.FC = () => {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  // Memoized handleAuthenticatePayer function
  const handleAuthenticatePayer = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/authenticate-payer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, sessionId, amount }),
      });

      const data = await response.json();
      console.log("Checking the response is ok or not", response);

      if (response.ok) {
        localStorage.setItem('authData', JSON.stringify(data));
        router.push('/3ds-challenge');
      } else {
        setError(data.error || 'An error occurred during authentication.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [orderId, sessionId, amount, router]);

  // useEffect to parse query parameters and set states
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      console.log("@@@ URL PARAMS @@@");
      console.log(urlParams);
      setOrderId(urlParams.get('orderId'));
      setSessionId(urlParams.get('sessionId'));
      setAmount(urlParams.get('amount'));
    }
  }, []);

  // Automatically trigger the OTP generation when the component loads
  useEffect(() => {
    if (orderId && sessionId && amount) {
      handleAuthenticatePayer(); // Call the function to generate OTP automatically
    }
  }, [orderId, sessionId, amount, handleAuthenticatePayer]); // Ensure it runs when data is available

  return (
    <div className="relative h-screen w-full flex justify-center items-center bg-gray-100">
      {/* Full screen loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
          <span className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
      )}

    </div>
  );
};

export default NextStep;
