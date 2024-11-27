import Image from "next/image";
import React from "react";

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

const BestSellingProduct = () => {
    return (
        <div className="px-4 md:px-[2rem] lg:px-[5rem]">
            <div className="px-[1rem] py-[4rem] lg:py-[8rem]">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-10 px-[1rem] leading-tight">Best-Selling Products</h1>
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
            </div>
        </div>
    );
};

export default BestSellingProduct;
