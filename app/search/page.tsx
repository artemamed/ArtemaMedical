"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import Image from "next/image";
import Link from "next/link";
import { searchProducts } from "@/lib/api";
import { Product } from "@/lib/types";
import { useSearchParams } from "next/navigation";

// Function to fetch products based on the search query and page number
const fetchSearchResults = async (query: string, page: number) => {
  const response = await searchProducts(query, page); // Assuming searchProducts accepts a page number
  if (!response || !response.data) {
    throw new Error("Failed to fetch products.");
  }
  return response; // Return the whole response object which contains data
};

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams(); // Get search params
  const query = searchParams.get("query") || ""; // Get the 'query' param from the URL

  // Use react-query to fetch paginated search results
  const {
    data: productPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["searchResults", query],
    queryFn: ({ pageParam = 1 }) => fetchSearchResults(query, pageParam),
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.data?.length ? pages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
    enabled: query.length > 0, // Only fetch if query is not empty
    initialPageParam: 1,
  });

  const products: Product[] = useMemo(
    () => productPages?.pages.flatMap((page) => page.data) || [],
    [productPages]
  );

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="w-12 h-12 border-4 border-teal-500 border-solid rounded-full animate-spin border-t-transparent shadow-md"
          role="status"
          aria-label="Loading"
        ></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <LayoutWrapper className="lg:py-[3rem]">
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-6 text-center mt-[1rem] text-[#004040]">
        Search Results for: &quot;{query}&quot;
      </h1>
      {/* <div className="text-end -mb-[3rem] lg:-mb-1 mr-[1rem] md:mr-[2rem] text-sm sm:text-base">
        Showing {products.length} results ...
      </div> */}
      <div className="relative flex min-h-screen">
        <main className="flex-1 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-12">
            {products.map((product) => {
              const getImageUrl = () => {
                const attributeWithImage = product.attributes.find(attr => attr.image);
                return attributeWithImage?.image || null;
              };

              const imageUrl = getImageUrl();
              const fullImageUrl = imageUrl?.startsWith('http')
                ? imageUrl
                : imageUrl
                  ? `https://medinven.api.artemamed.com${imageUrl}`
                  : null;

              return (
                <Link href={`/product/${product.slug}`} key={`${product.slug}-${product.id}`}>
                  <div className="rounded-lg p-4 flex flex-col bg-white  cursor-pointer shadow-md h-auto">
                    <div className="relative w-full h-0 pb-[60%] md:pb-[100%]">
                      <Image
                        src={fullImageUrl || "/assets/avatar.jpg"}
                        alt={product.name || "Product Image"}
                        layout="fill"
                        objectFit="contain"
                        className="absolute top-0 left-0"
                      />
                    </div>
                    <div className="flex flex-col justify-between mt-4 flex-1">
                      <h3 className="text-xs text-gray-800">{product.name}</h3>
                      <h3 className="text-base sm:text-lg font-bold text-gray-800">
                        {product.title}
                      </h3>
                      <h3 className="text-sm text-[#666666]">{product.description}</h3>
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

export default SearchPage;
