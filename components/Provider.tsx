"use client";

import React from "react";
// import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./Footer";
import Header from "./Header";


// const queryClient = new QueryClient(); // Create a query client instance

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    // <QueryClientProvider client={queryClient}>
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
    // </QueryClientProvider>
  );
}
