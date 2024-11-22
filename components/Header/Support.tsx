"use client";
import React from "react";
import { NextPage } from "next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";

const Support: NextPage = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center overflow-hidden "
      >
        <span className="transition hover:text-[#008080]">Support</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-50 w-[15rem] rounded-2xl bg-[#F7F7F7] mt-5">
        <ScrollArea className="h-30">
          <div className="p-2 rounded-lg">
            <Link href="/ifu">
              <DropdownMenuItem>IFU</DropdownMenuItem>
            </Link>
            <Link href="/blogs">
              <DropdownMenuItem>Blogs</DropdownMenuItem>
            </Link>
            <Link href="/certification">
              <DropdownMenuItem>Certification</DropdownMenuItem>
            </Link>
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Support;
