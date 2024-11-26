import { CircleDollarSign, Leaf, Microscope } from 'lucide-react';
import React from 'react';

const WhyChooseUs = () => {
  return (
    <div className="bg-[#004040] p-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 text-white rounded-xl transition-all duration-300 ">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 animate-fade-in text-center">
        Why Choose Us
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-1 max-w-7xl mx-auto">
        {[
          {
            icon: <CircleDollarSign size={32} className="sm:w-8 md:w-10" />,
            title: "Cost-Effective Excellence",
            description:
              "We prioritize delivering premium-quality medical instruments while ensuring budget-friendly solutions tailored to your needs.",
          },
          {
            icon: <Microscope size={32} className="sm:w-8 md:w-10" />,
            title: "Precision and Innovation",
            description:
              "Our team of biomedical experts continually pushes boundaries to design innovative tools that meet the highest standards.",
          },
          {
            icon: <Leaf size={32} className="sm:w-8 md:w-10" />,
            title: "Eco-Friendly Commitment",
            description:
              "We're passionate about sustainability, integrating green practices into our processes to protect the planet.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-teal-800 rounded-xl my-2 mx-2
              p-6 sm:p-8 md:p-10
              shadow-lg border border-gray-400 hover:border-teal-400
              transform hover:-translate-y-2 transition-all duration-300
              hover:bg-teal-700 group cursor-pointer lg:h-[19rem] justify-center lg:w-[24rem]"
          >
            <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 group-hover:text-teal-300">
              {item.title}
            </h3>
            <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
