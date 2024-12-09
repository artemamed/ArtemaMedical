import LayoutWrapper from '@/components/Wrapper/LayoutWrapper';
import { BadgeAlert, BadgeDollarSign, Mail, MapPinHouse, MapPinned, Phone, SquarePen, Truck } from 'lucide-react';
import React from 'react';

const policies = [
    {
        icon: <Truck />,
        title: 'Shipping',
        description:
            'All orders are processed within 1-3 business days. Orders placed on weekends or holidays will be processed on the next business day.',
    },
    {
        icon: <Mail />,
        title: 'Confirmation Email',
        description:
            'You will receive a confirmation email once your order has been processed and shipped.',
    },
    {
        icon: <BadgeDollarSign />,
        title: 'Shipping Cost',
        description:
            'Shipping costs are calculated at checkout based on the weight of the items and the selected shipping method.',
    },
    {
        icon: <MapPinned />,
        title: 'Tracking Numbers',
        description:
            'Once we receive the returned item, we will process your refund within 5-10 business days. Refunds will be issued to the original payment method used at the time of purchase',
    },
    {
        icon: <BadgeAlert />,
        title: 'Delivery Issue',
        description:
            'If you experience any issues with your delivery (e.g., delayed, lost, or damaged items), please contact our customer service team within 7 days of the expected delivery date. We will work to resolve the issue promptly.',
    },
    {
        icon: <MapPinHouse />,
        title: 'Address Change',
        description:
            'Artema Medical reserves the right to modify this refund policy at any time. Changes will be posted on our website, and the revised policy will apply to all purchases made after the effective date.',
    },
    {
        icon: <SquarePen />,
        title: 'Policy Modification',
        description:
            'Artema Medical reserves the right to modify this refund policy at any time. Changes will be posted on our website, and the revised policy will apply to all purchases made after the effective date.',
    },
    {
        icon: <Phone />,
        title: 'Contact Information',
        description:
            'For any questions or concerns, please reach out to us at',
    },
];
const Home = () => {
    return (
        <LayoutWrapper className="min-h-screen flex justify-center items-center py-8">
            <div className="max-w-screen-lg w-full">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-4xl font-semibold text-teal-900">
                        Shipping Policy
                    </h1>
                    <p className="text-[#666666] mt-2 max-w-2xl mx-auto text-base sm:text-lg">
                        At Artema Medical, we strive to provide timely and reliable shipping for our surgical instruments and pharmaceutical products. Below are the details of our shipping policy.
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
