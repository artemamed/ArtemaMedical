import Image from "next/image";
import React from "react";

const products = [
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
    imageUrl: "/images/trusted/AUTH.svg",
  },
  {
    title: "Scalpels for Precision Surgery",
    imageUrl: "/images/trusted/ASTM.svg",
  },
];

const TrustedStandard = () => {
  return (
    <div className="px-4 md:px-[5rem] absolu">
      <div className="py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 sm:mb-10 leading-tight">
          Trusted by Global Health Standards
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="border-none p-2 sm:p-4 bg-white flex items-center justify-center"
            >
              <Image
                width={100}
                height={100}
                src={product.imageUrl}
                alt={product.title}
                className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedStandard;
