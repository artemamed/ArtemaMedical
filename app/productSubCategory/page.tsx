"use client";

import { Button } from "@/components/ui/button";
import { Settings2, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";

const instruments = [
  { name: "Screw Cate", imageUrl: "/images/productSubCategory/pic1.png" },
  { name: "Screw Driver", imageUrl: "/images/productSubCategory/pic2.png" },
  { name: "Bone Cutting", imageUrl: "/images/productSubCategory/pic3.png" },
  { name: "Screw Cate", imageUrl: "/images/productSubCategory/pic1.png" },
  { name: "Screw Driver", imageUrl: "/images/productSubCategory/pic2.png" },
  { name: "Bone Cutting", imageUrl: "/images/productSubCategory/pic3.png" },
];

const categories = [
  {
    name: "General Instruments",
    icon: "carbon:reminder-medical",
    subcategories: ["Scalpels", "Forceps", "Retractors"],
  },
  {
    name: "Orthopedic",
    icon: "material-symbols-light:foot-bones-outline",
    subcategories: ["Screw Drivers", "Bone Cutters", "Wire Cutters"],
  },
  {
    name: "Scissors",
    icon: "mingcute:scissors-line",
    subcategories: ["Iris Scissors", "Mayo Scissors", "Bandage Scissors"],
  },
  {
    name: "ENT",
    icon: "f7:ear",
    subcategories: ["Nasal Forceps", "Ear Specula", "Laryngoscopes"],
  },
  {
    name: "Dental",
    icon: "ph:tooth",
    subcategories: ["Probes", "Mirrors", "Extraction Forceps"],
  },
  {
    name: "Cardiovascular",
    icon: "material-symbols:cardiology-outline-rounded",
    subcategories: ["Scalpels", "Forceps", "Retractors"],
  },
  {
    name: "Gynaecology",
    icon: "et:profile-female",
    subcategories: ["Screw Drivers", "Bone Cutters", "Wire Cutters"],
  },
  {
    name: "Plastic Surgery",
    icon: "game-icons:scalpel",
    subcategories: ["Iris Scissors", "Mayo Scissors", "Bandage Scissors"],
  },
  {
    name: "Needle Holder",
    icon: "streamline:health-medical-syringe-instrument-medical-syringe-health-beauty-needle",
    subcategories: ["Nasal Forceps", "Ear Specula", "Laryngoscopes"],
  },
  {
    name: "Surgical Set",
    icon: "healthicons:surgical-sterilization",
    subcategories: ["Probes", "Mirrors", "Extraction Forceps"],
  },
];

const ProductSubCategory: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const router = useRouter();

  const handleCategoryClick = (subcategory: string) => {
    router.push(`/subcategory/${subcategory.toLowerCase().replace(/\s/g, "-")}`);
    setShowSidebar(false);
  };

  const handleViewClick = () => {
    router.push("/subCategoryListing");
    setShowSidebar(false);
  };

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY <= 1);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Sidebar = () => (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-100 shadow-lg z-40 p-4 transform transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:w-64 lg:rounded-2xl`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Categories</h2>
        <Button className="lg:hidden" variant="ghost" onClick={() => setShowSidebar(false)}>
          <X />
        </Button>
      </div>
      <ul className="space-y-4">
        {categories.map((category, index) => (
          <li key={index}>
            <details className="cursor-pointer">
              <summary className="hover:text-teal-600 text-lg font-medium text-[#004040] flex items-center gap-2">
                <Icon icon={category.icon} className="text-xl" />
                {category.name}
              </summary>
              <ul className="ml-8 mt-2 space-y-1 text-sm text-gray-600">
                {category.subcategories.map((subcategory, subIndex) => (
                  <li
                    key={subIndex}
                    className="hover:text-teal-600 cursor-pointer"
                    onClick={() => handleCategoryClick(subcategory)}
                  >
                    {subcategory}
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </aside>
  );

  return (
    <LayoutWrapper>
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-center py-16">
        Orthopedic Instruments
      </h1>
      <div className="relative flex min-h-screen my-8">
        {showButton && (
          <Button
            className="fixed top-[15rem] left-9 md:top-[15rem] lg:top-60 lg:left-[1.5rem] xl:left-[7rem] 2xl:left-[14rem]"
            variant="secondary"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Hide Categories" : "Show Categories"} <Settings2 className="w-5 h-5 ml-2" />
          </Button>
        )}
        {showSidebar && <Sidebar />}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}
        <main className="flex-1 lg:-mt-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4 gap-6">
            {instruments.map((instrument, index) => (
              <div key={index} className="rounded-lg p-4 flex flex-col items-center">
                <Image
                  width={300}
                  height={300}
                  src={instrument.imageUrl}
                  alt={instrument.name}
                  className="w-full h-full object-contain mb-4 border rounded-2xl"
                />
                <div className="flex w-full justify-between items-center px-1">
                  <h3 className="text-lg font-semibold text-gray-800">{instrument.name}</h3>
                  <Button variant="secondary" className="px-8" onClick={handleViewClick}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    </LayoutWrapper>
  );
};

export default ProductSubCategory;
