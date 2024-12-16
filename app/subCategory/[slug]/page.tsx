"use client";

import { useEffect, useState, useCallback } from "react";
// import BreadcrumbComponent from "@/components/Breadcrumb";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProductsBySubCategorySlug } from "@/lib/api";
import { Product } from "@/lib/types"; // Assuming you have types for Product

const SubCategoryListing = ({ params }: { params: Promise<{ slug: string }> }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [subCategoryName, setSubCategoryName] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [slug, setSlug] = useState<string | null>(null);

    // Resolve the slug parameter from the route
    useEffect(() => {
        const fetchSlug = async () => {
            try {
                const resolvedParams = await params; // Unwrap the promise
                setSlug(resolvedParams.slug); // Set the slug
            } catch (err) {
                console.error("Error resolving slug:", err);
                setError("Failed to resolve the route slug.");
            }
        };

        fetchSlug();
    }, [params]);

    // Fetch products for the given subcategory
    const fetchData = useCallback(async () => {
        if (!slug) return; // Wait until slug is available
        try {
            const response = await getProductsBySubCategorySlug(slug);
            if (response.success) {
                setProducts(response.data.products || []);
                setSubCategoryName(response.data.subCategory?.name || "Unknown SubCategory");
            } else {
                setError(response.message || "Failed to fetch products.");
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("An error occurred while fetching products. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [slug]);

    // Trigger the data fetching once slug is resolved
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) return <div className="flex justify-center items-center h-screen">
        <div
            className="w-12 h-12 border-4 border-teal-500 border-solid rounded-full animate-spin border-t-transparent shadow-md"
            role="status"
            aria-label="Loading"
        ></div>
    </div>
        ;
    if (error) return <div>Error: {error}</div>;

    return (
        <LayoutWrapper className="lg:py-[3rem]">
            {/* <BreadcrumbComponent /> */}
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-6 text-center mt-[1rem] text-[#004040]">
                {subCategoryName || "SubCategory"}
            </h1>
            <div className="text-end -mb-[3rem] lg:-mb-1 mr-[1rem] md:mr-[2rem] text-sm sm:text-base">
                Showing {products.length} results ...
            </div>
            <div className="relative flex min-h-screen">
                <main className="flex-1 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link href={`/singleProduct/${product.slug}`} key={product.slug}>
                                <div className="rounded-lg p-4 flex flex-col items-center bg-white cursor-pointer">
                                    <div className="relative w-full h-full">
                                        <Image
                                            width={300}
                                            height={300}
                                            // src={
                                            //     product.attributes[0]?.image?.startsWith("http")
                                            //         ? product.attributes[0].image
                                            //         : `/uploads/${product.attributes[0]?.image || "/assets/avatar.jpg"}`
                                            // }
                                            src="/assets/avatar.jpg"
                                            alt={product.name || "Product Image"}
                                            className="w-full h-full object-contain mb-4"
                                        />

                                        <ShoppingCart
                                            className="absolute top-2 right-2 text-[#008080] bg-[#F7F7F7] rounded-full p-2 h-[3rem] w-[2.5rem]"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-800">
                                            {product.name}
                                        </h3>
                                        <h3 className="text-sm text-[#666666]">{product.description}</h3>
                                        <h3 className="text-base sm:text-xl font-semibold text-gray-800">
                                            ${product.attributes[0]?.price.toFixed(2)}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </LayoutWrapper>
    );
};

export default SubCategoryListing;
