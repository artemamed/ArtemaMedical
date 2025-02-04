import { CircleArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Card {
  imageSrc: string;
  title: string;
  description: string;
  location: string;
}

const initialCards: Card[] = [
  {
    imageSrc: "/images/slider/slide4.png",
    title: "General Instrument",
    description: "Our general instruments are contain wide range of medical tools that are cover whole surgical process",
    location: "/category/general-instruments",
  },
  {
    imageSrc: "/images/slider/slide2.png",
    title: "Dental",
    description: "Good-quality dental instruments are manufactured at Artema Medical at an affordable price. ",
    location: "/category/dental-instruments",
  },
  {
    imageSrc: "/images/slider/slide3.png",
    title: " ENT Instruments",
    description: "We provide long, pointed, and thin ENT instruments diverse in design and size.",
    location: "/category/ent-instruments",
  },
  {
    imageSrc: "/images/slider/slide7.png",
    title: "Orthopedic",
    description: "Our orthopedic instruments hold special importance. They are known for their quality and design. ",
    location: "/category/orthopedic-instruments",
  },
  {
    imageSrc: "/images/slider/slide5.png",
    title: "Gynecology",
    description: "Gynecology instruments include a variety of retractors, measuring devices, and electronic instruments.",
    location: "/category/gynaecology-tools",
  },
  {
    imageSrc: "/images/slider/slide6.png",
    title: "Needle Holder",
    description: "A wide variety of needle holders are available, which ensures precision and control.",
    location: "/sub-category/needle-holder",
  },
  {
    imageSrc: "/images/slider/slide11.png",
    title: "Cardiovascular",
    description: "It includes a range of instruments, from electronic devices to surgical instruments.",
    location: "/category/cardiovascular",
  },
  {
    imageSrc: "/images/slider/slide8.png",
    title: "Dermatology Tools",
    description: "Highly precise and durable dermatology tools are manufactured at Artema Medical. They are ergonomically designed in a variety of shapes and sizes.",
    location: "/category/general-instrument",
  },
  {
    imageSrc: "/images/slider/slide9.png",
    title: "Scissors",
    description: "A wide array of scissors are designed at Artema Medical using stainless steel and tungsten carbide.",
    location: "/sub-category/scissors",
  },
];

const MedicalCardSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);

  const extendedCards = [...initialCards, ...initialCards, ...initialCards];

  useEffect(() => {
    // Only access window in client-side
    const updateCardsPerView = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 640) setCardsPerView(1);
        else if (width < 768) setCardsPerView(2);
        else if (width < 1024) setCardsPerView(3);
        else setCardsPerView(4);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    const handleNext = () => {
      if (isSliding) return;

      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          if (newIndex >= extendedCards.length - initialCards.length) {
            return initialCards.length;
          }
          return newIndex;
        });
        setIsSliding(false);
      }, 500);
    };

    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, [isSliding, extendedCards.length]);

  return (
    <div className="relative py-8 sm:py-12 md:py-16 lg:py-[10rem] overflow-hidden">
      <div
        className="flex transition-transform duration-200 md:duration-300 ease-in-out  h-[350px]"
        style={{
          transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
        }}
      >
        {extendedCards.map((card, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 sm:px-3 md:px-4"
          >
            <Link key={index} href={card.location.startsWith("/") ? card.location : `/${card.location}`} passHref>
            <div
              className={`rounded-xl hover:shadow-lg ${currentIndex % initialCards.length === index % initialCards.length
                ? "bg-[#CFE7E7] sm:py-6"
                : "bg-[#F7F7F7]"
                } transition-all duration-300`}
            >
              <div className="relative h-[250px]"> {/* Fixed height for consistency */}
                <Image
                  width={500}
                  height={500}
                  src={card.imageSrc}
                  alt={card.title}
                  className={`p-3 sm:p-4 lg:p-[1rem] object-contain w-full h-full transition-all duration-300 ${currentIndex % initialCards.length === index % initialCards.length
                    ? "transform -translate-y-10 sm:-translate-y-5 md:-translate-y-[6rem] lg:-translate-y-[9rem]"
                    : "h-[100px] sm:h-[175px] md:h-[250px]"
                    }`}
                />
              </div>
              <div
                className={`p-3 sm:p-4 mx-auto ${currentIndex % initialCards.length === index % initialCards.length
                  ? "transform -translate-y-4 sm:-translate-y-5 md:-translate-y-6 lg:-translate-y-[7rem]"
                  : ""
                  }`}
              >
                <h3 className="text-base sm:text-lg font-semibold text-teal-700 flex justify-between items-center">
                  {card.title}
                  <CircleArrowRight className="text-teal-700 w-5 h-5 sm:w-6 sm:h-6" />
                </h3>
                {currentIndex % initialCards.length === index % initialCards.length && card.description && (
                  <p className="text-gray-600 text-xs sm:text-sm mt-2 -mb-4 sm:-mb-[3rem] md:-mb-[4rem] lg:-mb-[5rem]">
                    {card.description}
                  </p>
                )}
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>

  );
};

export default MedicalCardSlider;
