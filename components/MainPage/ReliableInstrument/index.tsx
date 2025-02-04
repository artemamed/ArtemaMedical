import Image from "next/image";
import React from "react";
import image from "@/public/images/Vector.svg"
import { Button } from "@/components/ui/button";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import Link from "next/link";

const CardWithStethoscope = () => {
  return (
    <LayoutWrapper>
      <div className=" px-4 my-8 md:my-[4rem]">
        <div className="flex flex-col md:flex-row items-center justify-between rounded-3xl shadow-2xl bg-[#EDF8F833] p-6 md:p-8">
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <Image
              src={image}
              alt="Setroscope Icon"
              width={400}
              className="w-[250px] md:w-[400px] h-auto"
              priority
            />
          </div>

          <div className="flex-1 text-center md:text-left lg:ml-[4rem] ">
            <h2 className="text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl font-semibold text-teal-900">
              Reliable Instruments, Exceptional Care!
            </h2>
            <p className="mt-2 text-gray-600">Want to know more about us or have any queries? Feel free to contact us.</p>
            <Link href="/contact">
            <Button className="mt-4">
                Contact Us
            </Button>
            </Link>

          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default CardWithStethoscope;
