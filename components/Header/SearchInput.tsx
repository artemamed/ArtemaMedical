"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const SearchInput = () => {
  
  return (
    <>
        <div className="">
            <Link href={"/cart"} className="hover:text-gray-500">
                <Search className="w-7 h-7" />
            </Link>
        </div>
    </>
);
};

export default SearchInput;