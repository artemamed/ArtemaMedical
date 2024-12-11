import React, { useState } from "react";
import { Search } from "lucide-react";
import Input from "../ui/input";

const SearchInput: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
        document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
    };

    return (
        <div className="relative">
            <button onClick={toggleDropdown}>
                <Search className="w-6 h-6 mt-2 hover:text-[#008080]" />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-20 z-40" onClick={toggleDropdown} />

                    {/* Search Content */}
                    <div className="fixed left-0 right-0 mt-5 bg-[#F7F7F7] m-5 md:m-1 md:mt-5 rounded-2xl animate-fade-in z-50">
                        <div className="p-4 md:w-screen mx-auto">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Search Products"
                                    className="border-gray-300 pl-10 max-w-2xl items-center mx-auto rounded-xl font-bold"
                                />
                            </div>
                        </div>
                        <ul className="py-2 max-w-2xl mx-auto">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                General Instrument
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Orthopedic Instrument
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Scissors
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Dental Instrument
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                ENT instruments
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchInput;
