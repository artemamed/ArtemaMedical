"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const PaymentStatus = () => {
  const searchParams = useSearchParams();
  const pp_TxnRefNo = searchParams.get("pp_TxnRefNo");
  const [status, setStatus] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pp_TxnRefNo) {
      fetch(`/api/jc-p/status-inquiry-api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txnRefNo: pp_TxnRefNo }),
      })
        .then((response) => response.json())
        .then((data) => {
          setStatus(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching transaction status:", err);
          setError("Failed to fetch transaction status");
          setLoading(false);
        });
    }
  }, [pp_TxnRefNo]);

  if (!pp_TxnRefNo) {
    return <div>Invalid Transaction Reference Number</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Payment Status</h1>
      <pre>{JSON.stringify(status, null, 2)}</pre>
    </div>
  );
};
export default PaymentStatus;