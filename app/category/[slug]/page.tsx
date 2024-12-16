"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Settings2, X } from "lucide-react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { getCategories, getSubCategoriesByCategorySlug } from "@/lib/api";

interface SubCategory {
  categorySlug: string;
  slug: string;
  name: string;
  description: string;
  image: string | null;
}
interface Category {
  slug: string;
  name: string;
  icon: string;
  subcategories: SubCategory[];
}

const ProductSubCategory: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(true);


  const router = useRouter();
  const pathname = usePathname();
  const categorySlug = pathname?.split("/").pop();

  /** Fetch categories once */
  const fetchCategories = useCallback(async () => {
    try {
      const categoriesResponse = await getCategories();
      setCategories(categoriesResponse);
    } catch (error) {
      setError("Failed to fetch categories. Please try again later.");
      console.error("Error fetching categories:", error);
    }
  }, []);

  /** Fetch subcategories for the current category slug */
  const fetchSubCategories = useCallback(async () => {
    if (!categorySlug) return;

    try {
      setLoading(true);
      const subCategoryResponse = await getSubCategoriesByCategorySlug(categorySlug, page);

      const subCategoriesData = subCategoryResponse?.data?.data?.subCategories || [];
      setSubCategories((prev) => {
        const merged = [...prev, ...subCategoriesData];
        // Filter to remove duplicates based on `slug` or another unique identifier
        const uniqueSubCategories = Array.from(
          new Map(merged.map((item) => [item.slug, item])).values()
        );
        return page === 1 ? subCategoriesData : uniqueSubCategories;
      });

      setCategoryName(subCategoryResponse?.data?.data?.category?.name || "");
      setHasMore(subCategoriesData.length > 0);
    } catch (error) {
      setError("Failed to fetch subcategories. Please try again later.");
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [categorySlug, page]);


  /** Fetch categories on mount */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        // Hide the button when user scrolls down more than 10px
        setShowButton(false);
      } else {
        // Show the button when the user is at the top (scrollY <= 10)
        setShowButton(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        // Hide the button when user scrolls down more than 10px
        setShowButton(false);
      } else {
        // Show the button when the user is at the top (scrollY <= 10)
        setShowButton(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /** Fetch subcategories when categorySlug or page changes */
  useEffect(() => {
    setPage(1); // Reset to the first page when the category slug changes
    setSubCategories([]); // Clear subcategories when category changes
    if (categorySlug) fetchSubCategories();
  }, [categorySlug, fetchSubCategories]);

  /** Infinite scrolling logic */
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 // Trigger 200px before reaching the bottom
      ) {
        if (hasMore && !loadingMore) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loadingMore]);

  /** Watch page changes to fetch more subcategories */
  useEffect(() => {
    if (page > 1) {
      setLoadingMore(true);
      fetchSubCategories();
    }
  }, [fetchSubCategories, page]);

  const handleCategoryClick = useCallback(
    (subcategorySlug: string) => {
      router.push(`/subCategory/${subcategorySlug}`);
      setShowSidebar(false);
    },
    [router]
  );

  const Sidebar = useMemo(
    () => (
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
                  {subCategories
                    .filter((subcategory) => subcategory.categorySlug === category.slug) // Ensure filtered by the right category
                    .map((subcategory, subIndex) => (
                      <li
                        key={subIndex}
                        className="hover:text-teal-600 cursor-pointer"
                        onClick={() => handleCategoryClick(subcategory.slug)}
                      >
                        {subcategory.slug}
                      </li>
                    ))}
                </ul>
              </details>
            </li>
          ))}

        </ul>
      </aside>
    ),
    [categories, handleCategoryClick, showSidebar, subCategories]
  );

  if (loading) return <div className="flex justify-center items-center h-screen">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <LayoutWrapper>
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-center py-16">
        {categoryName || "Subcategories"}
      </h1>
      <div className="relative flex min-h-screen my-8">
        {showButton && (

          <Button
            className="fixed top-[15rem] left-9 md:top-[15rem] lg:top-60 lg:left-[1.5rem] xl:left-[7rem] 2xl:left-[14rem] transition-opacity duration-300"
            variant="secondary"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Hide Categories" : "Show Categories"} <Settings2 className="w-5 h-5 ml-2" />
          </Button>
        )}

        {showSidebar && Sidebar}
        <main className="flex-1 lg:-mt-3 cursor-pointer">
          {subCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4 gap-6">
              {subCategories.map((subCategory, index) => (
                <div
                  key={index}
                  className="rounded-lg p-4 flex flex-col items-center"
                  onClick={() => handleCategoryClick(subCategory.slug)}
                >
                  <Image
                    width={300}
                    height={300}
                    src={subCategory.image || "/assets/avatar.jpg"}
                    alt={subCategory.name}
                    className="w-full h-full object-contain mb-4 border rounded-2xl"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{subCategory.name}</h3>
                  <p className="text-gray-600">{subCategory.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center mt-8">No subcategories found for this category.</p>
          )}
          {loadingMore && <div>Loading more...</div>}
          {!hasMore && <div className="text-center text-gray-500">No more subcategories available.</div>}
        </main>
      </div>
    </LayoutWrapper>
  );
};

export default ProductSubCategory;
