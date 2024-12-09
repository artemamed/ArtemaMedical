"use client";

import React, { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function CustomDropdownMenu({ closeMenu }: { closeMenu: () => void }) {
  const menuData = [
    { category: "General Instruments", items: ["Forceps", "Facial Surgery", "Scissors"] },
    { category: "Orthopedic Instruments", items: ["Forceps", "Facial Surgery", "Scissors"] },
    { category: "Scissors", items: ["Forceps", "Facial Surgery", "Scissors"] },
    { category: "Dental Instruments", items: ["Forceps", "Facial Surgery", "Scissors"] },
    { category: "ENT Instruments", items: ["Forceps", "Facial Surgery", "Scissors"] },
    { category: "Cardiovascular", items: ["Forceps", "Facial Surgery", "Scissors"] },
    { category: "Gynecology", items: ["Forceps", "Facial Surgery", "Scissors"] },
    { category: "Plastic Surgery", items: ["Forceps", "Facial Surgery", "Scissors"] },
  ];

  const [visibleItems, setVisibleItems] = useState(menuData.length);

  // Detect screen size and adjust visible items
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(2); // Mobile
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3); // Tablet
      } else {
        setVisibleItems(4); // Desktop
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);

    return () => window.removeEventListener("resize", updateVisibleItems);
  }, [menuData.length]);

  const router = useRouter();

  const navigateToCategories = () => {
    router.push("/productCategory");
    closeMenu();
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex items-center overflow-hidden hover:text-[#008080] focus:outline-none focus:ring-0"
          aria-label="Support Menu"
        >
          <span className="transition">Products</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="lg:mt-5 grid grid-rows-2 lg:grid-cols-4 gap-4 xl:py-[6rem] 2xl:py-[8rem] lg:py-[3rem] px-[5rem] lg:px-[4rem] xl:pl-[8rem] bg-[#F7F7F7] rounded-2xl border-none shadow-lg w-screen">
          {menuData.slice(0, visibleItems).map((category, index) => (
            <div key={index} className="lg:space-y-1">
              <h3 className="text-sm lg:text-lg font-semibold text-[#004040]">
                {category.category}
              </h3>
              {category.items.slice(0, visibleItems).map((item, idx) => (
                <h2 key={idx} className="text-[#666666] text-sm lg:text-base hover:text-[#008080]">
                  {item}
                </h2>
              ))}
              <Link href="#" className="text-[#008080] text-sm lg:font-medium underline">
                View All
              </Link>
            </div>
          ))}
          <Button className="w-[10rem] mb-5" onClick={navigateToCategories}>
            Browse Categories
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
