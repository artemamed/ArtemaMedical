import React from "react";
import ProductSlider from "./ProductSlider";

const MedicalEquipment: React.FC = () => {
    return (
        <section className="container mx-auto">
            <div className="mb-[2rem]">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">Explore Our Range of Medical Equipment</h2>
                <p className="text-[#666666] mt-4">
                    With a devotion to quality, we provide a broad range of surgical instruments, which include surgical forceps, scalpels, needle holders, retractors, and many more.
                </p>
                {/* Button Grid */}
                <div className="flex flex-wrap gap-8 2xl:gap-12 mt-8">
                    {[
                        "General",
                        "Orthopedic",
                        "Scissors",
                        "Dental",
                        "ENT",
                        "Cardiovascular",
                        "Cardiovascular",
                        "Cardiovascular",
                        "Gynaecology",
                        "Plastic Surgery",
                    ].map((category, index) => (
                        <button
                            key={index}
                            className="w-36 py-2 bg-[#F7F7F7] border-none rounded-lg transition"
                        >
                            {category}
                        </button>
                    ))}
                    <div className="mt-3">
                        <a
                            href="#"
                            className="text-teal-600 hover:text-teal-800 font-medium transition"
                        >
                            Discover All &rarr;
                        </a>
                    </div>
                </div>
            </div>
            <ProductSlider />
        </section>
    );
};

export default MedicalEquipment;


