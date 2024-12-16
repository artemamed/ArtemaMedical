import * as React from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Update to accept the `images` prop
export function ScrollAreaHorizontalDemo({
  onImageClick,
  images,
}: {
  onImageClick: (imageUrl: string) => void;
  images: string[];
}) {
  return (
        <ScrollArea className="relative w-full">
            <div className="flex overflow-x-auto space-x-4 md:space-x-6 lg:space-x-8 p-4">
                {images.map((imageUrl, index) => (
                    <figure
                        key={index}
                        className="shrink-0 cursor-pointer w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px] flex flex-col items-center"
                        onClick={() => onImageClick(imageUrl)}
                    >
                        <div className="rounded-md shadow-lg overflow-hidden">
                            <Image
                                src={imageUrl}
                                alt={`Image ${index + 1}`}
                                className="object-cover w-full h-auto"
                                width={150}
                                height={150}
                            />
                        </div>
                    </figure>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}