"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const OrderComplete: React.FC = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // State for order details
  const [orderCode, setOrderCode] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<string>("Pending");

  const getValidImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return "/placeholder.png";
    const baseUrl = "https://medinven.api.artemamed.com";
    return imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`;
  };

  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const refNo = queryParams.get("refNo");
    const status = queryParams.get("status");

    if (refNo) {
      setOrderCode(refNo);
    }

    if (status) {
      setPaymentStatus(status);
    }

    // Set the current date
    setOrderDate(new Date().toLocaleDateString());

    // Calculate the total from the cart items
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setOrderTotal(total);

    // Show a toast based on the payment status
    if (status === "Failed") {
      toast.error("Payment failed. Please try again.");
    } else if (status === "Paid") {
      toast.success("Payment successful!");
    }
  }, [cartItems]);

  const navigateToMoreProducts = () => {
    router.push("/category");
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
              ))            ) : (
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
              <span className="font-medium text-[#6C7275]">Payment method:</span> Credit Card
            </p>
            <p>
              <span className="font-medium text-[#6C7275]">Payment Status:</span> {paymentStatus}
            </p>
          </div>

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