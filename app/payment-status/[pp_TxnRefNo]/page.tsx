"use client";
import React from "react";
import { notFound, useSearchParams } from "next/navigation";

const PaymentStatus = () => {
  const searchParams = useSearchParams();
  const pp_TxnRefNo = searchParams.get("pp_TxnRefNo");

  if (pp_TxnRefNo === null) {
    notFound();
  }

  return <React.Fragment></React.Fragment>;
};

export default PaymentStatus;
