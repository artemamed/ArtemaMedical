"use client";

import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import axios from "@/lib/utils";

// Define TypeScript interfaces for better type safety
interface SubCategory {
  name: string;
}

interface Category {
  name: string;
  slug: string;
  subCategories?: SubCategory[];
}

interface MenuDataItem {
  category: Category;
}

export default function CustomDropdownMenu({ closeMenu }: { closeMenu: () => void }) {
  const [menuData, setMenuData] = useState<MenuDataItem[]>([]);
  const [visibleItems, setVisibleItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Fetch data from the API
    const fetchMenuData = async () => {
      setLoading(true);

      // Check if cached data exists
      const cachedData = localStorage.getItem("menuData");
      if (cachedData) {
        setMenuData(JSON.parse(cachedData));
        setLoading(false);
      }

      try {
        const response = await axios.get("/categories/mine", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API,
          },
        });

        if (response.data.success) {
          const fetchedData = response.data.data;
          setMenuData(fetchedData);

          // Cache the data for future use
          localStorage.setItem("menuData", JSON.stringify(fetchedData));
        } else {
          throw new Error(response.data.message || "Failed to fetch menu data.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  useEffect(() => {
    // Detect screen size and adjust visible items
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
  }, []);

  const navigateToCategories = () => {
    router.push("/category");
    closeMenu();
  };

  const navigateToSpecificCategories = (category: { name: string; slug: string }) => {
    router.push(`/category/${category.slug}`);
    closeMenu();
  };

  if (loading && !menuData.length) {
    // Show skeleton loader
    return <div className="skeleton-loader">Loading categories...</div>;
  }

  if (error && !menuData.length) {
    // Retry mechanism
    return (
      <div className="text-red-500">
        {error}
        <button
          onClick={() => location.reload()}
          className="ml-2 text-blue-500 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex items-center overflow-hidden hover:text-[#008080] focus:outline-none focus:ring-0"
          aria-label="Support Menu"
        >
          <span className="transition">Products</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="lg:mt-5 grid grid-rows-2 lg:grid-cols-4 gap-4 xl:py-[6rem] 2xl:py-[8rem] lg:py-[3rem] px-[5rem] lg:px-[4rem] xl:pl-[8rem] bg-[#F7F7F7] rounded-2xl border-none shadow-lg w-screen ">
          {menuData.slice(0, visibleItems).map(
            (wrapper, index) => {
              const { category } = wrapper;
              return (
                <div key={index} className="lg:space-y-1">
                  <DropdownMenuItem
                    className="text-sm lg:text-lg font-semibold text-[#004040] focus:bg-[#F7F7F7] focus:text-[#008080] -ml-2"
                    onClick={() => navigateToSpecificCategories(category)}
                  >
                    {category.name}
                  </DropdownMenuItem>
                  {category.subCategories?.slice(0, visibleItems).map((subCategory, idx) => (
                    <h2 key={idx} className="text-[#666666] text-sm lg:text-base hover:text-[#008080]">
                      {subCategory.name}
                    </h2>
                  ))}
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-[#008080] text-sm lg:font-medium underline"
                  >
                    View All
                  </Link>
                </div>
              );
            }
          )}
          <DropdownMenuItem
            className="bg-[#008080] text-white hover:bg-[#008080]/90 h-10 px-4 py-2 w-[10rem] focus:bg-[#378b8b] focus:text-white"
            onClick={navigateToCategories}
          >
            Browse Categories
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
