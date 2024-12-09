import LayoutWrapper from "@/components/Wrapper/LayoutWrapper";
import Link from "next/link";
import React from "react";
import { FaCookieBite, FaLock, FaChartLine, FaUserShield } from "react-icons/fa";

const CookiePolicyPage: React.FC = () => {
    return (
        <LayoutWrapper className="min-h-screen py-10 flex flex-col items-center">
            {/* Container */}
            <div className="max-w-screen-lg w-full ">
                <div className="text-center mb-8">

                    <h1 className="text-2xl md:text-4xl font-semibold text-center text-[#004040] mb-6">
                        Cookie Policy
                    </h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-base sm:text-lg">
                        At artemamed Medical, we are committed to protecting your privacy. This Cookie Policy explains how we use cookies and similar technologies on our website (
                        <Link href="https://artemamed.com/" className="text-teal-700 underline hover:text-teal-900">
                            https://artemamed.com/
                        </Link>
                        ).
                    </p>
                </div>

                {/** Sections */}
                <section className="mb-8 border-b pb-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <FaCookieBite className="text-teal-700 text-xl md:text-2xl" />
                        <h2 className="text-xl md:text-2xl font-bold text-teal-900">
                            What Are Cookies?
                        </h2>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed ml-[2rem]">
                        Cookies are small text files placed on your device when you visit our Site. They help us enhance your experience by remembering your preferences and improving the functionality of our site.
                    </p>
                </section>

                <section className="mb-8 border-b pb-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <FaUserShield className="text-teal-700 text-xl md:text-2xl" />
                        <h2 className="text-xl md:text-2xl font-bold text-teal-900">
                            How We Use Cookies
                        </h2>
                    </div>
                    <ul className="list-disc space-y-2 text-gray-700 text-sm sm:text-base ml-[2rem]">
                        <li>
                            <strong>Essential Cookies:</strong> Necessary for Site operation, enabling features like secure areas.
                        </li>
                        <li>
                            <strong>Performance Cookies:</strong> Collect data about how visitors use our Site, helping us improve.
                        </li>
                        <li>
                            <strong>Functional Cookies:</strong> Remember choices like your username or language preferences.
                        </li>
                        <li>
                            <strong>Targeting/Advertising Cookies:</strong> Deliver ads relevant to your interests and measure their effectiveness.
                        </li>
                    </ul>
                </section>

                <section className="mb-8 border-b pb-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <FaCookieBite className="text-teal-700 text-xl md:text-2xl" />
                        <h2 className="text-xl md:text-2xl font-bold text-teal-900">
                            Types of Cookies We Use
                        </h2>
                    </div>
                    <ul className="list-disc ml-[2rem] space-y-2 text-gray-700 text-sm sm:text-base">
                        <li>
                            <strong>Session Cookies:</strong> Temporary cookies deleted when you close your browser.
                        </li>
                        <li>
                            <strong>Persistent Cookies:</strong> Remain on your device until deleted or expired.
                        </li>
                    </ul>
                </section>

                <section className="mb-8 border-b pb-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <FaLock className="text-teal-700 text-xl md:text-2xl" />
                        <h2 className="text-xl md:text-2xl font-bold text-teal-900">
                            Your Choices Regarding Cookies
                        </h2>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed ml-[2rem]">
                        You can manage your cookie preferences through your browser settings. Disabling cookies may affect functionality.
                    </p>
                </section>

                <section className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <FaChartLine className="text-teal-700 text-xl md:text-2xl" />
                        <h2 className="text-xl md:text-2xl font-bold text-teal-900">
                            Third-Party Cookies
                        </h2>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed ml-[2rem]">
                        Third-party cookies may be used for analytics or advertisements. These third parties have their own privacy policies, which we encourage you to review.
                    </p>
                </section>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    We may update this Cookie Policy from time to time. Changes will be posted on this page with the effective date. For questions, please contact us.
                </p>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center text-gray-600 text-sm">
                <p>© 2024 artemamed Medical. All rights reserved.</p>
            </footer>
        </LayoutWrapper>
    );
};

export default CookiePolicyPage;
