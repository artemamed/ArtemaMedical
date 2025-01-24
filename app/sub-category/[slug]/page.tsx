"use client";

import React, { useMemo, useCallback, useEffect, use } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import Image from "next/image";
import Link from "next/link";
import { getProductsBySubCategorySlug } from "@/lib/api";
import { Product } from "@/lib/types";

const fetchProducts = async (slug: string, page: number) => {
    const response = await getProductsBySubCategorySlug(slug, page);
    console.log(response)
    if (!response.success) {
        throw new Error(response.message || "Failed to fetch products.");
    }
    return response.data;
};

const SubCategoryListing = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = use(params);

    const {
        data: productPages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["products", slug],
        queryFn: ({ pageParam = 1 }) => fetchProducts(slug, pageParam),
        getNextPageParam: (lastPage, pages) => {
            return lastPage.products.length ? pages.length + 1 : undefined;
        },
        staleTime: 1000 * 60 * 5,
        initialPageParam: 1,
    });

    const products: Product[] = useMemo(
        () =>
            productPages?.pages.flatMap((page) => page.products) || [],
        [productPages]
    );

    const subCategoryName: string =
        productPages?.pages?.[0]?.subCategory?.name || "Unknown SubCategory";

    const subCategoryMetadata = productPages?.pages?.[0]?.subCategory?.metadata?.[0];

    // Set Meta title and description based on API data
    useEffect(() => {
        if (subCategoryMetadata) {
            // Set the meta title and description dynamically
            document.title = subCategoryMetadata.title || "Default Title";
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute("content", subCategoryMetadata.description || "Default description");
            }
        }
    }, [subCategoryMetadata]);

    // Infinite Scroll Handler
    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 300
        ) {
            if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div
                    className="w-12 h-12 border-4 border-teal-500 border-solid rounded-full animate-spin border-t-transparent shadow-md"
                    role="status"
                    aria-label="Loading"
                ></div>
            </div>
        );

    if (isError) return <div>Error: {(error as Error).message}</div>;

    return (
        <LayoutWrapper className="lg:py-[3rem]">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-6 text-center mt-[1rem] text-[#004040]">
                {subCategoryName || "SubCategory"}
            </h1>
            <div className="relative flex min-h-screen">
                <main className="flex-1 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-12">
                        {products.map((product, index) => {
                            const imageUrl = product.attributes[0]?.image;
                            const fullImageUrl = imageUrl?.startsWith("http")
                                ? imageUrl
                                : `https://medinven.api.artemamed.com${imageUrl}`;
                            return (
                                <Link href={`/product/${product.slug}`} key={`${product.slug}-${index}`}>
                                    <div className="rounded-lg p-4 flex flex-col  bg-white cursor-pointer shadow-md h-auto">
                                        <div className="relative w-full h-0 pb-[50%] md:pb-[100%]">
                                            <Image
                                                src={fullImageUrl || "/assets/avatar.jpg"}
                                                alt={product.name || "Product Image"}
                                                layout="fill"
                                                objectFit="contain"
                                                className="absolute top-0 left-0"
                                            />
                                        </div>
                                        <div className="flex flex-col  mt-4 flex-1">
                                            <h3 className="text-xs text-gray-800">{product.name}</h3>
                                            <h3 className="text-base sm:text-lg font-bold text-gray-800">
                                                {product.title}
                                            </h3>
                                            {/* <h3 className="text-sm text-[#666666]">
                                                {product.description}
                                            </h3> */}
                                            <h3 className="text-base sm:text-xl font-semibold text-gray-800">
                                                ${product.attributes[0]?.price.toFixed(2)}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}

                    </div>
                    {isFetchingNextPage && <div className="text-center mt-4">Loading more...</div>}
                    {!hasNextPage && (
                        <div className="text-center text-gray-500 mt-8">No more products.</div>
                    )}
                </main>
            </div>
        </LayoutWrapper>
    );
};
export default SubCategoryListing;
