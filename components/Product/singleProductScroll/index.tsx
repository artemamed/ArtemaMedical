import * as React from "react";
import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface Artwork {
    artist: string;
    art: string;
}

export const works: Artwork[] = [
    { artist: "Screw Cate", art: "/images/productSubCategory/pic1.png" },
    { artist: "Bone Cutting", art: "/images/productSubCategory/pic3.png" },
    { artist: "Bone Cutting2", art: "/images/productSubCategory/pic4.png" },
];

export function ScrollAreaHorizontalDemo({ onImageClick }: { onImageClick: (imageUrl: string) => void }) {
    return (
        <ScrollArea className="relative w-full">
            <div className="flex overflow-x-auto space-x-4 md:space-x-6 lg:space-x-8 p-4">
                {works.map((artwork) => (
                    <figure
                        key={artwork.artist}
                        className="shrink-0 cursor-pointer w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px] flex flex-col items-center"
                        onClick={() => onImageClick(artwork.art)}
                    >
                        <div className="rounded-md shadow-lg overflow-hidden">
                            <Image
                                src={artwork.art}
                                alt={`Photo by ${artwork.artist}`}
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
