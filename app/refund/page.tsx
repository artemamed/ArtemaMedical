import LayoutWrapper from '@/components/Wrapper/LayoutWrapper';
import { CircleOff, Clock4, NotebookPen, ShieldAlert, Truck, Undo2 } from 'lucide-react';
import React from 'react';

const policies = [
    {
        icon: <NotebookPen />,
        title: 'Eligibility for Refund',
        description:
            'Refund requests can be made within 7 days of the purchase date. Products must be in their original condition, unused, and in the original packaging. Proof of purchase (invoice or receipt) is required for all refund requests.',
    },
    {
        icon: <Undo2 />,
        title: 'Refund Process',
        description:
            'To initiate a refund, please contact our customer service team. Provide your order number and reason for the refund. Our team will review your request and may ask for additional information or photos of the product. Once your refund request is approved, we will issue a return authorization and provide instructions for returning the item.',
    },
    {
        icon: <Truck />,
        title: 'Return Shipping',
        description:
            'Customers are responsible for return shipping costs unless the item is defective or the wrong item was sent. We recommend using a trackable shipping service or purchasing shipping insurance for items, as we cannot guarantee that we will receive your returned item.',
    },
    {
        icon: <Clock4 />,
        title: 'Refund Timeline',
        description:
            'Once we receive the returned item, we will process your refund within 5-10 business days. Refunds will be issued to the original payment method used at the time of purchase',
    },
    {
        icon: <ShieldAlert />,
        title: 'Defective or Damaged Products',
        description:
            'Once we receive the returned item, we will process your refund within 5-10 business days. Refunds will be issued to the original payment method used at the time of purchase',
    },
    {
        icon: <CircleOff />,
        title: 'Non-Refundable Items',
        description:
            'Artema Medical reserves the right to modify this refund policy at any time. Changes will be posted on our website, and the revised policy will apply to all purchases made after the effective date.',
    },
];
const Home = () => {
    return (
        <LayoutWrapper className="min-h-screen flex justify-center items-center py-8">
            <div className="max-w-screen-lg w-full">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-4xl font-semibold text-teal-900">
                        Refund Policy
                    </h1>
                    <p className="text-[#666666] mt-2 max-w-3xl mx-auto text-base sm:text-lg">
                        At Artema Medical, we are committed to providing high-quality surgical instruments. If you are not completely satisfied with your purchase, we offer a refund policy to ensure your confidence in our products.
                    </p>
                </div>

                {/* Policies Section */}
                <div>
                    {policies.map((policy, index) => (
                        <div key={index} className="mb-6">
                            {/* Title Column */}
                            <h3 className="flex items-center text-2xl font-semibold text-gray-800 gap-2 mb-2">
                                <span className="bg-[#CFE7E7] p-1.5 -mt-0.5 rounded-lg text-[#004040]">
                                    {policy.icon}
                                </span>
                                <span className="text-base md:text-xl">{policy.title}</span>
                            </h3>

                            {/* Description Column */}
                            <p className="text-gray-600 ml-[3rem]">{policy.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutWrapper>

    );
};

export default Home;
