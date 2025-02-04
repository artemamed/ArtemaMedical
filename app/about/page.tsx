"use client";
import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

type Stat = {
    title: string;
    description: string;
    value: number;
    data: string;
};

const About: React.FC = () => {
    const heading = "Best Medical Equipment Manufacturers";
    const subheading =
        "Trusted by medical professionals and agencies worldwide for reliable and precise medical equipment that enhances patient satisfaction.";

    const stats: Stat[] = useMemo(() => [
        { title: "Years", description: "In Healthcare Innovation", value: 40, data: "Years" },
        { title: "Hospitals", description: "Trusted By 1,000+ Hospitals Worldwide", value: 1000, data: "Hospitals" },
        { title: "Distributors", description: "Global Distributors Healthcare", value: 10, data: "Distributors" },
    ], []);

    const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

    useEffect(() => {
        const intervals = stats.map((stat, index) => {
            const step = Math.ceil(stat.value / 100);
            return setInterval(() => {
                setCounts((prevCounts) => {
                    const newCounts = [...prevCounts];
                    if (newCounts[index] < stat.value) {
                        newCounts[index] = Math.min(newCounts[index] + step, stat.value);
                    }
                    return newCounts;
                });
            }, 30);
        });

        return () => {
            intervals.forEach((interval) => clearInterval(interval));
        };
    }, [stats]);

    return (
        <LayoutWrapper className="min-h-screen flex-1 lg:py-[5rem]">
            <div className="max-w-6xl">
                <h1 className="text-2xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold md:text-left">
                    {heading.split(" ").map((word, index) =>
                        ["Surgical", "Healthcare"].includes(word) ? (
                            <span key={index} className="text-[#008080]">
                                {word}{" "}
                            </span>
                        ) : (
                            <span key={index}>{word} </span>
                        )
                    )}
                </h1>
                <p className="mt-4 text-[#666666] text-sm md:text-base lg:text-lg leading-7  md:text-left md:ml-auto md:w-[20rem] xl:w-[30rem]">
                    {subheading}
                </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 lg:gap-24 justify-center sm:justify-start">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center w-[10rem] ">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#008080]">
                            {counts[index]}+
                        </h2>
                        <div className="text-lg md:text-xl font-semibold">
                            {stat.data}
                        </div>
                        <div className="border-b mt-3 border-[#E0E0E0]"></div>
                        <p className="mt-3 text-sm md:text-base text-[#6D6D6D]">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>

            <section className="flex flex-wrap items-center justify-between px-4 md:px-16 py-8 md:py-24">
                <div className="flex flex-col items-center md:w-1/3 text-center">
                    <div className="rounded-full flex items-center justify-center mt-12 xl:-mb-[2rem]">
                        <Image
                            width={300}
                            height={800}
                            src="/images/About/building.png"
                            alt="World Map"
                            className="w-[200px] xl:w-[250px] object-contain"
                        />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-semibold mt-4 text-[#004040]">1980</h2>
                    <p className="text-[#666666] mt-4 text-sm md:text-base">
                        Company founded with the goal to revolutionize healthcare technology
                    </p>
                </div>

                <div className="md:w-3/6 mt-8 md:mt-0 text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl font-bold">
                        Building a Legacy of Trust
                    </h2>
                    <p className="mt-6 text-sm md:text-base text-gray-700 text-justify  ">
                        Founded over 40 years ago, our company set out with a singular vision: to raise the standard of the
                        healthcare industry with the invention of innovative and precise medical tools. Our hard work and
                        consistency have always made us proud and enabled us to win the trust of healthcare professionals on a
                        global scale.
                    </p>
                    <p className="mt-4 text-sm md:text-base text-gray-700 text-justify">
                        Today, we provide our services through a network of more than 10 regional distributors
                        and business partners in over 50 countries, covering three major continents of the world. We have
                        shown consistent growth and are continuously improving ourselves.
                    </p>
                </div>
            </section>

            <section className="flex flex-wrap px-4 md:px-16 py-8  ">
                <div className="flex flex-col items-center md:w-1/3 text-center">
                    <h2 className="text-2xl md:text-4xl font-semibold text-[#004040]">2000</h2>
                    <p className="text-[#666666] mt-4 text-sm md:text-base text-justify">
                        Company founded with the goal to revolutionize healthcare technology
                    </p>
                </div>

                <div className="md:w-2/3 flex justify-center mt-8 md:mt-0 mx-auto">
                    <Image
                        width={600}
                        height={1200}
                        src="/images/About/map.png"
                        alt="World Map"
                        className="w-[200px] md:w-[400px] xl:w-[500px] md:ml-[5rem] xl:ml-[10rem] object-contain"
                    />
                </div>
            </section>

            <section className="flex flex-wrap items-center justify-between px-4 md:px-16 py-8">
                <div className="flex flex-col items-center md:w-1/3 text-center mx-auto md:mx-0">
                    <div className="rounded-full flex items-center justify-center mt-12">
                        <Image
                            width={1200}
                            height={1200}
                            src="/images/About/quality.png"
                            alt="World Map"
                            className="w-[250px] md:w-[500px] object-contain"
                        />
                    </div>
                </div>

                <div className="md:w-3/6 mt-8 md:mt-0 text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl font-bold">
                        Transparency, Reliability, and Innovation
                    </h2>
                    <p className="mt-6 text-sm md:text-base text-gray-700 text-justify">
                        Our core values are at the root of all that we do. We always show who we are and what we can do and
                        have never been dishonest with our work. We are a reliable agency that provides companies with high-
                        quality tools to save time and build trust.
                    </p>
                    <p className="mt-4 text-sm md:text-base text-gray-700 text-justify">
                        We have a highly skilled team of medical equipment
                        manufacturers and surgeons committed to developing versatile surgical instruments and hospital
                        equipment. By adhering to our core principles, we can continuously expand into new markets and grow
                        our business internationally.
                    </p>
                </div>
            </section>
        </LayoutWrapper>
    );
};

export default About;

