"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "@/redux/features/cartSlice";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (status) {
      if (status === "success") {
        toast.success("Payment successful!");
      } else {
        toast.error("Payment failed.");
      }

      // Dispatch clearCart action
      dispatch(clearCart());

      // Redirect user after 2 seconds (optional delay)
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [status, dispatch, router]);

  return <></>;
};

export default SuccessPage;
