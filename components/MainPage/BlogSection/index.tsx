import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
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
    <LayoutWrapper className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative flex flex-col "
            >
              <div className="relative aspect-[3/2] w-full ">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
                />
              </div>

              <div className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex-1">
                    {card.title}
                  </h3>
                  <CircleArrowRight className="w-7 h-7 sm:w-9 sm:h-9 text-[#008080] flex-shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:text-left">
          <Link
            href="#"
            className="text-teal-600 font-medium underline inline-block hover:text-teal-700 transition-colors"
          >
            View All &rarr;
          </Link>
        </div>
      </LayoutWrapper>
  );
};

export default BlogSection;
