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
        <div className="container mx-auto px-4 ">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-10 leading-tight">Best-Selling Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="border-none p-4 bg-white"
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-[8rem] p-5 object-contain mb-4"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustedStandard;
