import Image from "next/image";
import React from "react";
import image from "@/public/images/Vector.svg"
import { Button } from "@/components/ui/button";

const CardWithStethoscope = () => {
    return (
        <div className="container mx-auto my-[4rem] flex items-center justify-between rounded-3xl shadow-lg bg-[#EDF8F833]">
            <Image src={image} alt="Setroscope Icon" width={400} />
            <div className="flex-1 ml-[4rem]">
                <h1 className="text-4xl font-semibold text-teal-900">
                    Reliable Instruments, Exceptional Care!
                </h1>
                <p className="mt-2 text-gray-600">Connect with us for unmatched quality</p>
                <Button className="mt-4">
                    Contact Us
                </Button>
            </div>
        </div>
    );
};

export default CardWithStethoscope;
