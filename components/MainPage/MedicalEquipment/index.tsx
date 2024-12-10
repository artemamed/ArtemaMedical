import React from "react";
import ProductSlider from "./ProductSlider";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";

const MedicalEquipment: React.FC = () => {
  return (
    <LayoutWrapper>
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 leading-tight">
          Explore Our Range of Medical Equipment
        </h2>

        <p className="text-[#666666] text-base sm:text-lg max-w-3xl text-justify">
          With a devotion to quality, we provide a broad range of surgical instruments, which include surgical forceps, scalpels, needle holders, retractors, and many more.
        </p>

        {/* Button Grid */}
        <div className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {[
              "General",
              "Orthopedic",
              "Scissors",
              "Dental",
              "ENT",
              "Cardiovascular",
              "Cardiovascular",
              "Cardiovascular",
              "Gynaecology",
              "Plastic Surgery",
            ].map((category, index) => (
              <button
                key={index}
                className="w-full py-2 px-4 bg-[#F7F7F7] hover:bg-[#e5e5e5] border-none rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-6 sm:mt-8">
            <a
              href="#"
              className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium transition-colors duration-200"
            >
              Discover All
              <span className="ml-2">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
      <div><ProductSlider /></div>

    </LayoutWrapper>
  );
};

export default MedicalEquipment;
