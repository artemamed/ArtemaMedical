import { CircleArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";

const initialCards = [
    {
        imageSrc: "/images/slider/slide1.png",
        title: "General Surgery",
        description:
            "The Universal Handle For Laryngeal Forceps, Designed According To Huber",
    },
    {
        imageSrc: "/images/slider/slide2.png",
        title: "General Surgery",
        description:
            "The Universal Handle For Laryngeal Forceps, Designed According To Huber",
    },
    {
        imageSrc: "/images/slider/slide3.png",
        title: "General Surgery",
        description:
            "The Universal Handle For Laryngeal Forceps, Designed According To Huber",
    },
    {
        imageSrc: "/images/slider/slide4.png",
        title: "General Surgery",
        description:
            "The Universal Handle For Laryngeal Forceps, Designed According To Huber",
    },
];

const MedicalCardSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false);

    // Duplicate cards at both ends to ensure seamless looping
    const extendedCards = [...initialCards, ...initialCards, ...initialCards];

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 2000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleNext = () => {
        if (isSliding) return;

        setIsSliding(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setIsSliding(false);

            // Reset the index to prevent overflow
            if (currentIndex >= extendedCards.length - initialCards.length) {
                setCurrentIndex(initialCards.length);
            }
        }, 500);
    };

    return (
        <div className="relative py-[10rem] overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 25}%)`,
                }}
            >
                {extendedCards.map((card, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4 px-4"
                    >
                        <div
                            className={`rounded-xl hover:shadow-lg ${
                                currentIndex % initialCards.length === index % initialCards.length
                                    ? "bg-[#CFE7E7]"
                                    : "bg-[#F7F7F7]"
                            } transition-all duration-300`}
                        >
                            <div className="relative">
                                <img
                                    src={card.imageSrc}
                                    alt={card.title}
                                    className={`p-[1rem] object-contain w-full transition-all duration-300 ${
                                        currentIndex % initialCards.length === index % initialCards.length
                                            ? " transform -translate-y-[7rem]"
                                            : "h-[200px]"
                                    }`}
                                />
                            </div>
                            <div
                                className={`p-4 mx-auto ${
                                    currentIndex % initialCards.length === index % initialCards.length
                                        ? " transform -translate-y-[7rem] "
                                        : ""
                                }`}
                            >
                                <h3 className="text-lg font-semibold text-teal-700 flex justify-between items-center">
                                    {card.title}{" "}
                                    <CircleArrowRight className="text-teal-700" />
                                </h3>
                                {currentIndex % initialCards.length === index % initialCards.length &&
                                    card.description && (
                                        <p className="text-gray-600 text-sm mt-2 -mb-[5rem]">
                                            {card.description}
                                        </p>
                                    )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MedicalCardSlider;
