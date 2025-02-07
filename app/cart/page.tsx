"use client";
import { Button } from "@/components/ui/button";
import { Package, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromCart, updateQuantity } from "@/redux/features/cartSlice";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const getValidImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return "/assets/avatar.jpg";
    const baseUrl = "https://medinven.api.artemamed.com";
    return imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`;
  };

  const handleQuantityChange = (
    slug: string,
    size: string,
    increment: boolean
  ) => {
    const item = cartItems.find(
      (item) => item.slug === slug && item.size === size
    );
    if (!item) return;

    const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
    dispatch(updateQuantity({ slug, size, quantity: newQuantity }));
  };

  const handleRemoveItem = (slug: string, size: string) => {
    dispatch(removeFromCart({ slug, size }));
  };

  const navigateToCheckOut = () => {
    if (isAuthenticated) {
      router.push("/cart/checkOut");
    } else {
      router.push("/auth/signin");
    }
  };

  const navigateToMoreProducts = () => {
    router.push("/category");
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
  const subtotal = total + freightCharge + tax;

  return (
    <LayoutWrapper className="min-h-screen p-4">
      {cartItems.length === 0 ? (
        <div className="my-[7rem] md:my-[15rem] p-4 mx-4 lg:mx-[3rem] xl:mx-[5rem]">
          <div className="flex items-center justify-center lg:mt-12">
            <div className="max-w-[90%] md:max-w-[800px] text-center">
              <div className="flex justify-center gap-4 -mb-[7rem] -mt-[5rem] ">
                <Image
                  width={100}
                  height={100}
                  src="/images/cart/emptyCart.svg"
                  alt="Empty Cart"
                  className="w-[30rem] h-[25rem] object-contain rounded-md lg:-mt-[1rem]"
                />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-teal-800 text-center mb-5">
                Cart Empty
              </h1>
              <div className="text-gray-600 text-sm md:text-base">
                <p>
                  <span className="font-medium text-[#6C7275]">
                    Your cart is empty. Start adding items to enjoy shopping!
                  </span>
                </p>
              </div>
              <Button
                className="mt-6 text-sm md:text-base px-6 py-2 md:py-3"
                onClick={navigateToMoreProducts}
              >
                Explore Products
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="text-[#7c7c7c] mb-4 text-sm md:text-base"
            onClick={() => router.back()}
          >
            &lt; back
          </button>
          <div className="flex justify-center mb-6">
            <h1 className="text-2xl md:text-4xl font-semibold text-[#004040]">
              Cart
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  {/* Table Header */}
                  <thead className="hidden md:table-header-group">
                    <tr className="border-b border-[#E8ECEF] text-lg">
                      <th className="text-left p-3">Product</th>
                      <th className="text-center p-3">Quantity</th>
                      <th className="text-center p-3">Price</th>
                      <th className="text-center p-3">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-[#E8ECEF] flex-1 flex-col md:table-row md:gap-0 gap-4"
                      >
                        <td className="py-3 md:p-3 flex flex-col md:flex-row items-center gap-4">
                          <Image
                            width={30}
                            height={30}
                            src={getValidImageUrl(item.image)}
                            alt={item.title}
                            className="w-auto h-[5rem] rounded-xl object-contain"
                          />
                          <div className="space-y-2 text-center md:text-left">
                            <h2 className="absolute md:relative w-auto -mt-[5rem] md:-mt-0 md:ml-0 ml-[7rem] text-sm font-semibold text-[#2B2B2B]">
                              {item.title}
                            </h2>
                            <h2 className="text-xs text-[#666666]">
                              size: {item.size}
                            </h2>
                            <h2 className="text-xs text-[#666666]">
                              sku: {item.sku}
                            </h2>
                            <button
                              className="flex items-center mx-auto md:mx-0 justify-center text-xs text-red-500 hover:underline"
                              onClick={() =>
                                handleRemoveItem(item.slug, item.size)
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="flex items-center justify-center space-x-2 border mt-[2rem] xl:-mt-[0.75rem] md:-mt-[0.5rem] w-[6rem] border-[#008080] rounded-md mx-auto">
                            <button
                              className="px-2 py-1 text-[#008080]"
                              onClick={() =>
                                handleQuantityChange(
                                  item.slug,
                                  item.size,
                                  false
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="px-2 py-1 text-[#008080]"
                              onClick={() =>
                                handleQuantityChange(item.slug, item.size, true)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="hidden md:block md: absolute pl-[1rem] xl:pl-[2rem] mt-[2.75rem]">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className=" absolute mt-[9rem] -ml-[7rem] md:mt-0 md:pl-[2rem] xl:pl-[3rem] md:relative">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:col-span-4 w-full">
              <div className="border border-[#E0E0E0] rounded-xl p-4 space-y-6">
                <h3 className="text-lg lg:text-xl font-semibold text-center">
                  Cart Summary
                </h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-[#E8ECEF]">
                      <td className="py-3">Total</td>
                      <td className="text-right py-3">${total.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-[#E8ECEF]">
                      <td className="py-3">Tax</td>
                      <td className="text-right py-3">${tax.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b border-[#E8ECEF]">
                      <td className="py-3">Freight Charge</td>
                      <td className="text-right py-3">
                        ${freightCharge.toFixed(2)}
                      </td>
                    </tr>
                    <tr className="font-semibold text-base">
                      <td className="py-3">Subtotal</td>
                      <td className="text-right py-3 ">
                        ${subtotal.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Button
                  className="w-full flex justify-center items-center"
                  onClick={navigateToCheckOut}
                >
                  Checkout <Package className="ml-2" />
                </Button>
                <div className="text-sm text-gray-600 mt-2 gap-3">
                  <p className="text-red-600 inline-block mr-2">*</p>
                  The amounts are to be charged in PKR (Pakistani Rupees){" "}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutWrapper>
  );
};

export default Cart;
