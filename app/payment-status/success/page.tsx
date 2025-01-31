"use client";

import { redirect, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  if (status === "success") {
    toast.success("Payment successful!");
  } else {
    toast.error("Payment failed.");
  }
  return redirect('/');
};

export default SuccessPage;
