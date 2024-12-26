"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Input from "../ui/input";
import { searchProducts } from "@/lib/api";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import LayoutWrapper from "../Wrapper/LayoutWrapper";
import Image from "next/image";
import Link from "next/link";

const SearchInput: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
  };

  const closeDropdown = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    try {
      const results = await searchProducts(query === "" ? null : query, 1);
      setSearchResults(results.data || []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSelect = (query: string) => {
    closeDropdown();
    router.push(`/search?page=1&query=${query}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?page=1&query=${searchQuery}`);
    }
  };

  // Function to find the first image in attributes or return fallback
  const getProductImage = (product: Product) => {
    // Loop through attributes to find the first valid image
    for (let i = 0; i < product.attributes.length; i++) {
      const imageUrl = product.attributes[i]?.image;
      if (imageUrl) {
        const fullImageUrl = imageUrl.startsWith("http")
          ? imageUrl
          : `https://medinven.api.artemamed.com${imageUrl}`;
        return fullImageUrl;
      }
    }

    // Fallback to a different SKU's image or default image if no image is found
    const fallbackImageUrl = searchResults.find(
      (p) => p !== product && p.attributes[0]?.image
    )?.attributes[0]?.image;

    return fallbackImageUrl
      ? fallbackImageUrl.startsWith("http")
        ? fallbackImageUrl
        : `https://medinven.api.artemamed.com${fallbackImageUrl}`
      : "/assets/avatar.jpg"; // Default fallback image
  };

  return (
    <div className="relative" onMouseLeave={closeDropdown}>
      <button onClick={toggleDropdown} className="w-8 h-8 text-gray-700 transition-all duration-300 ease-in-out hover:text-[#008080]">
        <Search className="w-6 h-6 mt-2 text-gray-700 hover:text-[#008080] transition-all duration-300 ease-in-out" />
      </button>

      {isOpen && (
        <>
          <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
              }`}
            onClick={toggleDropdown}
          />

          <div
            className={`fixed inset-x-0 mt-6 bg-white px-8 sm:px-10 md:px-12 lg:px-20 rounded-2xl shadow-lg z-50 transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
              }`}
          >
            <div className="md:p-6 py-6 max-w-4xl mx-auto">
              <LayoutWrapper className="relative">
                <Input
                  type="text"
                  placeholder="Search Products"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="pl-14 w-full max-w-2xl mx-auto rounded-full shadow-xl font-semibold focus:outline-none focus:ring-4 focus:ring-[#008080] focus:border-transparent transition-all duration-300 ease-in-out"
                />
              </LayoutWrapper>
            </div>

            {isLoading ? (
              <div className="py-4 text-center text-gray-600">Loading...</div>
            ) : (
              <ul className="py-2 max-w-2xl mx-auto max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => {
                    const fullImageUrl = getProductImage(product);

                    return (
                      <Link href={`/product/${product.slug}`} key={product.slug}>
                        <li
                          className="px-8 py-4 hover:bg-[#F0F0F0] cursor-pointer rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
                          onClick={() => handleSearchSelect(product.name)}
                        >
                          <div className="flex items-center space-x-4">
                            {/* Image container */}
                            <div className="relative w-16 h-16">
                              <Image
                                src={fullImageUrl}
                                alt={product.name || "Product Image"}
                                layout="fill"
                                objectFit="contain"
                                className="absolute top-0 left-0 rounded-lg"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-[#333]">{product.name}</span>
                              <span className="text-sm text-gray-500">{product.title}</span>
                            </div>
                          </div>
                        </li>
                      </Link>
                    );
                  })
                ) : (
                  <div className="py-2 px-4 text-center text-gray-500">No products found.</div>
                )}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchInput;
