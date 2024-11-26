import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };

    updateWidth(); // Set initial value
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="px-4 md:px-[5rem]">
      <div className=" px-4 py-12 md:py-20">
        <div className="flex flex-col space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-6xl text-gray-800 font-semibold text-center md:text-left">
            We are trusted by
          </h2>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {testimonials
              .slice(currentIndex, currentIndex + (isWideScreen ? 2 : 1))
              .map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full md:max-w-md p-4 md:p-10 border rounded-xl shadow-md bg-white"
                >
                  <div className="flex mb-4 md:p-4 ">
                    {Array.from({ length: testimonial.stars }, (_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 md:-mt-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.374 2.453a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.539 1.118l-3.374-2.453a1 1 0 00-1.176 0l-3.374 2.453c-.783.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.605 9.383c-.783-.57-.381-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.956z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 text-sm md:text-base text-gray-700">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-sm md:text-base text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center items-center gap-4 md:gap-6">
            <button
              onClick={handlePrev}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Previous testimonial"
            >
              <MoveLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Next testimonial"
            >
              <MoveRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedUser;
