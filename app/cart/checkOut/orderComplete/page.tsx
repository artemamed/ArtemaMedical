"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const OrderComplete: React.FC = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { firstName, lastName, phoneNumber, email } = useSelector((state: RootState) => state.auth);

  const [orderCode, setOrderCode] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<string>("Pending");
  const [shippingInfo, setShippingInfo] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setOrderCode(queryParams.get("refNo") || "");
    setPaymentStatus(queryParams.get("status") || "Pending");
    setOrderDate(new Date().toLocaleDateString());

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.062;
    const freightCharge = cartItems.length === 1 ? 25 : 75;
    setOrderTotal(Math.ceil(subtotal + freightCharge + tax));

    const encryptedData = Cookies.get("shipping_contact_info");
    if (encryptedData) {
      try {
        const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default_key";
        const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        setShippingInfo(JSON.parse(decryptedData));
      } catch (error) {
        console.error("Error decrypting shipping info:", error);
      }
    }
  }, [cartItems]);

  useEffect(() => {
    if (
      shippingInfo &&
      orderCode &&
      orderDate &&
      orderTotal > 0 &&
      paymentStatus &&
      firstName &&
      lastName &&
      phoneNumber &&
      email
    ) {
      sendOrderConfirmationEmail();
    }
  }, [shippingInfo, orderCode, orderDate, orderTotal, paymentStatus, firstName, lastName, phoneNumber, email]);

  const sendOrderConfirmationEmail = async () => {
    if (!shippingInfo) {
      console.error("Shipping info is missing.");
      return;
    }

    const emailData = {
      firstName,
      lastName,
      email,
      orderCode,
      orderDate,
      orderTotal,
      paymentStatus,
      shippingInfo,
    };

    try {
      const response = await fetch("/api/sendOrderConfirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error("Failed to send order confirmation email");
      }

      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending order confirmation email:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 mx-4 lg:mx-[3rem] xl:mx-[5rem]">
      <h1 className="text-3xl font-bold text-teal-800 text-center mb-5">Order Confirmation</h1>
      <p className="text-center">Thank you for your order!</p>
      <button className="mt-4 p-2 bg-teal-600 text-white rounded" onClick={() => router.push("/category")}>
        Continue Shopping
      </button>
    </div>
  );
};
export default OrderComplete;
