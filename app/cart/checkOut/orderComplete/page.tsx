// app/cart/checkOut/orderComplete/page.tsx

"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const OrderComplete: React.FC = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { firstName, lastName, phoneNumber, email } = useSelector(
    (state: RootState) => state.auth
  );

  // State for order details
  const [orderCode, setOrderCode] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<string>("Pending");
  const [shippingInfo, setShippingInfo] = useState<{
    shippingInfo: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    contactInfo: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
    };
  } | null>(null);

  const getValidImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return "/placeholder.png";
    const baseUrl = "https://medinven.api.artemamed.com";
    return imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`;
  };

  // Fetch order details and payment status
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const refNo = queryParams.get("refNo");
    const status = queryParams.get("status");

    if (refNo) {
      setOrderCode(refNo);
    }

    if (status) {
      setPaymentStatus(status);
    }

    setOrderDate(new Date().toLocaleDateString());

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = total * 0.062;
    const freightCharge = (() => {
      if (cartItems.length === 1 && cartItems[0].quantity === 1) {
        return 25;
      }
      const hasMultipleCharges = cartItems.some(
        (item) => item.quantity > 1 || cartItems.length > 1
      );
      return hasMultipleCharges ? 75 : 0;
    })();

    const subtotal = Math.ceil(total + freightCharge + tax);
    setOrderTotal(subtotal);

    const encryptedData = Cookies.get("shipping_contact_info");
    if (encryptedData) {
      const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default_key";
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (decryptedData) {
        setShippingInfo(JSON.parse(decryptedData));
      }
    }
  }, [cartItems]);

  // Send email when all required data is ready
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

  // Handle payment status toasts
  useEffect(() => {
    if (paymentStatus === "Failed") {
      toast.error("Payment failed. Please try again.");
    } else if (paymentStatus === "Success") {
      toast.success("Payment successful!");
    }
  }, [paymentStatus]);

  const navigateToMoreProducts = () => {
    router.push("/category");
  };

  const sendOrderConfirmationEmail = async () => {
    const emailData = {
      firstName: firstName || "Customer",
      lastName: lastName || "",
      email: email || "no-reply@artemamed.com",
      orderCode: orderCode || "N/A",
      orderDate: orderDate || new Date().toLocaleDateString(),
      orderTotal: orderTotal || 0,
      paymentStatus: paymentStatus || "Pending",
      shippingInfo: shippingInfo || {
        shippingInfo: {
          street: "N/A",
          city: "N/A",
          state: "N/A",
          zipCode: "N/A",
          country: "N/A",
        },
        contactInfo: {
          firstName: "Customer",
          lastName: "",
          phoneNumber: "N/A",
          email: "no-reply@artemamed.com",
        },
      },
      items: cartItems.map((item) => ({
        name: item.title,
        size: item.size || "N/A",
        sku: item.sku || "N/A",
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await axios.post("/api/sendOrderConfirmation", emailData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        console.error("Failed to send email:", response.data);
        throw new Error("Failed to send order confirmation email");
      }

      console.log("Email sent successfully:", response.data.message);
    } catch (error) {
      console.error("Error sending order confirmation email:", error);
    }
  };

  return (
    <motion.div
      className="min-h-screen p-4 mx-4 lg:mx-[3rem] xl:mx-[5rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Title */}
      <motion.h1
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-teal-800 text-center mb-5"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Order
      </motion.h1>

      {/* Steps */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center mb-8 gap-4 md:gap-8 lg:gap-12"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="hidden sm:flex items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-teal-800 text-white flex items-center justify-center rounded-full text-xs md:text-sm">
            ✓
          </div>
          <span className="ml-2 text-teal-800 text-sm md:text-base">Shopping cart</span>
        </div>
        <div className="hidden sm:flex items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-teal-800 text-white flex items-center justify-center rounded-full text-xs md:text-sm">
            ✓
          </div>
          <span className="ml-2 text-teal-800 text-sm md:text-base">Checkout details</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-teal-600 text-white flex items-center justify-center rounded-full text-xs md:text-sm">
            3
          </div>
          <span className="ml-2 text-teal-600 text-sm md:text-base">Order complete</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex items-center justify-center lg:mt-12"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-white rounded-lg shadow-xl p-4 md:p-6 lg:p-8 max-w-[90%] md:max-w-[800px] text-center">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-2 text-[#6C7275]">
            Thank You For Choosing Artema!
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#2B2B2B]">
            Your order has been received
          </p>

          {/* Products */}
          <div className="flex justify-center mt-6 gap-4">
            {cartItems.length > 0 ? (
              cartItems.map((product, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    width={100}
                    height={100}
                    src={getValidImageUrl(product.image)}
                    alt={product.title}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-md"
                  />
                  <span className="absolute -top-2 -right-2 bg-[#004040] text-white text-xs md:text-sm rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
                    {product.quantity}
                  </span>
                </motion.div>
              ))) : (
              <p className="text-gray-500">No items in the cart</p>
            )}
          </div>

          {/* Order Details */}
          <div className="mt-6 space-y-2 text-gray-600 text-sm md:text-base">
            <p>
              <span className="font-medium text-[#6C7275]">Order code:</span> {orderCode || "Loading..."}
            </p>
            <p>
              <span className="font-medium text-[#6C7275]">Date:</span> {orderDate || "Loading..."}
            </p>
            <p>
              <span className="font-medium text-[#6C7275]">Total:</span> ${orderTotal.toFixed(2) || "Loading..."}
            </p>
            <p>
              <span className="font-medium text-[#6C7275]">Payment method:</span> Credit / Debit Card
            </p>
            <p>
              <span className="font-medium text-[#6C7275]">Payment Status:</span> {paymentStatus}
            </p>
          </div>

          {/* Shipping and Contact Info */}
          {shippingInfo && (
            <div className="mt-6 space-y-2 text-gray-600 text-sm md:text-base">
              <p>
                <span className="font-medium text-[#6C7275]">Shipping Address:</span> {shippingInfo.shippingInfo.street}, {shippingInfo.shippingInfo.city}, {shippingInfo.shippingInfo.state}, {shippingInfo.shippingInfo.zipCode}, {shippingInfo.shippingInfo.country}
              </p>
              <p>
                <span className="font-medium text-[#6C7275]">Contact Info:</span> {shippingInfo.contactInfo.firstName} {shippingInfo.contactInfo.lastName}, {shippingInfo.contactInfo.phoneNumber}, {shippingInfo.contactInfo.email}
              </p>
            </div>
          )}

          {/* Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="mt-6 text-sm md:text-base px-6 py-2 md:py-3 bg-teal-800 text-white hover:bg-teal-700 transition-all"
              onClick={navigateToMoreProducts}
            >
              Explore More Products
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default OrderComplete;