"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import stethoscopeImage from "@/public/images/productCategory.png";
import SurgicalCatalog from "./surgicalCatalog/page";

export default function PrecisionDriven() {
  return (
    <div className="min-h-screen flex flex-col bg-white px-4 sm:px-6 md:px-12 lg:px-16 xl:-mt-[10rem] -mt-[3rem]">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-8 max-w-screen-xl w-full mx-auto">
        {/* Left Section - Text Content */}
        <div className="text-center md:text-left col-span-3 flex items-center justify-center lg:ml-[5rem] xl:ml-[10rem] px-4 sm:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#004040s] mb-6 mt-16 sm:mt-20">
            Precision-Driven Instruments for Every Procedure
          </h1>
        </div>

        {/* Right Section - Image */}
        <motion.div
          className="relative w-[200px] h-[250px] sm:w-[300px] sm:h-[400px] lg:w-[370px] lg:h-[605px] xl:w-[470px] xl:h-[705px] mt-6 md:mt-0 col-span-1 justify-self-center md:justify-self-end"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src={stethoscopeImage}
            alt="Stethoscope"
            fill
            className="hidden md:block object-contain md:ml-[5rem] lg:ml-[6rem] xl:ml-[5rem] 2xl:ml-[20rem]"
            priority
          />
          <Image
            src={stethoscopeImage}
            alt="Stethoscope"
            fill
            className="block md:hidden object-contain -mt-[10rem] ml-[8rem]"
            priority
          />
        </motion.div>
      </div>
      <SurgicalCatalog />
    </div>
  );
}
