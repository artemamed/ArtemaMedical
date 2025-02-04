// app/category/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { CircleArrowRight } from "lucide-react";
import React, { useCallback } from "react";
import { getCategories } from "@/lib/api";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import stethoscopeImage from "@/public/images/productCategory.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PrecisionDriven = () => {
  const router = useRouter();

  interface SubCategory {
    name: string;
    slug: string;
  }

  interface Category {
    name: string;
    slug: string;
    subCategories: SubCategory[];
  }

  const { data: categories = [], isLoading, isError, error } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const navigateToSpecificCategories = (category: { name: string; slug: string }) => {
    router.push(`/category/${category.slug}`);
  };

  const handleCategoryClick = useCallback(
    (subcategorySlug: string) => {
      router.push(`/sub-category/${subcategorySlug}`);
    },
    [router]
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-8 w-full mx-auto lg:-mt-[10rem]">
        {/* Left Section - Text Content */}
        <div className="text-center md:text-left col-span-3 flex items-center justify-center lg:ml-[5rem] xl:ml-[10rem] px-4 sm:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-center leading-10 font-semibold text-[#004040] mb-6 mt-16 sm:mt-20">
            Precision-Driven Instruments for Every Procedure
          </h1>
        </div>

        {/* Right Section - Image */}
        <motion.div
          className="relative z-50 w-[200px] h-[250px] sm:w-[300px] sm:h-[400px] lg:w-[370px] lg:h-[605px] xl:w-[470px] xl:h-[705px] mt-6 md:mt-0 col-span-1 justify-self-center md:justify-self-end lg:mt-[2rem] lg:-mb-[2rem] xl:mt-[8.5rem] xl:-mb-[8.5rem] mix-blend-multiply"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src={stethoscopeImage}
            alt="Stethoscope"
            fill
            className="hidden md:block object-contain  "
            priority />
          <Image
            src={stethoscopeImage}
            alt="Stethoscope"
            fill
            className="block md:hidden object-contain -mt-[10rem] ml-[8.5rem]  "
            priority />
        </motion.div>
      </div>
      <LayoutWrapper className="min-h-screen flex flex-col">
        {/* Surgical Catalog */}
        <div className="p-4 sm:p-6 md:p-8 mb-[3rem] sm:mb-[4rem] md:mb-[5rem] font-poppins  sm:mt-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 sm:mb-6 md:mb-8 leading-tight">
            Explore Our Complete Range of Surgical Tools
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <div
                className="w-12 h-12 border-4 border-teal-500 border-solid rounded-full animate-spin border-t-transparent shadow-md"
                role="status"
                aria-label="Loading"
              ></div>
            </div>
          ) : isError ? (
            <div className="text-red-500">{error.message}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-14 ">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-5 md:p-6 rounded-2xl border bg-white hover:bg-[#CFE7E7] transition-colors duration-300 hover:scale-105 "
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl    font-semibold mb-2 sm:mb-3 md:mb-4 leading-snug cursor-pointer line-clamp-1 hover:line-clamp-2" onClick={() => navigateToSpecificCategories(category)}>
                      {category.name}
                    </h2>
                    <Link href={`/category/${category.slug}`}>
                      <CircleArrowRight className="text-[#008080] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 cursor-pointer hover:scale-105" />
                    </Link>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 md:space-y-4 mt-[2rem] sm:mt-[3rem] md:mt-[5rem] cursor-pointer p-1">
                    {category.subCategories.map((subCategory, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-gray-700" onClick={() => handleCategoryClick(subCategory.slug)}>
                        <span className="text-[#008080] text-lg sm:text-xl md:text-2xl lg:text-3xl">➜</span>
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl line-clamp-1 hover:line-clamp-2">{subCategory.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {/* <Button className="mt-5 px-[2rem]">Load More</Button> */}
        </div>
      </LayoutWrapper>
    </div>
  );
};

export default PrecisionDriven;
