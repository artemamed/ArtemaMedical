import ScrollTop from "@/components/Buttons/ScrollTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy| Medical Instruments| Artema Medical",
  description: "The Refund Policy page helps guide you on how to get a refund if you experience any problems after purchasing surgical instruments.",
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
