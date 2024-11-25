import { CircleArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogSection = () => {
    const cards = [
        {
            image: "/images/Blog/blog1.png",
            title: "Elevate your house by adding small light",
        },
        {
            image: "/images/Blog/blog2.png",
            title: "Why craftsmanship is valued",
        },
        {
            image: "/images/Blog/blog3.png",
            title: "A Guide to eco-friendly material",
        },
    ];

    return (
        <div className="container mx-auto py-[6rem] ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ml-10">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className=" overflow-hidden group"
                    >
                        <div className="relative">
                            <Image
                                width={100}
                                height={200}
                                src={card.image}
                                alt={card.title}
                                className="w-auto h-96 object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="pt-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {card.title}
                                </h3>
                                <CircleArrowRight className="w-9 h-9 text-[#008080] mr-[3rem]"/>
                            </div>
                        </div>

                    </div>
                ))}
                <Link
                    href="#"
                    className="text-teal-600 font-medium underline -mt-[2rem]"
                >
                    View All &rarr;
                </Link>
            </div>
        </div>
    );
};

export default BlogSection;
