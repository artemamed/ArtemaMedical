import LayoutWrapper from '@/components/Wrapper/LayoutWrapper';
import Image from 'next/image';
import React from 'react';

const policies = [
    {
        title: 'Written Orders',
        description:
            'All offers are invalid unless agreed upon in written form. Orders will only be processed after confirmation by written order',
    },
    {
        title: 'Customer Responsibility',
        description:
            'Artema Medical is not responsible for any mistake or negligence regarding the information provided by the customer',
    },
    {
        title: 'Data as a Guideline',
        description:
            'Any information or data related to the company serves only as a guideline and becomes part of the contract only after written consent from both parties.',
    },
    {
        title: 'Product Shelf-Life',
        description:
            'There will be no guarantee regarding the shelf-life of the products unless explicitly stated in the product description.',
    },
];

const Home = () => {
    return (
        <LayoutWrapper className="min-h-screen flex justify-center items-center py-8">
            <div className="max-w-screen-lg w-full px-4">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-4xl font-semibold text-teal-900">
                        Terms and Condition
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Please read our terms carefully before proceeding with any transactions.
                    </p>
                </div>

                {/* Policies Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl font-semibold text-teal-900 mb-4">
                        General Policy
                    </h2>
                    {policies.map((policy, index) => (
                        <div
                            key={index}
                            className="mb-6 flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4"
                        >
                            {/* Title Column */}
                            <h3 className="text-lg font-semibold text-gray-800 w-full md:w-[10rem]">
                                {policy.title}<span className=' md:hidden text-teal-900 text-xl ml-2 font-bold'>&darr;</span>
                            </h3>



                            {/* Right Arrow Icon */}
                            <div className="hidden md:block text-teal-900 text-2xl font-bold w-6 flex-shrink-0 items-center justify-center">
                                &rarr;
                            </div>

                            {/* Description Column */}
                            <p className="text-gray-600 flex-1">{policy.description}</p>
                        </div>
                    ))}
                </div>

                {/* Verified Badge */}
                <div className="flex justify-end md:mt-8">
                    <div className="flex flex-col items-center">
                        <Image
                            width={100}
                            height={100}
                            src="/assets/stamp.png"
                            alt="Verified Badge"
                            className="w-32 md:w-56 xl:w-72 h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </LayoutWrapper>


    );
};

export default Home;
