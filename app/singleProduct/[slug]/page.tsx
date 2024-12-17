//app/singleproduct/[slug]/page.tsx
"use client";

import { getProductBySlug, getSimilarProducts } from "@/lib/api"; // Add getSimilarProducts
import BreadcrumbComponent from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import { Ruler, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ScrollAreaHorizontalDemo } from "@/components/Product/singleProductScroll";
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
};

type SimilarProduct = {
    slug: string;
    name: string;
    description: string;
    attributes: ProductAttribute[];
};

interface SingleProductProps {
    params: Promise<{ slug: string }>;
}

const SingleProduct: React.FC<SingleProductProps> = ({ params }) => {
    // Add this inside your SingleProduct Component
    const dispatch = useDispatch();

    const [slug, setSlug] = useState<string | null>(null);
    const [product, setProduct] = useState<Product | null>(null);
    const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // Fetch slug from params
    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await params;
            setSlug(resolvedParams.slug);
        };

        resolveParams();
    }, [params]);

    // Fetch product and similar products data when slug is available
    useEffect(() => {
        if (slug) {
            const fetchProductData = async () => {
                try {
                    const fetchedProduct = await getProductBySlug(slug);
                    setProduct(fetchedProduct);
                    setSelectedImage(fetchedProduct.attributes[0]?.image || null);

                    // Fetch similar products
                    const similarResponse = await getSimilarProducts("probs", slug, 4);
                    console.log("Similar Products Response:", similarResponse); // Debug
                    setSimilarProducts(similarResponse?.data?.products || []);
                } catch (error) {
                    console.error("Error fetching product or similar products:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProductData();
        }
    }, [slug]);


    const handleAddToCart = () => {
        if (!product) {
            toast.error("Product data is not available.");
            return;
        }

        if (!selectedSize) {
            toast.error("Please select a size before adding to cart");
            return;
        }

        // const cartItem = {
        //     id: product.
        //     slug: product.slug,
        //     title: product.title,
        //     image: selectedImage || "/placeholder.png",
        //     price: selectedProduct?.price || product.attributes[0]?.price,
        //     quantity,
        //     size: selectedSize,
        // };

        // dispatch(addToCart(cartItem));

        dispatch(addToCart({
            id: uuidv4(), // Auto-generate a unique ID
            slug: "product-slug",
            size: "M",
            quantity: 1,
            price: 20,
            title: "Product Title",
            image: "/path-to-image.jpg",
            sku: ""
        }));

        // Show a success toast notification
        toast.success(`${product.title} added to cart!`, {
            position: "top-right",
            autoClose: 3000, // Toast disappears after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };




    // Increment and decrement quantity
    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    // Handle image selection
    const handleImageClick = (imageUrl: string) => setSelectedImage(imageUrl);

    // Get the selected price based on selectedSize (if available)
    const selectedProduct = product?.attributes.find(
        (attr) => attr.sku === selectedSize
    );

    // Total price calculation based on selected size and quantity
    const totalPrice = selectedProduct
        ? selectedProduct.price * quantity
        : (product?.attributes[0]?.price || 0) * quantity;

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

    // Ensure the image path is absolute or has a leading slash
    const getValidImageUrl = (imageUrl: string | null) => {
        if (!imageUrl) return "/placeholder.png"; // fallback image
        return imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
    };

    return (
        <LayoutWrapper className="min-h-screen flex items-center justify-center p-4 md:p-8 mb-[5rem]">
            <div className="w-full">
                <BreadcrumbComponent />
                <div className="flex flex-col lg:flex-row py-8 lg:py-16 space-y-6 lg:space-y-0 lg:space-x-8">
                    {/* Image Section */}
                    <div className="flex flex-col justify-center items-center lg:w-3/5 gap-4">
                        <Image
                            width={300}
                            height={300}
                            src={getValidImageUrl(selectedImage)}
                            alt={product.name}
                            className="h-48 sm:h-64 lg:h-[35rem] lg:w-[35rem] mix-blend-multiply"
                        />
                        {/* Pass images as a prop to ScrollArea */}
                        <ScrollAreaHorizontalDemo
                            onImageClick={handleImageClick}
                            images={product.attributes.map((attr) => getValidImageUrl(attr.image))}
                        />
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-1/3 lg:pl-8">
                        <h1 className="text-xl sm:text-xl lg:text-2xl font-bold">{product.title}</h1>
                        <p className="text-gray-500 text-sm lg:text-base mt-2">{product.description}</p>

                        {/* Size Selector */}
                        <div className="mt-6">
                            <p className="text-sm font-semibold flex">
                                <Ruler className="mr-2 h-5 w-5" />Size
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mt-2">
                                {product.attributes.map((attr) => (
                                    <button
                                        key={attr.sku}
                                        onClick={() => setSelectedSize(attr.sku)}
                                        className={`border px-3 py-2 rounded-lg text-sm ${selectedSize === attr.sku
                                            ? "bg-[#F0FDFD] text-[#008080] border-[#008080]"
                                            : "hover:border-[#008080]"
                                            }`}
                                    >
                                        {`Size: ${attr.size} | SKU: ${attr.sku}`}
                                    </button>
                                ))}
                            </div>
                        </div>


                        {/* Total Price Display */}
                        <div className="text-xl 2xl:text-3xl font-bold mt-4">
                            ${totalPrice.toFixed(2)}
                        </div>

                        {/* Quantity Selector */}
                        <div className="mt-6 flex gap-4">
                            <div className="flex items-center space-x-4 text-[#008080] border border-[#008080] rounded-md px-5">
                                <button onClick={decrementQuantity}>−</button>
                                <span>{quantity}</span>
                                <button onClick={incrementQuantity}>+</button>
                            </div>
                            <Button onClick={handleAddToCart}>
                                Add to cart
                                <ShoppingCart className="ml-2 h-5 w-5" />
                            </Button>

                        </div>
                    </div>
                </div>
                {/* Similar Products */}
                <div className="mt-16 2xl:mx-[6rem]">
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
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default SingleProduct;
