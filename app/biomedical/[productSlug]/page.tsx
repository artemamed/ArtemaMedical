"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FetchBioMedicalData } from "@/lib/getBioMedicalProduct";
import Image from "next/image";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";

type ProductType = {
  key: string;
  name: string;
  crosual: { src: string }[];
  description: string;
  shortDescription: { value: string }[];
};

const Page = ({ params }: { params: Promise<{ productSlug: string }> }) => {
  const resolvedParams = React.use(params); // Unwrapping params
  const [Product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const unwrappedParams = await resolvedParams;
      const data = await FetchBioMedicalData(unwrappedParams.productSlug);
      setProduct(data);
    };
    fetchData();
  }, [resolvedParams]);

  if (!Product) return <div>Loading...</div>;

  return (
    <LayoutWrapper className="min-h-screen">
      <div className="flex flex-col lg:flex-row  md:justify-between items-center lg:gap-14 mx-4 m-2">
        <div className="w-full  p-8 lg:w-[calc(50%-10px)] mb-4 lg:mb-0">
          <h1 className="text-2xl mb-4 font-bold">{Product.name}</h1>
          <div className="rounded-xl shadow-lg border-2">
            <Carousel>
              <CarouselContent>
                {Product.crosual?.map((crosualImg: { src: string }, index: number) => (
                  <CarouselItem key={index}>
                    <Image
                      className="rounded-t-lg"
                      src={crosualImg.src}
                      alt="Product Image"
                      height={300}
                      width={800}
                    />
                  </CarouselItem>
                )) || <div>No images available</div>}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <div className="w-full lg:w-[calc(50%-10px)] mb-4 lg:mb-0">
          <h2 className="text-2xl font-bold">Description:</h2>
          <ul className="gap-4">
            <li className="mb-2 font-semibold text-md">
              {Product.description}
            </li>
            <br />
            {Product.shortDescription?.map((sd: { value: string }, index: number) => (
              <li className="mb-1" key={index}>
                -{sd.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Page;
