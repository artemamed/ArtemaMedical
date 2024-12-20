"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currency ] = useState<string>("USD");
  const [amount, setAmount] = useState<number>(10);
  const [description, setDescription] = useState<string>("");
  const [paymentLink, setPaymentLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Generate random order ID function
  const generateOrderId = (): string => {
    return "ORD" + Math.floor(Math.random() * 1000000);
  };

  // Handle form submission
  const handleGenerateLink = async () => {
    setLoading(true);

    // Calculate expiry date (7 days from now)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    const expiryDateTime = expiryDate.toISOString();

    const order = {
      currency,
      amount,
      id: generateOrderId(),
      description,
    };

    const payload = {
      apiOperation: "INITIATE_CHECKOUT",
      checkoutMode: "PAYMENT_LINK",
      interaction: {
        operation: "PURCHASE",
        merchant: {
          name: "ARTEMAMEDICA",
          url: "https://artemamed.com/",
        },
      },
      order,
      paymentLink: {
        expiryDateTime,
        numberOfAllowedAttempts: "7",
      },
    };

    try {
      const response = await axios.post("/api/payment", payload);
      console.log("Response:", response.data);

      if (response.data.paymentLink?.url) {
        setPaymentLink(response.data.paymentLink.url);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Payment Link Generator</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Currency</label>
            <input
              type="text"
              value={currency}
              readOnly
              className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 border rounded"
              placeholder="Amount"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Order description"
            />
          </div>
          <Button
            onClick={handleGenerateLink}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Link"}
          </Button>
        </div>

        {paymentLink && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <h2 className="font-bold">Payment Link</h2>
            <p className="text-sm text-gray-700 break-words">
              <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                {paymentLink}
              </a>
            </p>
            <button
              onClick={() => navigator.clipboard.writeText(paymentLink)}
              className="mt-2 bg-green-600 text-white py-1 px-2 rounded hover:bg-green-500"
            >
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
