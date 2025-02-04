"use client";

import { getProductBySlug } from "@/lib/api";
import { Button } from "@/components/ui/button";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { Ruler, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

type ProductAttribute = {
    size: number;
    sku: string;
    price: number;
    image: string;
};

type Product = {
    slug: string;
    name: string;
    title: string;
    description: string;
    attributes: ProductAttribute[];
    metadata: {
        title: string;
        description: string;
    };
};

interface SingleProductProps {
    params: Promise<{ slug: string }>;
}

const SingleProduct: React.FC<SingleProductProps> = ({ params }) => {
    const dispatch = useDispatch();
    const [slug, setSlug] = useState<string | null>(null);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [showAllSizes, setShowAllSizes] = useState(false);

    const toggleShowAllSizes = () => {
        setShowAllSizes(!showAllSizes);
    };

    // Fetch slug from params
    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await params;
            setSlug(resolvedParams.slug);
        };

        resolveParams();
    }, [params]);

    // Fetch product data when slug is available
    useEffect(() => {
        if (slug) {
            const fetchProductData = async () => {
                try {
                    const fetchedProduct = await getProductBySlug(slug);
                    setProduct(fetchedProduct);

                    // Set initial image: Find the first attribute with an image
                    const firstAttributeWithImage = fetchedProduct.attributes.find((attr: ProductAttribute) => attr.image);
                    setSelectedImage(firstAttributeWithImage?.image || "/placeholder.png");

                } catch (error) {
                    console.error("Error fetching product:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProductData();
        }
    }, [slug]);

    // Handle size selection and update image
    const handleSizeSelection = (sku: string) => {
        setSelectedSize(sku);
        const selectedAttribute = product?.attributes.find((attr) => attr.sku === sku);

        // If the selected SKU doesn't have an image, find another SKU with an image
        const image = selectedAttribute?.image || product?.attributes.find((attr) => attr.image)?.image || "/placeholder.png";
        setSelectedImage(image);
    };



    const handleAddToCart = () => {
        if (isAddingToCart) return;
        setIsAddingToCart(true);

        try {
            if (!product) {
                toast.error("Product data is not available.");
                return;
            }

            if (!selectedSize) {
                toast.error("Please select a size before adding to cart.");
                return;
            }

            const selectedAttribute = product.attributes.find((attr) => attr.sku === selectedSize);

            if (!selectedAttribute) {
                toast.error("Invalid size selected.");
                return;
            }

            const cartItem = {
                id: uuidv4(),
                slug: product.slug,
                title: product.title,
                image: selectedImage || "/placeholder.png",
                price: selectedAttribute.price,
                quantity,
                size: selectedAttribute.size.toString(),
                sku: selectedAttribute.sku,
            };

            dispatch(addToCart(cartItem));
            toast.success(`${product.title} added to cart!`);
        } catch (error) {
            console.error("Failed to add product to cart:", error);
            toast.error("Failed to add product to cart.");
        } finally {
            setTimeout(() => setIsAddingToCart(false), 3000);
        }
    };

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const selectedProduct = product?.attributes.find((attr) => attr.sku === selectedSize);
    const totalPrice = selectedProduct
        ? selectedProduct.price * quantity
        : (product?.attributes[0]?.price || 0) * quantity;

    // Update image URL logic
    const getValidImageUrl = (imageUrl: string | null) => {
        if (!imageUrl) return "/placeholder.png";

        // Base URL of your API or image source
        const baseUrl = "https://medinven.api.artemamed.com"; // Update this as necessary

        // Check if the image URL is already a full URL (starts with "http")
        const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`;

        return fullImageUrl;
    };

    // Set meta title and description
    const metaTitle = product?.metadata.title || '';
    const metaDescription = product?.metadata.description || '';

    // Update the document title and meta description after the data has been loaded
    useEffect(() => {
        if (metaTitle && metaDescription) {
            document.title = metaTitle; // Set the title dynamically
            const descriptionMetaTag = document.querySelector('meta[name="description"]');
            if (descriptionMetaTag) {
                descriptionMetaTag.setAttribute("content", metaDescription);
            } else {
                const metaDescriptionElement = document.createElement("meta");
                metaDescriptionElement.name = "description";
                metaDescriptionElement.content = metaDescription;
                document.head.appendChild(metaDescriptionElement);
            }
        }
    }, [metaTitle, metaDescription]);

    if (loading) {
        return (
            <LayoutWrapper className="min-h-screen flex items-center justify-center">
                <div className="flex justify-center items-center h-screen">
                    <div
                        className="w-12 h-12 border-4 border-teal-500 border-solid rounded-full animate-spin border-t-transparent shadow-md"
                        role="status"
                        aria-label="Loading"
                    ></div>
                </div>
            </LayoutWrapper>
        );
    }

    if (!product) {
        return (
            <LayoutWrapper className="min-h-screen flex items-center justify-center">
                <p>Product not found.</p>
            </LayoutWrapper>
        );
    }

    return (
        <LayoutWrapper className="min-h-screen flex items-center justify-center p-4 md:p-8 mb-[5rem]">
            <div className="w-full">
                <div className="flex flex-col md:flex-row py-8 lg:py-16 space-y-6 md:space-y-0 md:space-x-8">
                    <div className="flex flex-col justify-center items-center md:w-3/5 gap-4">
                        <Image
                            width={300}
                            height={300}
                            src={getValidImageUrl(selectedImage)}
                            alt={product.name}
                            className="h-[15rem] w-[5rem] lg:h-[400px] lg:w-auto mix-blend-multiply object-contain"
                        />
                    </div>

                    <div className="lg:w-2/3 lg:pl-8">
                        <h2 className="text-sm font-bold">{product.name}</h2>
                        <h1 className="text-xl sm:text-xl lg:text-2xl font-bold">{product.title}</h1>
                        <p className="text-gray-500 text-sm lg:text-base mt-2">{product.description}</p>

                        <div className="mt-6">
                            <p className="text-sm font-semibold flex">
                                <Ruler className="mr-2 h-5 w-5" /> Size
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                {(showAllSizes ? product.attributes : product.attributes.slice(0, 4)).map((attr) => (
                                    <button
                                        key={attr.sku}
                                        onClick={() => handleSizeSelection(attr.sku)}
                                        className={`border px-3 py-2 rounded-lg text-sm ${selectedSize === attr.sku
                                            ? "bg-[#F0FDFD] text-[#008080] border-[#008080]"
                                            : "hover:border-[#008080]"
                                            }`}
                                    >
                                        {`Size: ${attr.size} | SKU: ${attr.sku}`}
                                    </button>
                                ))}
                            </div>
                            {product.attributes.length > 4 && (
                                <button
                                    onClick={toggleShowAllSizes}
                                    className="text-[#008080] underline mt-4"
                                >
                                    {showAllSizes ? "Show Less" : "Show More Sizes & SKUs"}
                                </button>
                            )}
                        </div>

                        <div className="text-xl 2xl:text-3xl font-bold mt-4">${totalPrice.toFixed(2)}</div>

                        <div className="mt-6 flex gap-4">
                            <div className="flex items-center space-x-4 text-[#008080] border border-[#008080] rounded-md px-5">
                                <button onClick={decrementQuantity}>−</button>
                                <span>{quantity}</span>
                                <button onClick={incrementQuantity}>+</button>
                            </div>
                            <Button onClick={handleAddToCart} disabled={isAddingToCart}>
                                {isAddingToCart ? "Adding..." : "Add to cart"}
                                <ShoppingCart className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Similar Products */}
                {/* <div className="mt-16 2xl:mx-[6rem]">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                        Similar Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {similarProducts.map((similar, index) => (
                            <div
                                key={index}
                                className="rounded-lg p-4 flex flex-col items-center bg-white"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        width={300}
                                        height={300}
                                        src={getValidImageUrl(similar.attributes[0]?.image)}
                                        alt={similar.name}
                                        className="w-full h-full object-contain mb-4"
                                    />
                                    <ShoppingCart
                                        className="absolute top-5 right-5 text-[#008080] bg-[#F7F7F7] rounded-full p-2 h-[3rem] w-[2.5rem]"
                                    />
                                </div>
                                <div className="">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800">
                                        {similar.name}
                                    </h3>
                                    <h3 className="text-sm text-[#666666]">
                                        {similar.description}
                                    </h3>
                                    <h3 className="text-base sm:text-xl font-semibold text-gray-800">
                                        ${similar.attributes[0]?.price.toFixed(2)}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </LayoutWrapper>
    );
};
export default SingleProduct;
