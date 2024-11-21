"use client";
import React from "react";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { fetchLoggedUser } from "@/lib/Fetcher/User";
// import { useQuery, useQueryClient } from "@tanstack/react-query";

// import Link from "next/link";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

const UserDropDown = ({ setMobileMenuOpen }: { setMobileMenuOpen: (open: boolean) => void }) => {
  // const router = useRouter();
  // const client = useQueryClient();

  // // Fetch user data without reloading on login
  // const { data: User, isLoading: isUserLoading } = useQuery({
  //   queryKey: ["User"],
  //   queryFn: fetchLoggedUser,
  //   staleTime: 1000 * 60 * 10, // 10 minutes
  //   refetchOnWindowFocus: false, // Optional: adjust based on UX needs
  // });

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.get("/api/auth/logout");
  //     const data = await response.data;

  //     if (data.success) {
  //       // Update user cache directly instead of full refetch
  //       client.setQueryData(["User"], null);
  //       toast.success("Logged out successfully");
  //       router.push("/auth/login");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Error in Logout");
  //   }
  // };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // if (isUserLoading) {
  //   return <></>;
  // }

  // if (User) {
    // return (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant="ghost" className="relative h-10 w-10 rounded-full">
  //           <Avatar className="h-10 w-10">
  //             <AvatarImage src="/avatar.webp" alt="User Avatar" />
  //             <AvatarFallback>{User.name}</AvatarFallback>
  //           </Avatar>
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent className="w-56" align="end" forceMount>
  //         <DropdownMenuLabel className="font-normal">
  //           <div className="flex flex-col space-y-1">
  //             <p className="text-sm font-medium leading-none">{User.name}</p>
  //             <p className="text-xs leading-none text-muted-foreground">
  //               {User.email}
  //             </p>
  //           </div>
  //         </DropdownMenuLabel>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuGroup>
  //           <Link href={"/cart"} onClick={handleLinkClick}>
  //             <DropdownMenuItem>Your Cart</DropdownMenuItem>
  //           </Link>
  //         </DropdownMenuGroup>
  //         <DropdownMenuGroup>
  //           <Link href={"/setting"} onClick={handleLinkClick}>
  //             <DropdownMenuItem>Update Profile</DropdownMenuItem>
  //           </Link>
  //         </DropdownMenuGroup>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   );
  // }

  return (
    <div className="space-x-4">
      <Link
        href="/auth/signup"
        className="rounded-md px-5 py-2.5 text-sm font-semibold text-white bg-green-500 transition hover:text-white/75"
        onClick={handleLinkClick}
      >
        SignUp
      </Link>
      <Link
        href="/auth/signin"
        className="rounded-md px-5 py-2.5 text-sm font-semibold text-white bg-green-500 transition hover:text-white/75"
        onClick={handleLinkClick}
      >
        SignIn
      </Link>
    </div>
  );
};

export default UserDropDown;
