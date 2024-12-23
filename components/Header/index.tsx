"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import logo from "@/public/images/logo.svg";
import SearchInput from "./SearchInput";
import CartButton from "./CartButton";
import Support from "./Support";
import ProductDropDown from "./ProductDropDown";
import LayoutWrapper from "../Wrapper/LayoutWrapper";
import { clearAuth } from "@/redux/features/authSlice"; // Import the clearAuth action
import { RootState } from "@/app/store";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Current pathname
  const dispatch = useDispatch();

  // Get authentication state and user data from Redux
  const { isAuthenticated, avatarUrl } = useSelector((state: RootState) => state.auth);

  // Close the menu when the pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle logout
  const handleLogout = () => {
    dispatch(clearAuth()); // Clear Redux state
    router.push("/auth/signin"); // Redirect to sign-in page
  };

  return (
    <LayoutWrapper className="relative w-[100%]">
      <div className="flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 flex-grow">
          <Link href="/">
            <Image src={logo} alt="Artema Logo" width={150} height={150} />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:space-x-[2rem] xl:space-x-[4rem] 2xl:space-x-[6rem] bg-[#F7F7F7] pl-8 p-3 pr-8 rounded-2xl">
          <Link
            href="/"
            className={` ${pathname === '/' ? 'text-[#008080]' : ''}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${pathname === '/about' ? 'text-[#008080]' : ''}`}
          >
            About Us
          </Link>
          <div className={`${pathname === '/category' ? 'text-[#008080]' : ''}`}>
            <ProductDropDown closeMenu={() => setIsMenuOpen(false)} />
          </div>
          <Link
            href="/certification"
            className={`${pathname === '/certification' ? 'text-[#008080]' : ''}`}
          >
            Certification
          </Link>
          <div className={` ${pathname === '/ifu' ? 'text-[#008080]' : ''}`}>
            <Support />
          </div>

        </div>

        {/* Icons & Contact Button */}
        <div className="flex items-center space-x-4 xl:space-x-6">
          {/* Search Input */}
          <div className="lg:ml-[1rem] xl:ml-[5rem]">
            <SearchInput />
          </div>

          {/* Cart Button */}
          <CartButton />

          {/* User Avatar */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <Image
                  src={avatarUrl || "/assets/avatar.jpg"} // Use avatarUrl or a placeholder
                  alt="User Avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </button>
              {showAvatarMenu && (
                <div className="absolute right-0 w-48 mt-4 bg-[#F7F7F7] border border-gray-200 rounded-md shadow-lg z-50">
                 
                  <button
                    onClick={handleLogout}
                    className="block fixed w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-teal-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : null}

          {/* Contact Us Button (Visible in Desktop) */}
          <Link
            href="/contact"
            className="hidden lg:block text-[#008080] border font-semibold border-[#008080] py-2 px-4 rounded-lg hover:bg-[#008080] hover:text-white"
          >
            Contact Us
          </Link>

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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 w-full bg-[#F7F7F7] shadow-md rounded-2xl z-50">
          <div className="flex flex-col space-y-1 py-5 px-10 text-[#666666]">
            <Link href="/" className="block px-4 py-2 hover:text-[#008080] hover:bg-gray-100">
              Home
            </Link>
            <Link href="/about" className="block px-4 py-2 hover:text-[#008080] hover:bg-gray-100">
              About Us
            </Link>
            <div className="block px-4 py-2">
              <ProductDropDown closeMenu={() => setIsMenuOpen(false)} />
            </div>
            <Link href="/certification" className="block px-4 py-2 hover:text-[#008080] hover:bg-gray-100">
              Certification
            </Link>
            <div className="block px-4 py-2 hover:text-[#008080] hover:bg-gray-100">
              <Support />
            </div>
            <Link href="/contact" className="block px-4 py-2 hover:text-[#008080] hover:bg-gray-100">
              Contact Us
            </Link>
          </div>
        </div>
      )}

    </LayoutWrapper>
  );
}
