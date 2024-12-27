"use client";
import React from "react";

import { cards } from "@/constant/BiomedicalEquipments";

import Link from "next/link";
import Image from "next/image";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";

const Page = () => {
  return (
    <LayoutWrapper className="min-h-screen">
      <div className="m-6">
        <div className="my-4">
        <h1 className="text-2xl md:text-4xl font-semibold text-center text-[#004040] mb-6">
            Biomedical Devices
          </h1>
          <div className="flex justify-center items-center ">
            <p className="  max-w-7xl text-lg">
              Discover cutting-edge biomedical solutions at Artema Medical
              Group, your authorized distributor of Vyaire&apos;s innovative
              biomedical equipment. Our advanced devices seamlessly integrate
              into healthcare ecosystems, advancing patient care worldwide.
              Experience excellence in biomedical technology with Artema, your
              trusted partner in shaping the future of medical advancements
              through our authorized collaboration with Vyaire.
            </p>{" "}
          </div>
        </div>
       
      </div>
      <div className=" grid grid-cols-1 mx-4    sm:grid-cols-2 md:grid-cols-3  gap-4  lg:grid-cols-4 ">
        {cards.map((card, index) => (
          <section key={index}>
            <Link href={`/biomedical/${card.key}`}>
              <div className=" max-w-sm mx-auto hover:shadow-2xl shadow-gray-200 bg-white border border-gray-200 rounded-lg shadow mb-4 dark:bg-gray-800 dark:border-gray-700 h-full">
                <div>
                  <Image
                    src={card.img_src as string}
                    alt={card.name}
                    className="rounded-t-lg h-full object-cover  aspect-square"
                    height={1200}
                    width={700}
                  />
                </div>
                <div className="p-4">
                  <div className="h-14 ">
                    <h5 className="mb-2  text-sm xl:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {" "}
                      {card.name}
                    </h5>
                  </div>
                  <div className="  h-28 ">
                    <p className="mb-3 font-normal mt-2  xl:text-xl text-sm max-h text-gray-700 dark:text-gray-400">
                      {card.description}
                    </p>
                  </div>

                  <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:text-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                  </div>
                </div>
              </div>
            </Link>
          </section>
        ))}
      </div>
    </LayoutWrapper>
  );
};

export default Page;
