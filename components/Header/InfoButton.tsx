// // infoButton.tsx
// 'use client';
// import { fetchLoggedUser } from "@/lib/Fetcher/User";
// import { SendedInquiries } from "@/lib/Fetcher/Inquiries";
// import { useQuery } from "@tanstack/react-query";
// import Link from "next/link";
// import React from "react";
// import { MdMailOutline } from "react-icons/md";

// // Custom Badge component for displaying count
// const Badge = ({ content, children }: { content: number; children: React.ReactNode }) => (
//   <div className="relative inline-block">
//     {children}
//     {content > 0 && (
//       <span className="absolute top-0 right-0 inline-flex items-center justify-center px-0.5 py-0 text-xs font-bold leading-none text-white bg-green-600 rounded-full">
//         {content}
//       </span>
//     )}
//   </div>
// );

// const InfoButton = () => {
//   const { data: User } = useQuery({
//     queryKey: ["User"],
//     queryFn: fetchLoggedUser,
//   });

//   // Fetch inquiries with polling to update dynamically
//   const { data: inquiriesData, error } = useQuery({
//     queryKey: ["Inquiries"],
//     queryFn: SendedInquiries,
//     enabled: !!User, // Only fetch if the user is logged in
//     refetchInterval: 5000, // Poll every 5 seconds for updates
//     refetchOnWindowFocus: true, // Refetch on window focus
//   });

//   const inquiryCount = inquiriesData ? inquiriesData.length : 0;

//   if (error) {
//     console.error("Failed to fetch inquiries:", error);
//   }

//   // Render icon only if User is logged in
//   if (!User) return null;

//   return (
//     <Link href={"/info"} className="hover:text-gray-500">
//       <Badge content={inquiryCount}>
//         <MdMailOutline className="w-7 h-7" />
//       </Badge>
//     </Link>
//   );
// };

// export default InfoButton;
