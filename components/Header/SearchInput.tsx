"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Input from "../ui/input";
import { searchProducts } from "@/lib/api";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import LayoutWrapper from "../Wrapper/LayoutWrapper";

const SearchInput: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Track the search query
  const [searchResults, setSearchResults] = useState<Product[]>([]); // Store the search results
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
      const results = await searchProducts(query === "" ? null : query, 1); // Handle null or query, and add page number
      setSearchResults(results.data || []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSelect = (query: string) => {
    closeDropdown(); // Close the dropdown when an option is selected
    router.push(`/search?page=1&query=${query}`); // Navigate to search page with query
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Trigger search when 'Enter' key is pressed
    if (e.key === "Enter") {
      if (searchQuery.trim()) {
        router.push(`/search?page=1&query=${searchQuery}`);
      }
    }
  };

  return (
    <div
      className="relative"
      onMouseLeave={closeDropdown} // Close dropdown on mouse leave
    >
      <button onClick={toggleDropdown}>
        <Search className="w-6 h-6 mt-2 hover:text-[#008080]" />
      </button>

      {isOpen && (
        <>
          {/* Background overlay with blur */}
          <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={toggleDropdown}
          />

          {/* Search Content */}
          <div
            className={`fixed inset-x-0 mt-5 bg-[#F7F7F7] px-4 sm:px-5 md:px-10 lg:px-20 rounded-2xl z-50 transition-transform duration-300 ${
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
            }`}
          >
            <div className="p-4 md:w-[80%] lg:w-[70%] xl:w-[55%] mx-auto">
              <LayoutWrapper className="relative">
                <Input
                  type="text"
                  placeholder="Search Products"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)} // Update search query on change
                  onKeyDown={handleKeyPress} // Trigger search on 'Enter'
                  className="pl-10 w-full max-w-lg items-center mx-auto rounded-xl font-bold focus:outline-none"
                />
              </LayoutWrapper>
            </div>

            {/* Loading or displaying results */}
            {isLoading ? (
              <div className="py-4 text-center">Loading...</div>
            ) : (
              <ul className="py-2 max-w-2xl mx-auto max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <li
                      key={product.slug}
                      className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
                      onClick={() => handleSearchSelect(product.name)} // Close dropdown on selection
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">{product.name}</span>
                        <span className="text-sm text-gray-500">
                          {product.title}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="py-2 px-4 text-center text-gray-500">
                    No products found.
                  </div>
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
