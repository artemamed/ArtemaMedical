import ScrollTop from "@/components/Buttons/ScrollTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Surgical Instrument Blogs | Artema Medical",
  description: "Our Blogs section helps professional surgeons and doctors understand the usage, benefits, and reliability of our instruments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div className="z-50 fixed bottom-5 right-5">
        <ScrollTop />
      </div>
    </div>
  );
}
