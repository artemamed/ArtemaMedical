import ScrollTop from "@/components/Buttons/ScrollTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy|Surgical Instruments| Artema Medical",
  description: "The Shipping Policy page outlines the terms and conditions regarding shipping of surgical instruments from Artema Medical.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div className="z-50 fixed bottom-5 right-5  ">
        <ScrollTop />
      </div>
    </div>
  );
}
