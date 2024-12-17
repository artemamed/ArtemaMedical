"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./Header";
import Footer from "./Footer";
import { Providers } from "@/redux/Providers";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Providers><main className="flex-grow">{children}</main></Providers>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
