"use client";

import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { PackageCheck } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { CircleLoader } from "react-spinners";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SessionResponseType = {
  PostURL: string;
  pp_Version: string;
  pp_TxnType: string;
  pp_Language: string;
  pp_MerchantID: string;
  pp_SubMerchantID: string;
  pp_Password: string;
  pp_TxnRefNo: string;
  pp_Amount: number;
  pp_TxnCurrency: string;
  pp_TxnDateTime: string;
  pp_BillReference: string;
  pp_Description: string;
  pp_BankID: string;
  pp_ProductID: string;
  pp_TxnExpiryDateTime: string;
  pp_ReturnURL: string;
  pp_SecureHash: string;
  ppmpf_1: string;
  ppmpf_2: string;
  ppmpf_3: string;
  ppmpf_4: string;
  ppmpf_5: string;
};

const Currencies = [
  {
    label: "USD",
    value: "USD",
    sign: "$",
  },
  {
    label: "GBP",
    value: "GBP",
    sign: "£",
  },
  {
    label: "AUD",
    value: "AUD",
    sign: "A$",
  },
  {
    label: "CAD",
    value: "CAD",
    sign: "C$",
  },
  {
    label: "EUR",
    value: "EUR",
    sign: "€",
  },
  {
    label: "SAR",
    value: "SAR",
    sign: "﷼",
  },
  {
    label: "AED",
    value: "AED",
    sign: "د.إ",
  },
  {
    label: "PKR",
    value: "PKR",
    sign: "Rs",
  },
];

const CheckOut: React.FC = () => {
  const { firstName, lastName, phoneNumber, email } = useSelector(
    (state: RootState) => state.auth
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(false);

  const getValidImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return "/placeholder.png";
    const baseUrl = "https://medinven.api.artemamed.com";
    return imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`;
  };
  const [shippingInfo, setShippingInfo] = useState({
    street: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [PaymentData, setPaymentData] = useState(null);
  const handleCurrencyChange = async (currency: string, amount: string) => {
    console.log(currency, amount);
    if (currency == "USD") {
      setSelectedCurrency("USD");
      return;
    }
    setSelectedCurrency(currency);
    try {
      const apiResponse = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/${currency}/${amount}`
      );
      const data = await apiResponse.data;
      console.log(data);
      const convertedAmount = data.conversion_result;
      setSelectedAmount(convertedAmount);
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong. Please refresh the page and try again."
      );
      return;
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [id]: value }));
  };

  // Encryption key
  const ENCRYPTION_KEY =
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default_key";

  const handleShippingFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { street, country, city, state, zipCode } = shippingInfo;

    const dataToStore = {
      shippingInfo: {
        street,
        country,
        city,
        state,
        zipCode,
      },
      contactInfo: {
        firstName,
        lastName,
        phoneNumber,
        email,
      },
    };

    // Serialize and encrypt data
    const serializedData = JSON.stringify(dataToStore);
    const encryptedData = CryptoJS.AES.encrypt(
      serializedData,
      ENCRYPTION_KEY
    ).toString();

    // Store encrypted data in a cookie
    Cookies.set("shipping_contact_info", encryptedData, {
      expires: 7,
      path: "/",
    });

    toast.success(
      "Shipping information submitted, Click Place Order to checkout"
    );
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
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

  // Handle placing order and redirecting for payment
  // const handlePlaceOrder = async () => {
  //   setLoading(true);
  //   try {
  //     // Step 1: Create session
  //     const createSessionResponse = await axios.post("/api/create-session");
  //     const sessionId = createSessionResponse.data.session.id;

  //     // Step 2: Update session with calculated amount (no need to store the response)
  //     await axios.post("/api/update-session", { sessionId, amount: subtotal });

  //     // Step 3: Redirect to payment URL
  //     const paymentUrl = `${window.location.origin}/api/payment-form?sessionId=${sessionId}&amount=${subtotal}`;

  //     if (paymentUrl) {
  //       window.location.href = paymentUrl; // Redirect to the payment gateway
  //     } else {
  //       throw new Error("Payment link not found");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Payment process failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleJazzCashPayment = async (amount: string) => {
    setLoading(true);
    try {
      const apiResponse = await axios.post("/api/jc-p/create-session", {
        amount: Number(amount),
        currency: selectedCurrency,
      });
      const data = await apiResponse.data;
      // console.log(data);
      setPaymentData(data);
    } catch (error) {
      console.log(error);
      toast.error("Payment process failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutWrapper className="min-h-screen p-4">
      <button className="text-gray-500 mb-4">&lt; Back</button>
      <h1 className="text-3xl md:text-4xl font-bold text-teal-800 text-center mb-5">
        Check Out
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-11 md:gap-1">
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="border p-6 rounded-md h-auto bg-white 2xl:w-[45rem] md:w-[22rem] lg:w-[40rem] xl:w-[47rem]">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Shipping Address{" "}
              <span className="text-lg text-gray-600">(Optional)</span>
            </h2>
            <form className="space-y-4" onSubmit={handleShippingFormSubmit}>
              {/* Street Address */}
              <div className="text-gray-700 text-sm">
                <label htmlFor="street" className="block mb-2 font-medium">
                  Street Address
                </label>
                <input
                  id="street"
                  type="text"
                  className="w-full p-3 border rounded-md"
                  placeholder="Street Address"
                  value={shippingInfo.street}
                  onChange={handleInputChange}
                />
              </div>

              {/* Country */}
              <div className="text-gray-700 text-sm">
                <label htmlFor="country" className="block mb-2 font-medium">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  className="w-full p-3 border rounded-md"
                  placeholder="Street Address"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                />
              </div>

              {/* Town / City */}
              <div className="text-gray-700 text-sm">
                <label htmlFor="city" className="block mb-2 font-medium">
                  Town / City
                </label>
                <input
                  id="city"
                  type="text"
                  className="w-full p-3 border rounded-md"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                />
              </div>

              {/* State and Zip Code */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-gray-700 text-sm">
                  <label htmlFor="state" className="block mb-2 font-medium">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    className="w-full p-3 border rounded-md"
                    placeholder="State"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-gray-700 text-sm">
                  <label htmlFor="zipCode" className="block mb-2 font-medium">
                    Zip Code
                  </label>
                  <input
                    id="zipCode"
                    type="text"
                    className="w-full p-3 border rounded-md"
                    placeholder="Zip Code"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Place Order Button */}
              <Button type="submit" className="flex gap-2">
                Submit
              </Button>
            </form>
          </div>
        </div>

        <div className="space-y-4 border p-[2rem] rounded-md 2xl:ml-[10rem] lg:ml-[10rem] lg:w-[19rem] xl:w-[28rem] 2xl:w-[35rem] mb-[3rem] xl:ml-[9rem] xl:mr-[0.5rem]">
          <h2 className="text-2xl font-semibold text-center mb-5">
            Order Summary
          </h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col -ml-6 border-b pb-4 xl:ml-5"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={getValidImageUrl(item.image)}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="object-contain rounded-md w-full h-[5rem]"
                />
                <div className="flex-1 space-y-2 md:space-y-3">
                  <div className="relative group">
                    <h3 className="font-semibold text-sm text-[#2B2B2B] truncate overflow-hidden whitespace-nowrap w-[6rem] lg:w-[10rem] xl:w-[12.5rem]">
                      {item.title}
                    </h3>
                    <div className="absolute hidden group-hover:block bg-white text-sm text-gray-800 px-2 py-1 rounded shadow-lg -top-8 left-0 z-10">
                      {item.title}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600">Size: {item.size}</p>
                  <p className="text-xs text-gray-600">SKU: {item.sku}</p>
                  <p className="text-xs text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <table className="w-full">
            <tbody>
              <tr className="text-md border-b border-[#E8ECEF]">
                <td className="py-4">Total</td>
                <td className="text-right py-4">${total.toFixed(2)}</td>
              </tr>
              <tr className="text-md border-b border-[#E8ECEF]">
                <td className="py-4">Tax</td>
                <td className="text-right py-4">${tax.toFixed(2)}</td>
              </tr>
              <tr className="text-md border-b border-[#E8ECEF]">
                <td className="py-4">Freight Charge</td>
                <td className="text-right py-4">${freightCharge.toFixed(2)}</td>
              </tr>
              <tr className="font-semibold text-xl">
                <td className="py-4">Total</td>
                <td className="text-right flex justify-end items-center gap-2 py-4">
                  <Select
                    onValueChange={(value) => {
                      handleCurrencyChange(value, subtotal.toFixed(2));
                    }}
                  >
                    <SelectTrigger className="w-[4.5rem] my-2 border rounded-md">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      {Currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {
                    Currencies.filter(
                      (currency) => currency.value === selectedCurrency
                    )[0].sign
                  }{" "}
                  {selectedAmount
                    ? selectedAmount.toFixed(2)
                    : subtotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-sm text-gray-600 mt-2 gap-3">
            <p className="text-red-600 inline-block mr-2">*</p>
            The amounts are to be charged in PKR (Pakistani Rupees){" "}
          </div>{" "}
          <Button
            type="submit"
            className="flex gap-2"
            onClick={() =>
              handleJazzCashPayment(
                selectedAmount ? selectedAmount.toFixed(2) : subtotal.toFixed(2)
              )
            }
            disabled={loading}
          >
            {loading ? (
              <CircleLoader size={20} color="#ffffff" />
            ) : (
              <>
                Place Order <PackageCheck />
              </>
            )}
          </Button>
        </div>
      </div>
      {PaymentData && <JazzCashPayment paymentData={PaymentData} />}
    </LayoutWrapper>
  );
};

const JazzCashPayment = ({
  paymentData,
}: {
  paymentData: SessionResponseType;
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <form
      ref={formRef} // Assigning ref to the form
      id="jazzcash-payment-form"
      method="post"
      action={paymentData?.PostURL}
    >
      <input type="hidden" name="pp_Version" value={paymentData?.pp_Version} />
      <input type="hidden" name="pp_TxnType" value={paymentData?.pp_TxnType} />
      <input
        type="hidden"
        name="pp_Language"
        value={paymentData?.pp_Language}
      />
      <input
        type="hidden"
        name="pp_MerchantID"
        value={paymentData?.pp_MerchantID}
      />
      <input
        type="hidden"
        name="pp_SubMerchantID"
        value={paymentData?.pp_SubMerchantID}
      />
      <input
        type="hidden"
        name="pp_Password"
        value={paymentData?.pp_Password}
      />
      <input
        type="hidden"
        name="pp_TxnRefNo"
        value={paymentData?.pp_TxnRefNo}
      />
      <input type="hidden" name="pp_Amount" value={paymentData?.pp_Amount} />
      <input
        type="hidden"
        name="pp_TxnCurrency"
        value={paymentData?.pp_TxnCurrency}
      />
      <input
        type="hidden"
        name="pp_TxnDateTime"
        value={paymentData?.pp_TxnDateTime}
      />
      <input
        type="hidden"
        name="pp_BillReference"
        value={paymentData?.pp_BillReference}
      />
      <input
        type="hidden"
        name="pp_Description"
        value={paymentData?.pp_Description}
      />
      <input type="hidden" name="pp_BankID" value={paymentData?.pp_BankID} />
      <input
        type="hidden"
        name="pp_ProductID"
        value={paymentData?.pp_ProductID}
      />
      <input
        type="hidden"
        name="pp_TxnExpiryDateTime"
        value={paymentData?.pp_TxnExpiryDateTime}
      />
      <input
        type="hidden"
        name="pp_ReturnURL"
        value={paymentData?.pp_ReturnURL}
      />
      <input
        type="hidden"
        name="pp_SecureHash"
        value={paymentData?.pp_SecureHash}
      />
      <input type="hidden" name="ppmpf_1" value={paymentData?.ppmpf_1} />
      <input type="hidden" name="ppmpf_2" value={paymentData?.ppmpf_2} />
      <input type="hidden" name="ppmpf_3" value={paymentData?.ppmpf_3} />
      <input type="hidden" name="ppmpf_4" value={paymentData?.ppmpf_4} />
      <input type="hidden" name="ppmpf_5" value={paymentData?.ppmpf_5} />
      <button type="submit" onClick={() => formRef.current?.submit()}></button>
    </form>
  );
};

export default CheckOut;
