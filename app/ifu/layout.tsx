import ScrollTop from "@/components/Buttons/ScrollTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IFU|Surgical Instruments| Artema Medical",
  description: "The IFU documents provide comprehensive guidance on the proper handling, operation, and maintenance of Artema Medical's surgical instruments.",
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
