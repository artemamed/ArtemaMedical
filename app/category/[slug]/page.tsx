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
    slug: string;
    name: string;
    description: string;
    image: string | null;
}

interface Category {
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
    const [page,] = useState(1);
    const [showButton, setShowButton] = useState(true);

    const router = useRouter();
    const pathname = usePathname();
    const categorySlug = pathname?.split("/").pop();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const categoriesResponse = await getCategories();
            setCategories(categoriesResponse);

            if (categorySlug) {
                const subCategoryResponse = await getSubCategoriesByCategorySlug(categorySlug, page);

                const subCategoriesData = subCategoryResponse?.data?.data?.subCategories || [];
                if (subCategoriesData.length > 0) {
                    setSubCategories((prev) => [...prev, ...subCategoriesData]);
                    setCategoryName(subCategoryResponse?.data?.data?.category?.name || "");
                    setHasMore(subCategoriesData.length > 0);
                } else {
                    setHasMore(false);
                }
            }
        } catch (error) {
            setError("Failed to fetch data. Please try again later.");
            console.error("Error during data fetching:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [categorySlug, page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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

    const handleCategoryClick = useCallback(
        (subcategorySlug: string) => {
            router.push(`/products/${subcategorySlug}`);
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
                                    {subCategories.map((subcategory, subIndex) => (
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

    if (loading) return <div>Loading...</div>;
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
                {showSidebar && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
                        onClick={() => setShowSidebar(false)}
                    ></div>
                )}
                <main className="flex-1 lg:-mt-3">
                    {subCategories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {subCategories.map((subCategory, index) => (
                                <div key={index} className="rounded-lg p-4 flex flex-col items-center">
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
