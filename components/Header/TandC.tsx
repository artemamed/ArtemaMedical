// "use client";
// import React from "react";
// import { NextPage } from "next";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ScrollArea } from "../ui/scroll-area";

// const TandC: NextPage = () => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         asChild
//         className="inline-flex items-center overflow-hidden rounded-md bg-light-primary"
//       >
//         <button className="flex justify-between items-center h-full lg:p-2">
//           <span className="transition hover:text-green-600">
//             Terms & Conditions
//           </span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent>
//         <ScrollArea className="h-30">
//           <div className="p-2 rounded-lg">
//             <a href="/terms-and-conditions">
//               <DropdownMenuItem>General</DropdownMenuItem>
//             </a>
//             <a href="/refund-policy">
//               <DropdownMenuItem>Refund Policy</DropdownMenuItem>
//             </a>
//             <a href="/shipping-policy">
//               <DropdownMenuItem>Shipping Policy</DropdownMenuItem>
//             </a>
//             <a href="/FAQs">
//               <DropdownMenuItem>FAQs</DropdownMenuItem>
//             </a>
//           </div>
//         </ScrollArea>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default TandC;
