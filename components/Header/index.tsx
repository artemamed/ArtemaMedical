"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/public/images/logo.svg";
import SearchInput from "./SearchInput";
import CartButton from "./CartButton";
import Support from "./Support";
import ProductDropDown from "./ProductDropDown";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  return (
    <nav className="">
      <div className="container mx-auto flex items-center justify-between py-4 px-5">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src={logo} alt="Artema Logo" width={150} height={150} />
        </div>

        

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:space-x-[2.5rem] xl:space-x-[4rem] bg-[#F7F7F7] pl-8 p-3 pr-8 rounded-2xl">
          <Link href="/" className="text-teal-700 font-medium ">
            Home
          </Link>
          <div>
            <ProductDropDown />
          </div>
          <Link href="#" className="text-[#2B2B2B] hover:text-[#008080] font-medium ">
            Certification
          </Link>
          <div>
            <Support />
          </div>
          <Link href="#" className="text-[#2B2B2B] hover:text-[#008080] font-medium ">
            About Us
          </Link>
        </div>

        {/* Icons & Contact Button */}
        <div className="flex items-center space-x-6">
          <SearchInput />
          <CartButton />
          <Link
            href="#"
            className="hidden lg:block text-[#008080] border font-semibold border-[#008080] py-2 px-4 rounded-lg hover:bg-[#008080] hover:text-white"
          >
            Contact Us
          </Link>
        </div>
        {/* Hamburger Menu Button */}
        <button
          className="lg:hidden text-[#2B2B2B] hover:text-[#008080] focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <Link
            href="/"
            className="block px-4 py-2 text-[#2B2B2B] hover:text-[#008080] hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-[#2B2B2B] hover:text-[#008080] hover:bg-gray-100"
          >
            Certification
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-[#2B2B2B] hover:text-[#008080] hover:bg-gray-100"
          >
            About Us
          </Link>
        </div>
      )}
    </nav>
  );
}
