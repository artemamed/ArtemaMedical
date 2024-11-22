// "use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";



export default function CustomDropdownMenu() {
  const menuData = [
    {
      category: "General Instruments",
      items: ["Forceps", "Oral Maxillo Facial Surgery", "Scissors"],
    },
    {
      category: "Orthopedic Instruments",
      items: ["Forceps", "Oral Maxillo Facial Surgery", "Scissors"],
    },
    {
      category: "Scissors",
      items: ["Forceps", "Oral Maxillo Facial Surgery", "Scissors"],
    },
    {
      category: "Dental Instruments",
      items: ["Forceps", "Oral Maxillo Facial Surgery", "Scissors"],
    },
    {
      category: "ENT Instruments",
      items: ["Forceps", "Oral Maxillo Facial Surgery", "Scissors"],
    },
    {
      category: "Cardiovascular",
      items: ["Forceps", "Oral Maxillo Facial Surgery", "Scissors"],
    },
    {
      category: "Gynecology",
      items: ["Forceps", "Oral Maxillo Facial Surgery", "Scissors"],
    },
    {
      category: "Plastic Surgery",
      items: ["Forceps", "Oral Maxillo Facial Surgery", "Scissors"],
    },
  ];

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex justify-between items-center w-full transition hover:text-[#008080]"
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

        <DropdownMenuContent className="mt-5 grid grid-cols-4 gap-4 xl:py-[6rem] 2xl:py-[8rem] py-[3rem] lg:px-[4rem] xl:pl-[8rem]  bg-[#F7F7F7] rounded-2xl border-none shadow-lg w-screen">
          {menuData.map((category, index) => (
            <div key={index} className="space-y-1">
              <h3 className="text-lg font-semibold text-[#004040]">
                {category.category}
              </h3>
              {category.items.map((item, idx) => (
                <h2 key={idx} className="text-[#666666] hover:text-[#008080]">
                  {item}
                </h2>
              ))}
              <Link
                href="#"
                className="text-[#008080] font-medium hover:underline"
              >
                View All
              </Link>
            </div>
          ))}
          <button className="bg-teal-600 text-md  text-white py-3 w-[12rem] mt-3 rounded-lg hover:bg-teal-700 transition">
            Browse Categories
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}