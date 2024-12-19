"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Settings2, X } from "lucide-react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { getCategories, getSubCategoriesByCategorySlug } from "@/lib/api";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

// Types
interface SubCategory {
  categorySlug: string;
  slug: string;
  name: string;
  description: string;
  image: string | null;
}

interface Category {
  subCategories: SubCategory[];
  slug: string;
  name: string;
  icon: string;
}
const ProductSubCategory: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const categorySlug = pathname?.split("/").pop();

  // React Query: Fetch Categories
  const { data: categories, isLoading: loadingCategories, error: categoryError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // React Query: Fetch Subcategories with Infinite Scrolling
  const {
    data: subCategoriesPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: loadingSubCategories,
    error: subCategoryError,
  } = useInfiniteQuery({
    queryKey: ["subcategories", categorySlug],
    queryFn: async ({ pageParam = 1 }) => {
      if (!categorySlug) return null;
      const response = await getSubCategoriesByCategorySlug(categorySlug, pageParam);
      return response?.data?.data || {};
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.subCategories?.length ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!categorySlug, // Only fetch if `categorySlug` is available
  });

  // Flatten Subcategories
  const subCategories: SubCategory[] = useMemo(() => {
    return (
      subCategoriesPages?.pages?.flatMap((page: { subCategories?: SubCategory[] }) => page?.subCategories || []) || []    );
  }, [subCategoriesPages]);

  const categoryName = subCategoriesPages?.pages?.[0]?.category?.name || "Subcategories";

  // Handle Sidebar
  const handleCategoryClick = useCallback(
    (subcategorySlug: string) => {
      router.push(`/subcategory/${subcategorySlug}`);
      setShowSidebar(false);
    },
    [router]
  );

  // Show/Hide Button on Scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY <= 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Sidebar = useMemo(
    () => (
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-100 shadow-lg z-40 p-4 transform transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:w-64 lg:rounded-2xl`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Categories</h2>
          <Button className="lg:hidden" variant="ghost" onClick={() => setShowSidebar(false)}>
            <X />
          </Button>
        </div>
        <ul className="space-y-4">
          {categories?.map((category: Category) => (
            <li key={category.slug}>
              <details className="cursor-pointer">
                <summary className="hover:text-teal-600 text-lg font-medium text-[#004040] flex items-center gap-2">
                  <Icon icon={category.icon} className="text-xl" />
                  {category.name}
                </summary>
                <ul className="ml-8 mt-2 space-y-1 text-sm text-gray-600">
                  {category.subCategories?.map((subcategory: SubCategory) => (
                    <li
                      key={subcategory.slug}
                      className="hover:text-teal-600 cursor-pointer"
                      onClick={() => handleCategoryClick(subcategory.slug)}
                    >
                      {subcategory.name}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </aside>
    ),
    [categories, handleCategoryClick, showSidebar]
  );
  
  

  if (loadingCategories || loadingSubCategories)
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="w-12 h-12 border-4 border-teal-500 border-solid rounded-full animate-spin border-t-transparent shadow-md"
          role="status"
          aria-label="Loading"
        ></div>
      </div>
    );

  if (categoryError || subCategoryError)
    return <div className="text-red-500">Failed to load data. Please try again.</div>;

  return (
    <LayoutWrapper>
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-center py-16">
        {categoryName}
      </h1>
      <div className="relative flex min-h-screen my-8">
        {showButton && (
          <Button
            className="fixed top-[15rem] left-9 md:top-[15rem] lg:top-60 lg:left-[1.5rem] xl:left-[7rem] 2xl:left-[14rem] transition-opacity duration-300"
            variant="secondary"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "Hide Categories" : "Show Categories"}{" "}
            <Settings2 className="w-5 h-5 ml-2" />
          </Button>
        )}

        {showSidebar && Sidebar}
        <main className="flex-1 lg:-mt-3 cursor-pointer">
          {subCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4 gap-6">
              {subCategories.map((subCategory) => (
                <div
                  key={subCategory.slug}
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
            <p className="text-gray-600 text-center mt-8">No subcategories found.</p>
          )}

          {isFetchingNextPage && <div>Loading more...</div>}
          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              variant="secondary"
              className="mt-8 mx-auto block"
            >
              Load More
            </Button>
          )}
          {!hasNextPage && <div className="text-center text-gray-500 mt-8">No more data.</div>}
        </main>
      </div>
    </LayoutWrapper>
  );
};
export default ProductSubCategory;
