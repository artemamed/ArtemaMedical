"use client";
import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const CartButton = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItemsAdded = cartItems.length;
  return (
    <div className="relative">
      <Link href={"/cart"} className="hover:text-gray-500">
        <ShoppingCart className="w-6 h-6 hover:text-[#008080]" />
        {totalItemsAdded > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#008080] text-white rounded-full text-xs px-2 py-0.5">
            {totalItemsAdded}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartButton;
