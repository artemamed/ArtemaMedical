import ScrollTop from "@/components/Buttons/ScrollTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Medical Equipment Manufacturers| Artema Medical",
  description: "Welcome to Artema Medical's About page, where we delve into our mission, values, and commitment to revolutionizing medical equipments and innovations.",
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
