import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const TrustedUser = () => {
    const testimonials = [
        {
            stars: 5,
            text: "Whenever precision and reliability are paramount in medical instruments, my first thought is Artema Medical. Products are topnotch.",
            name: "Cindy Edrington",
            role: "Medical Superintendent at Evercare",
            image: "/images/trusted/test1.png",
        },
        {
            stars: 5,
            text: "Artema Medical immediately comes to mind for ophthalmic instruments. Their products have always met our expectations.",
            name: "Jennifer Chura",
            role: "Director OPD at AHD",
            image: "/images/trusted/test1.png",
        },
        {
            stars: 4,
            text: "Reliable and efficient services every single time. I highly recommend them.",
            name: "John Doe",
            role: "Head of Procurement",
            image: "/images/trusted/test2.png",
        },
        {
            stars: 5,
            text: "Exceptional customer service and high-quality products. They never disappoint.",
            name: "Jane Smith",
            role: "Senior Doctor",
            image: "/images/trusted/test3.png",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 2 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 2 ? 0 : prevIndex + 1
        );
    };

    return (
        <><div className="ml-[5rem] my-[8rem] flex flex-col-3 justify-between">
            <h2 className="text-6xl text-gray-800 font-semibold mb-8">We are trusted by</h2>
            <div className="flex items-center gap-6">
                {testimonials.slice(currentIndex, currentIndex + 2).map((testimonial, index) => (
                    <div
                        key={index}
                        className="w-full max-w-md p-6 border rounded-xl shadow-md bg-white"
                    >
                        <div className="flex mb-4">
                            {Array.from({ length: testimonial.stars }, (_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.374 2.453a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.539 1.118l-3.374-2.453a1 1 0 00-1.176 0l-3.374 2.453c-.783.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.605 9.383c-.783-.57-.381-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.956z" />
                                </svg>
                            ))}
                        </div>
                        <p className="mb-4 text-gray-700">{testimonial.text}</p>
                        <div className="flex items-center">
                            <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover" />
                            <div className="ml-4">
                                <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                                <p className="text-sm text-gray-600">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Navigation Arrows */}

        </div><div className="flex justify-center items-center -mt-[5rem] gap-6">
                <button
                    onClick={handlePrev}
                    className=""
                >
                    <MoveLeft />
                </button>
                <button
                    onClick={handleNext}
                    className=""
                >
                   <MoveRight />
                </button>
            </div></>
    );
};

export default TrustedUser;
