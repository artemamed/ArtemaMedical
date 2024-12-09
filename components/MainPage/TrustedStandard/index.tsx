import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import Image from "next/image";
import React from "react";

const trusted = [
  {
    title: "Scalpels for Precision Surgery",
    imageUrl: "/images/trusted/CE.svg",
  },
  {
    title: "Scalpels for Precision Surgery",
    imageUrl: "/images/trusted/FDA.svg",
  },
  {
    title: "Scalpels for Precision Surgery",
    imageUrl: "/images/trusted/ISO.svg",
  },
  {
    title: "Scalpels for Precision Surgery",
    imageUrl: "/images/trusted/ASTM.svg",
  },
];

const products = [
  {
    title: "Scalpels for Precision Surgery",
    price: "200",
    imageUrl: "/images/slider/slide1.png",
  },
  {
    title: "Scalpels for Precision Surgery",
    price: "200",
    imageUrl: "/images/slider/slide2.png",
  },
  {
    title: "Scalpels for Precision Surgery",
    price: "200",
    imageUrl: "/images/slider/slide3.png",
  },
];

const TrustedStandard = () => {
  return (
    <LayoutWrapper className="min-h-screen md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-10">
        Trusted by Global Health Standards
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {trusted.map((product, index) => (
          <div
            key={index}
            className="border-none p-2 sm:p-4 bg-white flex items-center justify-center"
          >
            <Image
              width={100}
              height={100}
              src={product.imageUrl}
              alt={product.title}
              className="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] object-contain"
            />
          </div>
        ))}
        <Image
          width={100}
          height={100}
          src="/images/trusted/AUTH.svg"
          alt="Scalpels for Precision Surgery"
          className="w-[150px] h-[80px] lg:h-[70px] lg:w-[300px] object-contain md:mt-[1rem] lg:mt-[2.5rem] ml-[1rem]"
        />
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-10 mt-10 leading-tight">Best-Selling Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="border-none rounded-lg p-4 bg-white"
          >
            <Image
              width={300}
              height={300}
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-[15rem] lg:h-[20rem] p-5 object-contain mb-4 border shadow-md rounded-xl"
            />
            <h3 className="text-lg mb-2">{product.title}</h3>
            <p className="text-xl font-bold mb-4">${product.price}</p>
            <button className=" border text-teal-500 border-teal-500 py-2 px-4 rounded hover:bg-teal-600 hover:text-white transition">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </LayoutWrapper>
  );
};

export default TrustedStandard;
