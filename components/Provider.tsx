"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "@/redux/Providers"; // Ensure Redux provider is imported correctly
import Header from "./Header";
import Footer from "./Footer";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { persistor } from "@/app/store"; // Import persistor

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex flex-col min-h-screen">
          <Header /> 
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        </PersistGate>
      </Providers>
    </QueryClientProvider>
  );
}
