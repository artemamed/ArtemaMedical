import { CircleDollarSign, Leaf, Microscope } from 'lucide-react';
import React from 'react';

const WhyChooseUs = () => {
    return (
        <div className="bg-teal-900 px-4 py-[6rem] sm:px-6 lg:px-[6rem] text-white rounded-xl transition-all duration-300 ">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-fade-in">
                Why Choose Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 max-w-7xl mx-auto">
                {[
                    {
                        icon: <CircleDollarSign size={40}/>,
                        title: "Cost-Effective Excellence",
                        description: "We prioritize delivering premium-quality medical instruments while ensuring budget-friendly solutions tailored to your needs."
                    },
                    {
                        icon: <Microscope size={40} />,
                        title: "Precision and Innovation",
                        description: "Our team of biomedical experts continually pushes boundaries to design innovative tools that meet the highest standards."
                    },
                    {
                        icon: <Leaf size={40} />,
                        title: "Eco-Friendly Commitment",
                        description: "We're passionate about sustainability, integrating green practices into our processes to protect the planet."
                    }
                ].map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center bg-teal-800 rounded-xl p-8 
                       shadow-lg border border-gray-400 hover:border-teal-400
                       transform hover:-translate-y-2 transition-all duration-300
                       hover:bg-teal-700 group cursor-pointer py-[6rem] px-[2rem]"
                    >
                        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 group-hover:text-teal-300">
                            {item.title}
                        </h3>
                        <p className="text-gray-200 leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;
